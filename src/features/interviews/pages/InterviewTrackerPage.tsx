import { BrainCircuit, Target } from "lucide-react";
import { useState } from "react";

import { DsaDocumentLink } from "@/features/dsa/components/DsaDocumentLink";
import { InterviewCategoryCard } from "@/features/interviews/components/InterviewCategoryCard";
import { MockInterviewModal } from "@/features/interviews/components/MockInterviewModal";
import { InterviewReadinessPanel } from "@/features/interviews/components/InterviewReadinessPanel";
import { interviewCategories } from "@/features/interviews/data/interviewCatalog";
import { useInterviewPrep } from "@/features/interviews/hooks/useInterviewPrep";
import type { InterviewCategory } from "@/features/interviews/types";
import { PageHeader } from "@/shared/components/PageHeader";
import { PageTransition } from "@/shared/components/PageTransition";

const targetRoles = [
  "Backend Developer (.NET)",
  "Full Stack Developer (.NET + React)",
  "Python Developer",
  "Generative AI Engineer",
  "Software Engineer (Product Companies)"
];

export function InterviewTrackerPage() {
  const {
    isLoading,
    markCategoryComplete,
    markTopicRevised,
    stateByTopicId,
    summary,
    toggleTopicComplete,
    updateTopicNotes
  } = useInterviewPrep();
  const [mockCategory, setMockCategory] = useState<InterviewCategory | null>(null);

  return (
    <PageTransition>
      <PageHeader
        actions={<DsaDocumentLink />}
        description="Central preparation hub for software engineering interviews, personalized around your .NET backend, React, Python, Generative AI, Azure, and product-company target roles."
        eyebrow="Interview Preparation Hub"
        title="Interview Preparation Hub"
      />

      <section className="rounded-lg border border-white/10 bg-white/[0.055] p-5 shadow-glow backdrop-blur">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex gap-3">
            <span className="rounded-md bg-brand/12 p-2 text-brand">
              <Target aria-hidden="true" size={21} />
            </span>
            <div>
              <h2 className="text-lg font-semibold text-ink">Target Roles</h2>
              <p className="mt-1 text-sm text-muted">
                Prep is aligned with your resume, Wipro backend experience,
                IntelliApply GenAI project, and 7-15 LPA software engineering goal.
              </p>
            </div>
          </div>
          <DsaDocumentLink variant="primary" />
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {targetRoles.map((role) => (
            <span
              className="rounded-md border border-border bg-canvas/70 px-3 py-1.5 text-sm font-medium text-ink"
              key={role}
            >
              {role}
            </span>
          ))}
        </div>
      </section>

      <InterviewReadinessPanel summary={summary} />

      {isLoading ? (
        <section className="grid min-h-60 place-items-center rounded-lg border border-border bg-panel text-sm text-muted">
          Loading interview preparation hub...
        </section>
      ) : (
        <section className="grid gap-5">
          <div className="flex items-center gap-3">
            <span className="rounded-md bg-success/12 p-2 text-success">
              <BrainCircuit aria-hidden="true" size={20} />
            </span>
            <div>
              <h2 className="text-xl font-semibold text-ink">
                Preparation Categories
              </h2>
              <p className="text-sm text-muted">
                Complete topics, revise regularly, capture notes, and run mock
                interviews by category.
              </p>
            </div>
          </div>

          {interviewCategories.map((category) => (
            <InterviewCategoryCard
              category={category}
              key={category.id}
              onMarkCategoryComplete={(topicIds) => {
                void markCategoryComplete(topicIds);
              }}
              onMarkRevised={(topicId) => {
                void markTopicRevised(topicId);
              }}
              onMockInterview={setMockCategory}
              onToggleTopic={(topicId) => {
                void toggleTopicComplete(topicId);
              }}
              onUpdateNotes={(topicId, notes) => {
                void updateTopicNotes(topicId, notes);
              }}
              stateByTopicId={stateByTopicId}
            />
          ))}
        </section>
      )}

      <MockInterviewModal
        category={mockCategory}
        onClose={() => setMockCategory(null)}
      />
    </PageTransition>
  );
}
