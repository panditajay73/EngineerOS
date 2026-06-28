import { openDB, type DBSchema } from "idb";

import type { InterviewTopicState } from "@/features/interviews/types";

type InterviewPrepDB = DBSchema & {
  topicStates: {
    key: string;
    value: InterviewTopicState;
  };
};

const DB_NAME = "studyos-interview-prep";
const DB_VERSION = 1;
const STORE_NAME = "topicStates";

function getDb() {
  return openDB<InterviewPrepDB>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, {
          keyPath: "topicId"
        });
      }
    }
  });
}

export async function getInterviewTopicStates() {
  const db = await getDb();
  return db.getAll(STORE_NAME);
}

export async function saveInterviewTopicState(state: InterviewTopicState) {
  const db = await getDb();
  await db.put(STORE_NAME, state);
}
