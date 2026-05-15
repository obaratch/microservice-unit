type StopwatchOptions = {
	autostart?: boolean;
};

export class Stopwatch {
	#startTime: number | null = null;
	#stopTime: number | null = null;

	constructor(options: StopwatchOptions = {}) {
		if (options.autostart) {
			this.start();
		}
	}

	start(): this {
		this.#startTime = performance.now();
		this.#stopTime = null;
		return this;
	}

	stop(): this {
		if (this.#startTime !== null) {
			this.#stopTime = performance.now();
		}
		return this;
	}

	time(precision = 0): number {
		if (this.#startTime === null) {
			return 0;
		}

		const endTime = this.#stopTime ?? performance.now();
		const elapsedMilliseconds = endTime - this.#startTime;
		return Number(elapsedMilliseconds.toFixed(precision));
	}
}
