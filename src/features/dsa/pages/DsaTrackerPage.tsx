import { DsaDocumentLink } from "@/features/dsa/components/DsaDocumentLink";
import { StudyTrackPage } from "@/features/study/components/StudyTrackPage";

export function DsaTrackerPage() {
  return <StudyTrackPage actions={<DsaDocumentLink />} trackId="dsa" />;
}
