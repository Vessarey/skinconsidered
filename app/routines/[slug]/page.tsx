import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NewsletterPanel } from "@/components/NewsletterPanel";
import { RoutineCards } from "@/components/RoutineCards";
import { RoutineVideo } from "@/components/RoutineMedia";
import { routineDate, routineEvidenceSource, routines } from "@/content/routines";
import { canonical, breadcrumbs, schemaDate, seoTitle } from "@/lib/seo";
import { siteUrl } from "@/content/site";
import styles from "@/components/Routines.module.css";

export const dynamicParams = false;
export function generateStaticParams() { return routines.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = routines.find((entry) => entry.slug === slug);
  if (!item) return {};
  return { title: seoTitle(`${item.name}’s skincare routine: products, video & context`), description: item.description, alternates: canonical(`/routines/${slug}`), openGraph: { title: `${item.name}’s skincare routine, considered`, description: item.description, type: "article", url: `/routines/${slug}` } };
}

export default async function RoutinePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const profile = routines.find((entry) => entry.slug === slug);
  if (!profile) notFound();
  const schema = [breadcrumbs(siteUrl(), [{ name: "Home", path: "/" }, { name: "In the Routine", path: "/routines" }, { name: profile.name, path: `/routines/${slug}` }]), {
    "@context": "https://schema.org", "@type": "Article", headline: `${profile.name}’s skincare routine, considered`, description: profile.description,
    datePublished: schemaDate(profile.reviewed), dateModified: schemaDate(profile.reviewed), author: { "@type": "Organization", name: "Skin Considered", url: `${siteUrl()}/about` },
    mainEntityOfPage: `${siteUrl()}/routines/${slug}`, citation: profile.sources.map(({ url }) => url),
  }];
  return <main id="main-content" className={styles.page}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    <Link className={styles.back} href="/routines" data-reader-cta="routine_index">← All celebrity routines</Link>
    <header className={styles.profileHero}>
      <div><p className="eyebrow">In the Routine · {profile.angle}</p><h1>{profile.name}<span>Skincare, considered.</span></h1><p>{profile.description}</p>
        <p className={styles.date}>Source video: <time dateTime={profile.sourceDate}>{routineDate(profile.sourceDate)}</time><br />Our review: <time dateTime={profile.reviewed}>{routineDate(profile.reviewed)}</time></p>
      </div>
      <RoutineVideo videoId={profile.videoId} thumbnail={profile.thumbnail} name={profile.name} />
    </header>
    <div className={styles.body}>
      <section aria-labelledby="products-title"><h2 id="products-title">What’s in the routine</h2><p>Selected skincare steps identified in the original source, not a shopping list or a claim about today’s routine. Formulas and availability may have changed.</p>
        <ol className={styles.products}>{profile.products.map((product, index) => <li key={product.name}><span aria-hidden="true">0{index + 1}</span><div><small>{product.role}</small><h3>{product.name}</h3><p>{product.note}</p></div></li>)}</ol>
        <a className={styles.textLink} href={profile.sourceUrl} target="_blank" rel="noopener noreferrer">See the original Vogue source ↗</a>
      </section>
      <aside>
        <section className={styles.takeaway} aria-labelledby="our-take"><p className="eyebrow">The Skin Considered take</p><h2 id="our-take">Take the idea.<br />Keep your perspective.</h2><p>{profile.takeaway}</p><p><a href={routineEvidenceSource} target="_blank" rel="noopener noreferrer">The independent baseline: AAD’s basic skincare guidance ↗</a></p><nav className={styles.related} aria-label="Understand the routine" data-reader-cta="routine_context">{profile.related.map((item) => <Link key={item.href} href={item.href}>{item.label} →</Link>)}</nav></section>
        <h2>Keep in mind</h2><p>{profile.disclosure}</p><p>A filmed routine does not establish what caused someone’s skin appearance, or whether a product will suit you. We have not verified every payment or gifting relationship.</p>
      </aside>
    </div>
    <details className={styles.sources}><summary>Sources & how we put this together</summary><p>Product identification comes from the first-person recording or accompanying publisher list. Independent routine context comes from the American Academy of Dermatology. We did not test these products. Vogue may earn commissions from its shopping links; Skin Considered’s links here are non-affiliate. Video and preview images are served by YouTube, not reuploaded by us.</p><ul>{profile.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.label} ↗</a></li>)}<li><a href={routineEvidenceSource} target="_blank" rel="noopener noreferrer">American Academy of Dermatology · skincare on a budget ↗</a></li></ul></details>
    <NewsletterPanel source={`routine-${slug}`} compact />
    <section className={styles.more} aria-labelledby="more-routines"><h2 id="more-routines">Another routine. Another perspective.</h2><RoutineCards exclude={slug} /></section>
  </main>;
}
