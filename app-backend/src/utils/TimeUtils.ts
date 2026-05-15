type StopwatchOptions = {
	autostart?: boolean;
};

export class Stopwatch {
	#startTime: Temporal.Instant | null = null;
	#stopTime: Temporal.Instant | null = null;

	constructor(options: StopwatchOptions = {}) {
		if (options.autostart) {
			this.start();
		}
	}

	start(): this {
		this.#startTime = Temporal.Now.instant();
		this.#stopTime = null;
		return this;
	}

	stop(): this {
		if (this.#startTime !== null) {
			this.#stopTime = Temporal.Now.instant();
		}
		return this;
	}

	time(precision = 0): number {
		if (this.#startTime === null) {
			return 0;
		}

		const endTime = this.#stopTime ?? Temporal.Now.instant();
		const elapsedMilliseconds = endTime
			.since(this.#startTime)
			.total("milliseconds");
		return Number(elapsedMilliseconds.toFixed(precision));
	}
}
