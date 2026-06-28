import { STUDY_PROGRAM_DAYS } from "@/shared/constants/app";

const MS_PER_DAY = 24 * 60 * 60 * 1_000;

export function getStudyProgramDay(startDateIso: string, now = new Date()) {
  const [year = 0, month = 1, day = 1] = startDateIso
    .split("-")
    .map((part) => Number(part));

  const startDate = new Date(year, month - 1, day);
  const currentDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const elapsedDays =
    Math.floor((currentDate.getTime() - startDate.getTime()) / MS_PER_DAY) + 1;

  return Math.min(Math.max(elapsedDays, 1), STUDY_PROGRAM_DAYS);
}

export function formatReminderTime(time: string) {
  const [hours = "00", minutes = "00"] = time.split(":");
  const date = new Date();
  date.setHours(Number(hours), Number(minutes), 0, 0);

  return new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit"
  }).format(date);
}
