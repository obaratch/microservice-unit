import { afterEach, describe, expect, test, vi } from "vitest";
import {
	formatEpochMillisecondsInBrowserTimeZone,
	getBrowserTimeZone,
} from "../../src/utils/DatetimeUtils";

const formatExpected = (epochMilliseconds: number, timeZone: string) =>
	formatEpochMillisecondsInBrowserTimeZone(epochMilliseconds, {
		locales: "en-US",
		timeZone,
	});

describe("DatetimeUtils", () => {
	afterEach(() => {
		vi.unstubAllGlobals();
	});

	test("Temporal がある場合は Temporal からブラウザのタイムゾーンを取得する", () => {
		const timeZoneId = vi.fn(() => "Asia/Tokyo");
		vi.stubGlobal("Temporal", { Now: { timeZoneId } });

		expect(getBrowserTimeZone()).toBe("Asia/Tokyo");
		expect(timeZoneId).toHaveBeenCalledOnce();
	});

	test("Temporal がない場合は Intl の resolvedOptions からタイムゾーンを取得する", () => {
		vi.stubGlobal("Temporal", undefined);

		expect(getBrowserTimeZone()).toBe(
			Intl.DateTimeFormat().resolvedOptions().timeZone ?? "UTC",
		);
	});

	test("Temporal 由来のタイムゾーンで epoch milliseconds を表示する", () => {
		const epochMilliseconds = Date.UTC(2026, 0, 1, 0, 0, 0);
		vi.stubGlobal("Temporal", {
			Now: { timeZoneId: () => "Asia/Tokyo" },
		});

		expect(
			formatEpochMillisecondsInBrowserTimeZone(epochMilliseconds, {
				locales: "en-US",
			}),
		).toBe(formatExpected(epochMilliseconds, "Asia/Tokyo"));
	});

	test("表示形式は yyyy-mm-dd HH:mm:ss ([zone]) に固定する", () => {
		const epochMilliseconds = Date.UTC(2026, 0, 1, 0, 0, 0);

		expect(formatExpected(epochMilliseconds, "Asia/Tokyo")).toBe(
			"2026-01-01 09:00:00 (GMT+9)",
		);
	});

	test("Temporal がない場合でも epoch milliseconds を表示できる", () => {
		const epochMilliseconds = Date.UTC(2026, 0, 1, 0, 0, 0);
		const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone ?? "UTC";
		vi.stubGlobal("Temporal", undefined);

		expect(
			formatEpochMillisecondsInBrowserTimeZone(epochMilliseconds, {
				locales: "en-US",
			}),
		).toBe(formatExpected(epochMilliseconds, timeZone));
	});
});
