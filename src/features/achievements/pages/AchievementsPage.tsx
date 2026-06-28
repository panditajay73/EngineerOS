import { Award, BadgeCheck, Coins, Flame, Star, Trophy } from "lucide-react";

import { useStudyProgressStore } from "@/features/progress/store/progressStore";
import { Card } from "@/shared/components/Card";
import { PageHeader } from "@/shared/components/PageHeader";
import { PageTransition } from "@/shared/components/PageTransition";

const badges = [
  { title: "Streak Starter", description: "Complete five study days.", icon: Flame, unlocked: true },
  { title: "API Builder", description: "Ship the first Task Management API milestone.", icon: BadgeCheck, unlocked: true },
  { title: "Graph Climber", description: "Finish core graph traversal patterns.", icon: Star, unlocked: false },
  { title: "Offer Ready", description: "Complete ten interview simulations.", icon: Trophy, unlocked: false }
] as const;

export function AchievementsPage() {
  const progress = useStudyProgressStore();

  return (
    <PageTransition>
      <PageHeader
        description="Track XP, coins, badges, achievements, daily streaks, and level titles from Intern to Architect."
        eyebrow="Gamification"
        title="Momentum you can feel"
      />
      <section className="grid gap-4 md:grid-cols-3">
        <Card className="p-5">
          <Award aria-hidden="true" className="text-brand" size={24} />
          <p className="mt-4 text-3xl font-semibold text-ink">{progress.currentLevel}</p>
          <p className="mt-1 text-sm text-muted">Current Level</p>
        </Card>
        <Card className="p-5">
          <Coins aria-hidden="true" className="text-warning" size={24} />
          <p className="mt-4 text-3xl font-semibold text-ink">{progress.coins}</p>
          <p className="mt-1 text-sm text-muted">Coins</p>
        </Card>
        <Card className="p-5">
          <Flame aria-hidden="true" className="text-success" size={24} />
          <p className="mt-4 text-3xl font-semibold text-ink">{progress.streakDays}</p>
          <p className="mt-1 text-sm text-muted">Daily Streak</p>
        </Card>
      </section>
      <section className="grid gap-4 md:grid-cols-2">
        {badges.map((badge) => (
          <Card className="p-5" key={badge.title}>
            <div className="flex gap-3">
              <span
                className={
                  badge.unlocked
                    ? "rounded-md bg-success/12 p-2 text-success"
                    : "rounded-md bg-panel-soft p-2 text-muted"
                }
              >
                <badge.icon aria-hidden="true" size={22} />
              </span>
              <div>
                <h2 className="text-lg font-semibold text-ink">{badge.title}</h2>
                <p className="mt-1 text-sm leading-6 text-muted">{badge.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </section>
    </PageTransition>
  );
}
