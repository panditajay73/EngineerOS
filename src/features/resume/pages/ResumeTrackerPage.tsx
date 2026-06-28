import {
  BriefcaseBusiness,
  CheckCircle2,
  ExternalLink,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  Phone,
  Sparkles
} from "lucide-react";

import { resumeProfile } from "@/features/resume/data/resumeProfile";
import { Card } from "@/shared/components/Card";
import { PageHeader } from "@/shared/components/PageHeader";
import { PageTransition } from "@/shared/components/PageTransition";
import { ProgressRing } from "@/shared/components/ProgressRing";

const checklist = [
  { label: "Real resume profile imported", done: true },
  { label: "GitHub profile connected", done: true },
  { label: "LinkedIn profile connected", done: true },
  { label: "Portfolio/project live links added", done: false },
  { label: "ATS metrics and impact numbers added", done: false },
  { label: "Mock interview stories drafted", done: false }
] as const;

export function ResumeTrackerPage() {
  const completed = checklist.filter((item) => item.done).length;
  const completion = Math.round((completed / checklist.length) * 100);

  return (
    <PageTransition>
      <PageHeader
        description="Your resume details are now integrated into StudyOS so preparation, projects, and career readiness line up with your actual profile."
        eyebrow="Resume Tracker"
        title={resumeProfile.name}
      />

      <section className="grid gap-6 xl:grid-cols-[0.75fr_1.25fr]">
        <Card className="p-6">
          <div className="flex flex-col items-center text-center">
            <ProgressRing label="Resume Readiness" value={completion} />
            <h2 className="mt-5 text-xl font-semibold text-ink">
              {resumeProfile.targetRole}
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted">
              Backend-focused engineer with .NET, SQL Server, React, Azure, and
              GenAI automation experience.
            </p>
          </div>
          <div className="mt-6 space-y-2">
            <a
              className="flex items-center gap-2 rounded-md border border-border bg-canvas/55 px-3 py-2 text-sm text-ink hover:text-brand"
              href={`mailto:${resumeProfile.email}`}
            >
              <Mail aria-hidden="true" size={16} />
              {resumeProfile.email}
            </a>
            <a
              className="flex items-center gap-2 rounded-md border border-border bg-canvas/55 px-3 py-2 text-sm text-ink hover:text-brand"
              href={`tel:${resumeProfile.phone}`}
            >
              <Phone aria-hidden="true" size={16} />
              {resumeProfile.phone}
            </a>
            <a
              className="flex items-center gap-2 rounded-md border border-border bg-canvas/55 px-3 py-2 text-sm text-ink hover:text-brand"
              href={resumeProfile.github.url}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Github aria-hidden="true" size={16} />
              {resumeProfile.github.label}
              <ExternalLink aria-hidden="true" className="ml-auto" size={14} />
            </a>
            <a
              className="flex items-center gap-2 rounded-md border border-border bg-canvas/55 px-3 py-2 text-sm text-ink hover:text-brand"
              href={resumeProfile.linkedin.url}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Linkedin aria-hidden="true" size={16} />
              {resumeProfile.linkedin.label}
              <ExternalLink aria-hidden="true" className="ml-auto" size={14} />
            </a>
          </div>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          {resumeProfile.skillGroups.map((group) => (
            <Card className="p-5" key={group.label}>
              <h2 className="text-lg font-semibold text-ink">{group.label}</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    className="rounded-md border border-border bg-canvas px-2.5 py-1 text-xs font-medium text-muted"
                    key={skill}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-ink">Experience</h2>
          {resumeProfile.experience.map((experience) => (
            <Card className="p-5" key={`${experience.company}-${experience.role}`}>
              <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-ink">
                    {experience.role}
                  </h3>
                  <p className="mt-1 text-sm text-brand">{experience.company}</p>
                </div>
                <span className="rounded-md border border-border bg-canvas px-2.5 py-1 text-xs text-muted">
                  {experience.period}
                </span>
              </div>
              <ul className="mt-4 space-y-2">
                {experience.highlights.map((highlight) => (
                  <li
                    className="flex gap-2 text-sm leading-6 text-muted"
                    key={highlight}
                  >
                    <CheckCircle2
                      aria-hidden="true"
                      className="mt-1 shrink-0 text-success"
                      size={16}
                    />
                    {highlight}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-ink">Readiness Checklist</h2>
          <Card className="p-5">
            <div className="space-y-3">
              {checklist.map((item) => (
                <div className="flex items-center gap-3" key={item.label}>
                  <span
                    className={
                      item.done
                        ? "rounded-md bg-success/12 p-1.5 text-success"
                        : "rounded-md bg-panel-soft p-1.5 text-muted"
                    }
                  >
                    <CheckCircle2 aria-hidden="true" size={16} />
                  </span>
                  <span className="text-sm text-ink">{item.label}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-ink">
              <Sparkles aria-hidden="true" className="text-warning" size={20} />
              Resume Improvement Actions
            </h3>
            <ul className="mt-4 space-y-3">
              {resumeProfile.improvementActions.map((action) => (
                <li className="text-sm leading-6 text-muted" key={action}>
                  {action}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <Card className="p-5">
          <h2 className="flex items-center gap-2 text-xl font-semibold text-ink">
            <BriefcaseBusiness aria-hidden="true" className="text-brand" size={21} />
            Projects
          </h2>
          <div className="mt-5 space-y-5">
            {resumeProfile.projects.map((project) => (
              <article key={project.name}>
                <h3 className="text-lg font-semibold text-ink">{project.name}</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {project.stack.map((stack) => (
                    <span
                      className="rounded-md border border-brand/30 bg-brand/10 px-2.5 py-1 text-xs text-brand"
                      key={stack}
                    >
                      {stack}
                    </span>
                  ))}
                </div>
                <ul className="mt-3 space-y-2">
                  {project.highlights.map((highlight) => (
                    <li className="text-sm leading-6 text-muted" key={highlight}>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <h2 className="flex items-center gap-2 text-xl font-semibold text-ink">
            <GraduationCap aria-hidden="true" className="text-success" size={21} />
            Education and Certifications
          </h2>
          <div className="mt-5 space-y-4">
            {resumeProfile.education.map((education) => (
              <div
                className="rounded-md border border-border bg-canvas/55 p-4"
                key={education.institution}
              >
                <h3 className="text-base font-semibold text-ink">
                  {education.institution}
                </h3>
                <p className="mt-1 text-sm text-muted">{education.credential}</p>
                <p className="mt-2 text-xs text-brand">
                  {education.period} · {education.score}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-5">
            <h3 className="text-sm font-semibold text-ink">Certifications</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {resumeProfile.certifications.map((certification) => (
                <span
                  className="rounded-md border border-success/30 bg-success/10 px-2.5 py-1 text-xs font-medium text-success"
                  key={certification}
                >
                  {certification}
                </span>
              ))}
            </div>
          </div>
        </Card>
      </section>
    </PageTransition>
  );
}
