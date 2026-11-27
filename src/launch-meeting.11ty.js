// Calendar file for the launch meeting. Only written once the meeting is confirmed, and until it has happened.
export const data = {
  eleventyExcludeFromCollections: true,
  permalink: (data) => (data.state.calendarFile ? "/launch-meeting.ics" : false),
};

const esc = (s) => String(s).replace(/\\/g, "\\\\").replace(/,/g, "\\,").replace(/;/g, "\;");

export function render({ site, build }) {
  const m = site.launchMeeting;
  const d = m.isoDate.replace(/-/g, "");
  const t = (x) => x.replace(":", "") + "00";
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Shinfield Parish First//Website//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:launch-meeting-${d}@shinfieldparishfirst.org.uk`,
    `DTSTAMP:${build.today.replace(/-/g, "")}T000000Z`,
    `DTSTART;TZID=Europe/London:${d}T${t(m.startTime)}`,
    `DTEND;TZID=Europe/London:${d}T${t(m.endTime)}`,
    "SUMMARY:Shinfield Parish First public launch meeting",
    `LOCATION:${esc(m.venue)}`,
    `DESCRIPTION:${esc("Free, everyone welcome, step-free access.")}`,
    `URL:${site.url}/`,
    "END:VEVENT",
    "END:VCALENDAR",
    "",
  ].join("\r\n");
}
