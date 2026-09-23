import Link from "next/link";
import { routines } from "@/content/routines";
import { RoutineThumbnail } from "./RoutineMedia";
import styles from "./Routines.module.css";

export function RoutineCards({ exclude, headingLevel = 3 }: { exclude?: string; headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return <div className={styles.grid}>
    {routines.filter((profile) => profile.slug !== exclude).map((profile) => <article className={styles.card} key={profile.slug} data-reader-cta="routine_open">
      <Link className={styles.imageLink} href={`/routines/${profile.slug}`} aria-label={`Explore ${profile.name}’s skincare routine`}>
        <RoutineThumbnail src={profile.thumbnail} name={profile.name} />
        <span className={styles.videoTag}>Vogue · Beauty Secrets</span>
      </Link>
      <p className={styles.kicker}>{profile.angle} · {profile.sourceDate.slice(0, 4)}</p>
      <Heading><Link href={`/routines/${profile.slug}`}>{profile.name} <span aria-hidden="true">↗</span></Link></Heading>
      <p>{profile.description}</p>
      <Link className={styles.textLink} href={`/routines/${profile.slug}`}>See the routine & our take <span aria-hidden="true">→</span></Link>
    </article>)}
  </div>;
}

export function RoutineFeature() {
  return <section className={styles.feature} aria-labelledby="routine-feature-title">
    <div className="reader-section-heading">
      <div><p className="eyebrow">In the Routine</p><h2 id="routine-feature-title">Familiar faces. A closer look.</h2></div>
      <Link href="/routines" data-reader-cta="routine_index">Explore celebrity routines <span aria-hidden="true">→</span></Link>
    </div>
    <p className={styles.intro}>What they use, straight from the source. What’s worth understanding, from us.</p>
    <RoutineCards />
  </section>;
}
