import type { StudySession } from "@/features/calendar/types";

function escapeIcsText(value: string) {
  return value
    .replaceAll("\\", "\\\\")
    .replaceAll(",", "\\,")
    .replaceAll(";", "\\;")
    .replaceAll("\n", "\\n");
}

function formatIcsDate(date: Date) {
  const year = date.getUTCFullYear();
  const month = `${date.getUTCMonth() + 1}`.padStart(2, "0");
  const day = `${date.getUTCDate()}`.padStart(2, "0");
  const hours = `${date.getUTCHours()}`.padStart(2, "0");
  const minutes = `${date.getUTCMinutes()}`.padStart(2, "0");
  const seconds = `${date.getUTCSeconds()}`.padStart(2, "0");
  return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
}

function foldLine(line: string) {
  const chunks: string[] = [];
  let remaining = line;

  while (remaining.length > 75) {
    chunks.push(remaining.slice(0, 75));
    remaining = ` ${remaining.slice(75)}`;
  }

  chunks.push(remaining);
  return chunks.join("\r\n");
}

export function buildStudyScheduleIcs(sessions: StudySession[]) {
  const nowStamp = formatIcsDate(new Date());
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//StudyOS//90 Day Study Planner//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "X-WR-CALNAME:StudyOS 90 Day Plan"
  ];

  sessions.forEach((session) => {
    const topics = session.topics.map((topic) => topic.label).join(", ");
    const description = [
      session.description,
      `Current Day: Day ${session.dayNumber} of 90`,
      `Topics: ${topics}`,
      `Focus: ${session.topics.find((topic) => topic.id === session.primaryFocus)?.label ?? "Study"}`,
      `Expected Hours: ${session.plannedHours}`
    ].join("\n");

    lines.push(
      "BEGIN:VEVENT",
      `UID:${session.id}@studyos.local`,
      `DTSTAMP:${nowStamp}`,
      `DTSTART:${formatIcsDate(session.start)}`,
      `DTEND:${formatIcsDate(session.end)}`,
      `SUMMARY:${escapeIcsText(session.title)}`,
      `DESCRIPTION:${escapeIcsText(description)}`,
      `CATEGORIES:${escapeIcsText(session.primaryFocus.toUpperCase())}`,
      "END:VEVENT"
    );
  });

  lines.push("END:VCALENDAR");
  return lines.map(foldLine).join("\r\n");
}

export function downloadIcsFile(sessions: StudySession[]) {
  const blob = new Blob([buildStudyScheduleIcs(sessions)], {
    type: "text/calendar;charset=utf-8"
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "studyos-90-day-study-plan.ics";
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}
