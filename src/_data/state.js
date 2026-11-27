// Date-based switches, worked out at build time. A daily scheduled build keeps them current.
import fs from "node:fs";
const site = JSON.parse(fs.readFileSync(new URL("./site.json", import.meta.url)));
const isPh = (v) => typeof v === "string" && v.includes("[[");

export default function () {
  const today = new Date().toLocaleDateString("en-CA", { timeZone: "Europe/London" });
  const m = site.launchMeeting;
  return {
    today,
    // Shown up to and including the meeting day, removed the day after.
    showLaunchMeeting: Boolean(m.show) && today <= m.isoDate,
    calendarFile: Boolean(m.show && m.confirmed) && today <= m.isoDate,
    afterElection: today > site.electionDate,
    imprintReady: !isPh(site.imprint.promoter),
  };
}
