export type EvidenceGrade = "A" | "B" | "C" | "Context";

export type AccentColor = "raspberry" | "cobalt" | "green" | "violet";

export type Source = {
  label: string;
  url: string;
  published?: string;
};

export type StorySection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

/**
 * A dated, visible change to a published file. Corrections say what was wrong
 * and what replaced it; updates record a new development without implying the
 * original report was incorrect. Both are listed on /corrections automatically.
 */
export type FileUpdate = {
  kind: "correction" | "update";
  date: string;
  dateLabel: string;
  note: string;
};

/** Editor-curated cross links. Every slug is validated by `npm run audit:content`. */
export type Related = {
  dispatches?: string[];
  guides?: string[];
  culture?: string[];
  ingredients?: string[];
  procedures?: string[];
  trends?: string[];
};

export type StoryKind = "news" | "research" | "procedure" | "safety";

export type Story = {
  slug: string;
  kind: StoryKind;
  category: string;
  region: string;
  location: string;
  headline: string;
  shortHeadline: string;
  dek: string;
  /** ISO date of the underlying development or publication. */
  date: string;
  dateLabel: string;
  grade: EvidenceGrade;
  color: AccentColor;
  signal: string;
  whyItMatters: string;
  limitations: string;
  sources: Source[];
  sections: StorySection[];
  related?: Related;
  updates?: FileUpdate[];
};

export type GuideLevel = "Foundations" | "Routine" | "Ingredients" | "Procedures";

export type Guide = {
  slug: string;
  number: string;
  level: GuideLevel;
  title: string;
  description: string;
  takeaways: string[];
  sources: Source[];
  sections: StorySection[];
  related?: Related;
  updates?: FileUpdate[];
};

export type CultureStory = {
  slug: string;
  place: string;
  era: string;
  title: string;
  description: string;
  color: AccentColor;
  note: string;
  sources: Source[];
  sections: StorySection[];
  related?: Related;
  updates?: FileUpdate[];
};

/** U.S. market status of a topical. Other jurisdictions are described in `regulatory`. */
export type TopicalStatus = "Prescription (U.S.)" | "OTC drug (U.S.)" | "OTC drug or prescription (U.S.)" | "Cosmetic ingredient" | "Prescription or cosmetic (U.S.)";

/** One indication with its own grade, so a strong acne grade never leaks onto a weak anti-aging claim. */
export type TopicalUse = {
  use: string;
  grade: EvidenceGrade;
  note: string;
};

export type Ingredient = {
  slug: string;
  name: string;
  family: string;
  /** Overall grade for the ingredient's best-supported use; per-use grades live in `uses`. */
  evidence: EvidenceGrade;
  jobs: string[];
  watchFor: string;
  summary: string;
  guideSlug?: string;
  /** Extra search terms and mention-matching aliases, e.g. "retinol" for retinoids. */
  aliases?: string[];
  status: TopicalStatus;
  /** Strengths and vehicles as sold, with Rx/OTC/cosmetic noted. */
  forms: string[];
  uses: TopicalUse[];
  howToUse: string;
  sideEffects: string[];
  /** Pregnancy, interactions, and who should avoid or get advice first. */
  cautions: string;
  /** Generic availability and what drives price; no dollar figures unless sourced. */
  access: string;
  /** U.S. regulatory status, with other jurisdictions where they differ. */
  regulatory: string;
  /** Where the ingredient shows up in current trends, if it does. */
  trendNote?: string;
  /** How deep the ingredient meaningfully acts; defaults by family in lib/content when omitted. */
  targets?: DepthTarget[];
  image?: MediaImage;
  reviewed: string;
  sources: Source[];
  related?: Related;
  updates?: FileUpdate[];
};

export type TrendCategory = "Routine" | "Ingredient" | "Device" | "Supplement" | "Procedure" | "Safety";

/** The editorial call on a trend. "Needs care" means fine for some people with conditions; "Avoid" is reserved for documented harm. */
export type TrendVerdict = "Reasonable" | "Harmless, low value" | "Needs care" | "Avoid";

export type Trend = {
  slug: string;
  name: string;
  aliases?: string[];
  category: TrendCategory;
  whatItIs: string;
  claim: string;
  evidence: string;
  grade: EvidenceGrade;
  verdict: TrendVerdict;
  whoShouldSkip: string;
  tryInstead?: string;
  reviewed: string;
  sources: Source[];
  related?: Related;
  updates?: FileUpdate[];
};

export type ProcedureCategory =
  | "Facials & spa treatments"
  | "Peels & exfoliation"
  | "Injectables"
  | "Needling"
  | "Lasers & light"
  | "Tightening & lifting"
  | "Body contouring"
  | "Hair & scalp"
  | "Intimate health"
  | "Surgical (face)"
  | "Adjuncts";

/**
 * family — a generic procedure family (many devices, products, or protocols).
 * branded — a trademarked treatment that belongs to a family and must not be
 * read as a verdict on that family. technique — a manual step that is usually
 * sold inside another service.
 */
export type ProcedureKind = "family" | "branded" | "technique";

/** Normalized concerns used for filtering; `goals` stays free text for display. */
export type ProcedureConcern =
  | "Lines & wrinkles"
  | "Volume & contour"
  | "Texture & pores"
  | "Acne & congestion"
  | "Scars"
  | "Pigment & dark spots"
  | "Redness & vessels"
  | "Laxity & lifting"
  | "Hair reduction"
  | "Dullness & hydration"
  | "Sun damage & precancerous spots"
  | "Fat & body contour"
  | "Hair loss"
  | "Tattoos"
  | "Excess skin & jowls"
  | "Intimate health";

/** Who typically performs the treatment in the United States. State scope-of-practice rules vary. */
export type ProcedureSetting = "Spa or esthetician" | "Medical office" | "Physician-performed";

export type DowntimeBand = "None" | "1–3 days" | "4–7 days" | "1–3 weeks" | "3+ weeks";

export type CostBand = "Under $250" | "$250–$750" | "$750–$2,000" | "Over $2,000" | "No reliable estimate";

/**
 * Where a treatment or topical acts. Drives the depth illustration; it is a
 * teaching simplification, not a claim about every device or formula.
 */
export type DepthTarget = "surface" | "epidermis" | "dermis" | "vessels" | "follicle" | "fat" | "muscle" | "smas";

/** A licensed photo or illustration. The audit requires alt text and a credit before it renders. */
export type MediaImage = {
  src: string;
  alt: string;
  credit: string;
  license: string;
  width?: number;
  height?: number;
};

/** An advertised price range compiled from named, dated clinic menus. Never a national average. */
export type AdvertisedPrice = {
  range: string;
  basis: string;
  /** Ids from the price survey registry in content/price-survey.ts. */
  menus: string[];
};

export type PriceMenu = {
  id: string;
  name: string;
  location: string;
  url: string;
  retrieved: string;
  note?: string;
};

/** One entry in the by-concern topicals guide. Slugs are validated against the topical files. */
export type ConcernGuide = {
  slug: string;
  name: string;
  summary: string;
  firstLine: { ingredient: string; why: string }[];
  alsoUseful: { ingredient: string; why: string }[];
  skip: string[];
  seeClinician: string;
  related?: Related;
};

/** A use, market, or outcome figure that travels with its source and its methodological caveat. */
export type ProcedureMetric = {
  value: string;
  label: string;
  source: string;
  caveat: string;
};

export type ProcedureProfile = {
  slug: string;
  name: string;
  /** Alternate names and brand names used for search. */
  aliases?: string[];
  category: ProcedureCategory;
  kind: ProcedureKind;
  /** How a brand relates to its family, or which brands belong to a family. Naming is not endorsement. */
  brandNote?: string;
  goals: string[];
  concerns: ProcedureConcern[];
  /** The exact treatment purpose in one or two sentences. */
  purpose: string;
  summary: string;
  evidenceGrade: EvidenceGrade;
  evidence: string;
  cost: string;
  costBand: CostBand;
  /** What the figure includes and excludes, and where it comes from. */
  costBasis: string;
  appointment: string;
  sessions: string;
  downtime: string;
  downtimeBand: DowntimeBand;
  /** Healing timeline in plain language. */
  healing: string;
  results: string;
  duration: string;
  benefits: string[];
  tradeoffs: string[];
  commonEffects: string[];
  majorRisks: string[];
  candidacy: string;
  pauseIf: string;
  setting: ProcedureSetting;
  operator: string;
  /** U.S. regulatory status of the products or devices involved. */
  regulatory: string;
  ask: string[];
  metrics?: ProcedureMetric[];
  /** Advertised price range from the survey in content/procedure-prices.ts, merged in lib/content. */
  advertised?: AdvertisedPrice;
  /** Where the treatment acts; defaults by category in lib/content when omitted. */
  targets?: DepthTarget[];
  image?: MediaImage;
  /** ISO date of the last editorial review of this profile. */
  reviewed: string;
  sources: Source[];
  related?: Related;
  updates?: FileUpdate[];
};

/** Derived, never declared: "In use" means at least one current file cites the source's domain. */
export type SourceStatus = "In use" | "Watchlist";

export type SourceRegion = "United States" | "Europe" | "Asia" | "Oceania" | "Latin America" | "Global";

/**
 * One entry in the source registry. `domains` lets the site compute whether the
 * source is actually cited in a current file, so coverage claims stay truthful.
 * `cadence` is the intended editorial check cadence, not a log of checks made.
 */
export type SourceRegistryEntry = {
  id: string;
  name: string;
  jurisdiction: string;
  region: SourceRegion;
  type: "Regulator" | "Public health agency" | "Professional society" | "Literature" | "Statistics" | "Archive";
  covers: string[];
  cadence: string;
  url: string;
  domains: string[];
  note?: string;
};

/** A desk-level topic in the coverage taxonomy. */
export type TaxonomyTopic = {
  desk: string;
  href: string;
  description: string;
  includes: string[];
};
