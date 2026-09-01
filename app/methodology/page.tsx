import type { Metadata } from "next";
import { gradeDefinitions } from "@/lib/content";

export const metadata: Metadata = { title: "Methodology", description: "How Skin Considered sources, grades, writes, updates, and corrects its reporting." };

export default function MethodologyPage() {
  return (
    <main id="main-content" className="policy-page">
      <header><span>Methodology / trust is a product feature</span><h1>How a claim becomes a considered claim.</h1></header>
      <div className="policy-layout">
        <aside><p>Our grade follows the exact claim. It is never a permanent score for an ingredient, culture, treatment, or country.</p></aside>
        <article>
          <h2>1. Start as close to the source as possible</h2>
          <p>Regulatory stories begin with regulators and legal text. Research stories begin with the paper, registry, or indexed abstract. Cultural history begins with scholarship, museums, archives, or accountable community sources. Press coverage may help us find a story but does not replace the record.</p>
          <h2>2. Separate the layers</h2>
          <p>Every file distinguishes what happened, what the evidence measured, what remains uncertain, and our practical interpretation. Proposed rules remain proposals. Association remains association. A product-specific trial does not become an ingredient-wide verdict.</p>
          <h2>3. Grade the claim</h2>
          <div className="method-grade-list">
            {Object.entries(gradeDefinitions).map(([grade, definition]) => (
              <div key={grade}><b>{grade === "Context" ? "CTX" : grade}</b><span><strong>{definition.label}</strong>{definition.description}</span></div>
            ))}
          </div>
          <h2>4. Check the pressure points</h2>
          <ul>
            <li>Population, sample size, comparator, duration, and outcome relevance.</li>
            <li>Funding, product provision, author conflicts, and branded multi-product protocols.</li>
            <li>Whether the finding travels across skin tones, climates, markets, doses, and finished formulas.</li>
            <li>Whether a safety or regulatory action applies to one item, one company, or an entire category.</li>
          </ul>
          <h2>5. Date the review and preserve the link</h2>
          <p>Every developing story carries a date. When the underlying status changes, the page should state what changed rather than silently replacing the earlier record.</p>
          <h2>Medical boundary</h2>
          <p>Skin Considered provides journalism and education, not diagnosis or individualized treatment. Urgent symptoms, changing lesions, infection, severe reactions, scarring disease, and procedure complications need qualified care.</p>
        </article>
      </div>
    </main>
  );
}
