const BUILD_TIME_FORMAT_OPTIONS = {
	day: "2-digit",
	hour: "2-digit",
	hour12: false,
	minute: "2-digit",
	month: "2-digit",
	second: "2-digit",
	timeZoneName: "short",
	year: "numeric",
} as const satisfies Intl.DateTimeFormatOptions;

type FormatEpochMillisecondsOptions = {
	locales?: Intl.LocalesArgument;
	timeZone?: string;
};

type BuildTimeFormatPart = keyof Pick<
	Intl.DateTimeFormatPartTypesRegistry,
	"day" | "hour" | "minute" | "month" | "second" | "timeZoneName" | "year"
>;

export const getBrowserTimeZone = () => {
	if (typeof Temporal !== "undefined") {
		return Temporal.Now.timeZoneId();
	}
	return Intl.DateTimeFormat().resolvedOptions().timeZone ?? "UTC";
};

const getFormatPartMap = (parts: Intl.DateTimeFormatPart[]) =>
	Object.fromEntries(
		parts
			.filter(({ type }) => type !== "literal")
			.map(({ type, value }) => [type, value]),
	) as Record<BuildTimeFormatPart, string>;

export const formatEpochMillisecondsInBrowserTimeZone = (
	epochMilliseconds: number,
	options: FormatEpochMillisecondsOptions = {},
) => {
	const timeZone = options.timeZone ?? getBrowserTimeZone();
	const parts = getFormatPartMap(
		new Intl.DateTimeFormat(options.locales, {
			...BUILD_TIME_FORMAT_OPTIONS,
			timeZone,
		}).formatToParts(new Date(epochMilliseconds)),
	);
	return `${parts.year}-${parts.month}-${parts.day} ${parts.hour}:${parts.minute}:${parts.second} (${parts.timeZoneName})`;
};
