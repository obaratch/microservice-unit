#!/usr/bin/env bash
set -euo pipefail

# 開発中に残りがちなViteとバックエンドAPIのプロセスをまとめて停止する。
# まず既定ポートのLISTENプロセスを探し、あわせてこのリポジトリ配下で
# 起動された開発用コマンドも探すことで、子プロセスと親プロセスの両方を
# 停止対象にする。

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
# バックエンドAPIとVite dev serverが使うポート。
# 必要に応じて PORTS="3000 8080 8081" のように上書きできる。
PORTS="${PORTS:-3000 8080}"
DRY_RUN=0

if [[ "${1:-}" == "--dry-run" ]]; then
  DRY_RUN=1
fi

log() {
  printf '%s\n' "$*"
}

find_port_pids() {
  # 親のnpm-run-allが終了したあとに残ったVite/バックエンドも拾えるよう、
  # LISTEN中のポートからプロセスを探す。
  local port
  for port in $PORTS; do
    lsof -tiTCP:"$port" -sTCP:LISTEN 2>/dev/null || true
  done
}

find_repo_pids() {
  # npm-run-allやcross-envのようにポートを直接持たない親プロセスも拾えるよう、
  # このリポジトリ配下で起動した開発用コマンドを探す。
  ps -axo pid=,command= 2>/dev/null |
    awk -v root="$ROOT_DIR" 'index($0, root) && (index($0, "npm run dev") || index($0, "run-p start-backend-dev start-frontend-dev") || index($0, "vite") || index($0, "node --watch app-backend/src/main.js") || index($0, "app-backend/src/main.js")) { print $1 }'
}

unique_pids() {
  awk 'NF && !seen[$1]++ { print $1 }'
}

pids="$(printf '%s\n%s\n' "$(find_port_pids)" "$(find_repo_pids)" | unique_pids)"

if [[ -z "$pids" ]]; then
  log "No app processes found."
  exit 0
fi

log "Target processes:"
for pid in $pids; do
  ps -p "$pid" -o pid=,command= 2>/dev/null || log "  $pid"
done

if [[ "$DRY_RUN" == "1" ]]; then
  log "Dry run only. No processes were stopped."
  exit 0
fi

log "Sending TERM..."
for pid in $pids; do
  kill "$pid" 2>/dev/null || true
done

# 通常の終了処理を走らせるため、強制終了の前に少し待つ。
sleep 1

remaining=""
for pid in $pids; do
  if kill -0 "$pid" 2>/dev/null; then
    remaining="${remaining}${pid}
"
  fi
done

if [[ -n "$remaining" ]]; then
  log "Still running. Sending KILL..."
  for pid in $remaining; do
    kill -9 "$pid" 2>/dev/null || true
  done
fi

log "Done."
