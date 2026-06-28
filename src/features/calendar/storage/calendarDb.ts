import { openDB, type DBSchema } from "idb";

import type { SessionState } from "@/features/calendar/types";

type StudyCalendarDB = DBSchema & {
  sessionStates: {
    key: string;
    value: SessionState;
  };
};

const DB_NAME = "studyos-calendar";
const DB_VERSION = 1;
const STORE_NAME = "sessionStates";

function getDb() {
  return openDB<StudyCalendarDB>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, {
          keyPath: "sessionId"
        });
      }
    }
  });
}

export async function getSessionStates() {
  const db = await getDb();
  return db.getAll(STORE_NAME);
}

export async function saveSessionState(state: SessionState) {
  const db = await getDb();
  await db.put(STORE_NAME, state);
}
