import type { EvidenceGrade } from "./types";

/**
 * One item in an issue. `href` is a site path ("/dispatches/…") or an absolute
 * primary-source URL. `grade` is copied from the file the item points to so the
 * email carries the same evidence label as the site; context-only items omit it.
 */
export type IssueItem = {
  title: string;
  /** "4 min read", "Guide 12", "Trend verdict". Mirrors the label after each TLDR-style headline. */
  label: string;
  href: string;
  summary: string;
  grade?: EvidenceGrade;
};

export type IssueSection = {
  emoji: string;
  heading: string;
  items: IssueItem[];
};

export type NewsletterIssue = {
  /** ISO date; doubles as the URL segment /newsletter/YYYY-MM-DD. */
  date: string;
  dateLabel: string;
  /** Subject line. Keep under 60 characters. */
  subject: string;
  /** Inbox preview text, under 110 characters. */
  preheader: string;
  /** One or two short paragraphs at the top. Plain text only. */
  intro: string[];
  sections: IssueSection[];
  /** Optional closing line above the footer. */
  outro?: string;
};

/**
 * Issues of The Daily Considered, newest first. Every item links to a file on
 * the site or a primary source, and each site file already carries its own
 * sources and limitations. Add a new issue at the top; `npm run audit:content`
 * validates dates, labels, grades, and links.
 */
export const newsletterIssues: NewsletterIssue[] = [
  {
    date: "2026-09-04",
    dateLabel: "September 4, 2026",
    subject: "Three bottle sizes, one mercury cream, and a new sunscreen filter",
    preheader: "The Simple micellar recall now covers 200, 400, and 730 ml. Plus: what a bemotrizinol approval does and does not change.",
    intro: [
      "Good morning. Today's issue is built from the wire: two official safety actions you can act on, one regulatory change that will take a while to reach a shelf near you, and a review that quietly argues for boring routines.",
      "As always, the grade sits on the exact claim, never on the brand.",
    ],
    sections: [
      {
        emoji: "🚨",
        heading: "Safety desk",
        items: [
          {
            title: "Simple micellar-water recall expands to 200, 400, and 730 ml",
            label: "4 min read",
            href: "/dispatches/uk-simple-micellar-water-recall",
            grade: "A",
            summary:
              "The U.K. Office for Product Safety and Standards widened the recall from the 730 ml bottle to listed batches of the 200 ml and 400 ml sizes over possible microbial contamination. Check the batch code against the official annex; bottles not on the list are not recalled.",
          },
          {
            title: "FDA warns about mercury in La Crema De Rebeca",
            label: "4 min read",
            href: "/dispatches/us-skin-lightening-mercury-warning-2026",
            grade: "A",
            summary:
              "FDA laboratory testing found high mercury levels in a skin-lightening cream sold online, undisclosed on the label. Stop using it, and bring the label to a clinician if you have. This is a finding about one named product, not a verdict on every pigment product.",
          },
        ],
      },
      {
        emoji: "🏛️",
        heading: "Regulation",
        items: [
          {
            title: "The U.S. added its first new sunscreen active in decades",
            label: "5 min read",
            href: "/dispatches/bemotrizinol-us-sunscreen-filter",
            grade: "A",
            summary:
              "The FDA's final order permits bemotrizinol at concentrations up to 6% in over-the-counter sunscreens. Finished products still depend on manufacturers and compliant formulas, so this changes what can be sold, not what is on shelves today.",
          },
          {
            title: "What 1.29 million U.S. cosmetic listings do, and do not, mean",
            label: "4 min read",
            href: "/dispatches/us-cosmetics-mocra-listing-2026",
            summary:
              "FDA reports 16,398 active facility registrations and 1,298,361 product listings under MoCRA as of June 30. Listing is a traceability requirement. It is not approval, and a listed product is not a vetted product.",
          },
        ],
      },
      {
        emoji: "🔬",
        heading: "Research",
        items: [
          {
            title: "Basic routines did meaningful work in dermatology trials",
            label: "6 min read",
            href: "/dispatches/basic-skincare-vehicle-arms-review",
            grade: "B",
            summary:
              "A 2026 narrative review looked at the nonmedicated vehicle groups in controlled trials for acne, melasma, rosacea, and more, and found meaningful improvement from basics alone. It is not a meta-analysis, and one author disclosed industry fees.",
          },
        ],
      },
      {
        emoji: "🧭",
        heading: "Weigh a trend",
        items: [
          {
            title: "Slugging",
            label: "Trend verdict",
            href: "/trends/slugging",
            grade: "A",
            summary:
              "Verdict: reasonable, with a Grade A on petrolatum as an occlusive. It is a standard recommendation for dry or irritated skin applied to everyone; the file names who should skip it and how to slug selectively.",
          },
          {
            title: "Before a laser, peel, or microneedling appointment",
            label: "Guide 12",
            href: "/guides/procedure-safety-checklist",
            summary:
              "Match the provider's training and the device's authorization to the exact procedure and goal, then ask for realistic outcomes, alternatives, downtime, pigment risk, and a complication plan.",
          },
        ],
      },
    ],
    outro: "Reply to this email with a question or a correction. Corrections are sent to the same inbox, dated, and appear on the file itself.",
  },
];
