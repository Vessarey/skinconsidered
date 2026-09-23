import type { Metadata } from "next";
import { NewsletterPanel } from "@/components/NewsletterPanel";
import { RoutineCards } from "@/components/RoutineCards";
import { canonical } from "@/lib/seo";
import styles from "@/components/Routines.module.css";

export const metadata: Metadata = {
  title: "Celebrity skincare routines, with sources | In the Routine",
  description: "Explore Hailey Bieber, Dua Lipa, and Issa Rae’s source-linked skincare routines. Original videos, products identified, brand ties, and independent context.",
  alternates: canonical("/routines"),
};

export default function RoutinesPage() {
  return <main id="main-content" className={styles.page}>
    <header className={styles.hero}>
      <p className="eyebrow">In the Routine · Celebrity skincare, considered</p>
      <h1>Their routines.<br /><em>Your perspective.</em></h1>
      <p>A look inside familiar faces’ skincare routines—with the original videos, the products they name, and a little independent perspective. Inspiration, without the pressure to buy it all.</p>
    </header>
    <section className={styles.gallery} aria-label="Celebrity skincare routines"><RoutineCards headingLevel={2} /></section>
    <section className={styles.context} aria-labelledby="routine-context">
      <h2 id="routine-context">A routine is a snapshot.<br />Not a prescription.</h2>
      <p>These are selected steps from dated, first-person interviews—not confirmation of what someone uses today. We show brand relationships where known and separate personal experiences from evidence. No product rankings, shopping commissions, or promises of celebrity skin.</p>
    </section>
    <NewsletterPanel source="routines" />
  </main>;
}
