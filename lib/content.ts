export type EvidenceGrade = "A" | "B" | "C" | "Context";

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

export type Story = {
  slug: string;
  kind: "news" | "research" | "procedure" | "safety";
  category: string;
  region: string;
  location: string;
  headline: string;
  shortHeadline: string;
  dek: string;
  date: string;
  dateLabel: string;
  readTime: string;
  grade: EvidenceGrade;
  color: "raspberry" | "cobalt" | "green" | "violet";
  signal: string;
  whyItMatters: string;
  limitations: string;
  sources: Source[];
  sections: StorySection[];
};

export type Guide = {
  slug: string;
  number: string;
  level: "Foundations" | "Routine" | "Ingredients" | "Procedures";
  title: string;
  description: string;
  readTime: string;
  takeaways: string[];
  sources: Source[];
  sections: StorySection[];
};

export type CultureStory = {
  slug: string;
  place: string;
  era: string;
  title: string;
  description: string;
  readTime: string;
  color: "raspberry" | "cobalt" | "green" | "violet";
  note: string;
  sources: Source[];
  sections: StorySection[];
};

export type Ingredient = {
  slug: string;
  name: string;
  family: string;
  evidence: EvidenceGrade;
  jobs: string[];
  watchFor: string;
  summary: string;
  guideSlug?: string;
};

export const LAST_REVIEWED = "September 1, 2026";

export const stories: Story[] = [
  {
    slug: "bemotrizinol-us-sunscreen-filter",
    kind: "news",
    category: "Regulation",
    region: "North America",
    location: "United States",
    headline: "Bemotrizinol is now permitted in U.S. over-the-counter sunscreens",
    shortHeadline: "The U.S. added its first new sunscreen active in decades",
    dek: "The FDA issued a final order allowing bemotrizinol at concentrations up to 6%. Product launches still depend on manufacturers and compliant finished formulas.",
    date: "2026-06-09",
    dateLabel: "June 9, 2026",
    readTime: "6 min",
    grade: "A",
    color: "cobalt",
    signal: "Final regulatory action",
    whyItMatters: "It expands the set of UV filters available to U.S. formulators and may enable more cosmetically elegant broad-spectrum products.",
    limitations: "Permission is not the same as immediate shelf availability, and it does not make every future formula equally protective or tolerable.",
    sources: [
      {
        label: "U.S. Food and Drug Administration — final action announcement",
        url: "https://www.fda.gov/news-events/press-announcements/fda-expands-sunscreen-options-first-time-20-years",
        published: "June 9, 2026",
      },
      {
        label: "FDA consumer sunscreen guidance",
        url: "https://www.fda.gov/drugs/understanding-over-counter-medicines/sunscreen-how-help-protect-your-skin-sun",
      },
    ],
    sections: [
      {
        heading: "What changed",
        paragraphs: [
          "The U.S. Food and Drug Administration added bemotrizinol to the over-the-counter sunscreen monograph after reviewing a submitted order request and public comments. The final conditions permit use at concentrations up to 6% when the finished product meets the rest of the monograph requirements.",
          "Bemotrizinol has been used in sunscreens in Europe and other markets for years. In the United States, sunscreens are regulated as nonprescription drugs, so a filter cannot simply be imported into a domestic formula because it is accepted elsewhere.",
        ],
      },
      {
        heading: "What shoppers should expect",
        paragraphs: [
          "The order opens a regulatory door; it does not set a retail date. Manufacturers decide whether and when to develop, test, label, and distribute compliant products.",
          "A filter name alone cannot tell you how a finished sunscreen will feel or perform. Look for broad-spectrum labeling, an SPF appropriate to your use, water resistance when needed, and a texture you will apply generously and repeat.",
        ],
      },
      {
        heading: "The considered take",
        paragraphs: [
          "This is a meaningful regulatory update, not a reason to wait for a future launch before protecting your skin. Existing broad-spectrum sunscreens remain useful when applied correctly alongside shade, clothing, and other sun-protective measures.",
        ],
      },
    ],
  },
  {
    slug: "uk-cosmetics-safety-notifications-2026",
    kind: "safety",
    category: "Safety",
    region: "Europe",
    location: "United Kingdom",
    headline: "The U.K. publishes a clearer view of its cosmetics notification system",
    shortHeadline: "U.K. cosmetics notifications pass 861,000",
    dek: "The Office for Product Safety and Standards says 861,686 notifications had entered its system by May 28, 2026—and points to prior action on prohibited ingredients.",
    date: "2026-07-17",
    dateLabel: "July 17, 2026",
    readTime: "5 min",
    grade: "Context",
    color: "raspberry",
    signal: "Regulatory transparency",
    whyItMatters: "Notification data helps show the scale of the market and the infrastructure used to trace responsible businesses and investigate safety problems.",
    limitations: "A notification is not an endorsement, approval, or guarantee that a product will suit an individual user.",
    sources: [
      {
        label: "U.K. Office for Product Safety and Standards",
        url: "https://www.gov.uk/government/news/new-data-on-uk-cosmetic-product-safety-notifications",
        published: "July 17, 2026",
      },
    ],
    sections: [
      {
        heading: "What the number means",
        paragraphs: [
          "Great Britain requires businesses placing cosmetics on the market to notify the Submit a Cosmetic Product Notification service. The 861,686 figure reflects notifications since the system launched in December 2020, not a count of products independently tested or approved by the government.",
          "The regulator said 24,112 Responsible Persons were registered as of May 28, 2026. A Responsible Person carries legal duties for product compliance and traceability.",
        ],
      },
      {
        heading: "The useful consumer signal",
        paragraphs: [
          "The announcement says the regulator has previously acted when notified products contained banned chemicals. For shoppers, complete labeling, a traceable business address, batch information, and clear precautions are baseline signals—not proof of efficacy.",
        ],
      },
    ],
  },
  {
    slug: "australia-sunscreen-testing-consultation",
    kind: "news",
    category: "Sunscreen",
    region: "Oceania",
    location: "Australia",
    headline: "Australia reviews how sunscreen testing and oversight should work",
    shortHeadline: "Australia puts SPF testing rules under review",
    dek: "The TGA consultation focused on laboratory oversight, testing transparency, ingredient standards, lifecycle checks, and clearer SPF labels.",
    date: "2026-03-26",
    dateLabel: "March 26, 2026",
    readTime: "6 min",
    grade: "Context",
    color: "green",
    signal: "Public consultation",
    whyItMatters: "Australia has an unusually high skin-cancer burden, so confidence in sunscreen testing and labeling has direct public-health stakes.",
    limitations: "A consultation describes options under consideration. It is not a final rule and should not be reported as one.",
    sources: [
      {
        label: "Australian Therapeutic Goods Administration",
        url: "https://www.tga.gov.au/news/media-releases/improving-regulation-sunscreens-australia",
        published: "March 26, 2026",
      },
    ],
    sections: [
      {
        heading: "What was proposed for discussion",
        paragraphs: [
          "The Therapeutic Goods Administration opened an eight-week consultation on possible improvements to sunscreen regulation. Its options included stronger oversight of testing laboratories, more reliable and transparent SPF testing, timelier adoption of new test methods, periodic quality checks, ingredient standards, and simpler labeling.",
        ],
      },
      {
        heading: "Why the process matters",
        paragraphs: [
          "A sunscreen label compresses a large amount of formulation and testing work into a few claims. Regulation determines which test methods count, how evidence is documented, and what happens when products or laboratories fall short.",
          "Until a final response is published, the correct headline is that Australia is reviewing the framework—not that the framework has already changed.",
        ],
      },
    ],
  },
  {
    slug: "eu-cosmetics-bmcha-safety-alerts",
    kind: "safety",
    category: "Ingredient safety",
    region: "Europe",
    location: "European Union",
    headline: "A banned fragrance ingredient dominated E.U. cosmetics safety alerts",
    shortHeadline: "BMCHA drove most E.U. cosmetics alerts in 2025",
    dek: "A European Commission report said almost eight in ten cosmetics alerts concerned BMCHA, a banned synthetic fragrance associated with reproductive and skin-irritation risks.",
    date: "2026-03-05",
    dateLabel: "March 5, 2026",
    readTime: "5 min",
    grade: "A",
    color: "violet",
    signal: "Market-surveillance data",
    whyItMatters: "It shows why ingredient restrictions require active marketplace enforcement, especially across fragmented online supply chains.",
    limitations: "The alert share describes cases reported to the system, not the prevalence of the ingredient across every cosmetic sold in Europe.",
    sources: [
      {
        label: "European Commission — Safety Gate annual report press release",
        url: "https://ec.europa.eu/commission/presscorner/api/files/document/print/en/ip_26_537/IP_26_537_EN.pdf",
        published: "March 5, 2026",
      },
    ],
    sections: [
      {
        heading: "The alert pattern",
        paragraphs: [
          "The European Commission reported that nearly 80% of Safety Gate alerts involving cosmetics concerned BMCHA, a synthetic fragrance ingredient banned in cosmetics. The stated concerns include reproductive harm and skin irritation.",
          "Safety Gate is a rapid-alert system: it helps national authorities share information about dangerous non-food products and coordinate action.",
        ],
      },
      {
        heading: "How to use this information",
        paragraphs: [
          "Consumers should not turn an alert statistic into a blanket claim that European cosmetics are unsafe. The sharper lesson is that prohibited ingredients can still appear in products and enforcement data is worth checking when a regulator or retailer announces a recall.",
        ],
      },
    ],
  },
  {
    slug: "brazil-anvisa-sunscreen-recall-henlau",
    kind: "safety",
    category: "Recall",
    region: "Latin America",
    location: "Brazil",
    headline: "Brazil orders a recall of sunscreens and repellents from one manufacturer",
    shortHeadline: "Anvisa bans products made by Henlau Química",
    dek: "Brazil’s health regulator prohibited manufacture, sale, advertising, and use of listed products and ordered a recall of cosmetics made by Henlau Química.",
    date: "2026-04-29",
    dateLabel: "April 29, 2026",
    readTime: "4 min",
    grade: "A",
    color: "raspberry",
    signal: "Official recall action",
    whyItMatters: "Recall notices are actionable safety information, especially for products such as sunscreen where failed compliance can undermine expected protection.",
    limitations: "The action concerns the named manufacturer and products; it should not be generalized to Brazilian sunscreens as a category.",
    sources: [
      {
        label: "Agência Nacional de Vigilância Sanitária (Anvisa)",
        url: "https://www.gov.br/anvisa/pt-br/assuntos/noticias-anvisa/2026/anvisa-proibe-protetores-solares-e-repelentes",
        published: "April 29, 2026",
      },
    ],
    sections: [
      {
        heading: "The action",
        paragraphs: [
          "Anvisa announced Resolution RE 1.743/2026, prohibiting manufacture, distribution, sale, advertising, and use of repellents and sunscreens from Henlau Química. It also ordered a recall and extended the prohibition to cosmetics made by the company.",
          "Readers in Brazil should use the regulator’s notice—not screenshots or translated social posts—to match manufacturer and product information.",
        ],
      },
      {
        heading: "What a recall does not say",
        paragraphs: [
          "A company-specific enforcement action is not evidence that all products from a country or an ingredient class are unsafe. Precise names, dates, and issuing authorities matter.",
        ],
      },
    ],
  },
  {
    slug: "basic-skincare-vehicle-arms-review",
    kind: "research",
    category: "Research",
    region: "Global",
    location: "United Kingdom / international trials",
    headline: "The overlooked evidence for simple cleansing, moisturizing, and sun protection",
    shortHeadline: "Basic routines did meaningful work in dermatology trials",
    dek: "A 2026 narrative review examined the nonmedicated ‘vehicle’ groups in controlled dermatology trials and found meaningful improvement across several conditions.",
    date: "2026-04-02",
    dateLabel: "April 2, 2026",
    readTime: "8 min",
    grade: "B",
    color: "green",
    signal: "Narrative review of controlled trials",
    whyItMatters: "It supports a lower-cost, lower-complexity starting point: consistent basic care can contribute substantially even when it is not the active treatment under study.",
    limitations: "This was a narrative review of vehicle arms across different diseases and formulations, not a new pooled meta-analysis or proof that basics replace indicated treatment.",
    sources: [
      {
        label: "PubMed — Skin Health and Disease review",
        url: "https://pubmed.ncbi.nlm.nih.gov/42222690/",
        published: "April 2, 2026",
      },
    ],
    sections: [
      {
        heading: "What the authors looked at",
        paragraphs: [
          "The review examined outcomes in vehicle groups from randomized trials involving acne, actinic keratoses, melasma, post-inflammatory hyperpigmentation, and rosacea. A vehicle is the base formulation without the studied active drug, so its results can reveal the contribution of moisturization, cleansing, sun protection, study behavior, and natural change over time.",
        ],
      },
      {
        heading: "What the signal can—and cannot—support",
        paragraphs: [
          "The paper argues that basic skincare should be treated as part of dermatologic care, not as empty background. That is compatible with using prescribed treatment when it is needed.",
          "Vehicle results do not mean every moisturizer is equivalent, that a condition will resolve without medical care, or that the active treatment added no value. They are a reminder to measure the whole routine.",
        ],
      },
    ],
  },
  {
    slug: "ceramide-np-c15-sensitive-skin-trial",
    kind: "research",
    category: "Barrier science",
    region: "Europe",
    location: "Germany",
    headline: "A small controlled trial finds a ceramide signal in impaired skin barriers",
    shortHeadline: "Ceramide NP C15 shows a barrier signal—with caveats",
    dek: "In a 50-person split-body trial, both the test emollient and vehicle improved symptoms; the ceramide formula was associated with lower water loss in participants with impaired barriers.",
    date: "2026-02-01",
    dateLabel: "2026 publication",
    readTime: "7 min",
    grade: "B",
    color: "cobalt",
    signal: "Double-blind, vehicle-controlled human study",
    whyItMatters: "The vehicle response keeps the interpretation honest: formulation base and regular emollient use may matter alongside a highlighted ingredient.",
    limitations: "The study was small, monocentric, and included exploratory microbiome outcomes whose clinical importance is not established.",
    sources: [
      {
        label: "PubMed — Ceramide NP C15 emollient trial",
        url: "https://pubmed.ncbi.nlm.nih.gov/41758783/",
        published: "2026",
      },
    ],
    sections: [
      {
        heading: "The design",
        paragraphs: [
          "Fifty participants used a Ceramide NP C15 emollient and a vehicle in a randomized, double-blind, split-body design for six weeks. The researchers measured symptoms and barrier physiology and explored bacterial community changes with two profiling methods.",
        ],
      },
      {
        heading: "The measured result",
        paragraphs: [
          "Both sides improved on subjective symptoms. Among participants with impaired barrier function, the ceramide formula was associated with a significant reduction in transepidermal water loss. Exploratory microbiome analyses found modest treatment-associated differences.",
          "This is encouraging but not a category-wide verdict. The exact formula, population, comparator, and subgroup all shape the result.",
        ],
      },
    ],
  },
  {
    slug: "picosecond-laser-adjunct-skincare-trial",
    kind: "procedure",
    category: "Procedures",
    region: "Asia",
    location: "Taiwan",
    headline: "A split-face trial tests skincare alongside picosecond laser treatment",
    shortHeadline: "Post-laser skincare gets a small controlled test",
    dek: "Thirty-five participants received the same laser sessions while each side of the face followed a different topical regimen. The study is useful—and commercially entangled.",
    date: "2026-07-23",
    dateLabel: "July 23, 2026",
    readTime: "8 min",
    grade: "C",
    color: "violet",
    signal: "Small, single-center split-face trial",
    whyItMatters: "Procedure outcomes depend partly on recovery and barrier support, an area often discussed with more confidence than comparative evidence supports.",
    limitations: "The sample was small, the study evaluated a branded multi-product regimen, and results cannot identify which product or ingredient drove any difference.",
    sources: [
      {
        label: "PubMed — integrated skincare after picosecond laser",
        url: "https://pubmed.ncbi.nlm.nih.gov/42493591/",
        published: "July 23, 2026",
      },
      {
        label: "FDA — aesthetic devices overview",
        url: "https://www.fda.gov/medical-devices/products-and-medical-procedures/aesthetic-cosmetic-devices",
      },
    ],
    sections: [
      {
        heading: "What was compared",
        paragraphs: [
          "Thirty-five adults with facial photoaging underwent three 755-nm picosecond alexandrite laser sessions. One cheek received a control recovery regimen; the other added a branded antioxidant, tranexamic-acid, and lipid-restoring routine.",
        ],
      },
      {
        heading: "How to read it",
        paragraphs: [
          "A split-face design reduces some person-to-person variation, but a bundle of several products makes the active contribution hard to isolate. A single-center result also needs replication across more skin tones, settings, and devices.",
          "Laser treatment is a medical decision. Product layering after a procedure should follow the treating clinician’s instructions, not a generalized routine copied from a study abstract.",
        ],
      },
    ],
  },
];

export const guides: Guide[] = [
  {
    slug: "skin-barrier-explained",
    number: "01",
    level: "Foundations",
    title: "The skin barrier, explained without the mythology",
    description: "What the stratum corneum does, what ‘repair’ can reasonably mean, and why irritation is not proof that a product is working.",
    readTime: "12 min",
    takeaways: [
      "Your barrier is living tissue plus a highly organized outer layer—not a wall you can permanently ‘seal.’",
      "A gentler routine can be an active intervention when irritation is driving symptoms.",
      "Persistent pain, cracking, infection, or widespread rash belongs with a clinician, not a longer product list.",
    ],
    sources: [
      { label: "American Academy of Dermatology — skin care basics", url: "https://www.aad.org/public/everyday-care/skin-care-basics" },
      { label: "PubMed — basic skincare in controlled dermatology trials", url: "https://pubmed.ncbi.nlm.nih.gov/42222690/" },
    ],
    sections: [
      {
        heading: "The useful model",
        paragraphs: [
          "The outermost skin layer is often compared to bricks and mortar: corneocytes sit within a lipid matrix that helps slow water loss and limit entry of irritants. The metaphor is imperfect, but it explains why both cells and lipids matter.",
          "Barrier function changes with disease, climate, cleansing, friction, procedures, and the products layered on top. ‘Damaged barrier’ is a description, not a diagnosis.",
        ],
      },
      {
        heading: "A reset that is actually measurable",
        paragraphs: [
          "For one to two weeks, remove newly introduced actives, abrasive tools, and fragranced experiments. Use a gentle cleanser only where needed, a plain moisturizer, and sunscreen you tolerate. Track burning, tightness, flaking, and new lesions once daily.",
          "Reintroduce one product at a time. If symptoms worsen or fail to settle, the next useful step may be diagnosis rather than more optimization.",
        ],
      },
    ],
  },
  {
    slug: "routine-from-zero",
    number: "05",
    level: "Routine",
    title: "Build a routine from zero—not from a shopping cart",
    description: "A three-step base, a one-change-at-a-time rule, and a decision tree for when an active earns a place.",
    readTime: "9 min",
    takeaways: [
      "Start with cleanser, moisturizer, and daytime sun protection.",
      "Choose one priority and one active; give it an appropriate trial window.",
      "Stop escalating when the problem needs diagnosis or prescription care.",
    ],
    sources: [
      { label: "American Academy of Dermatology — simple routine guidance", url: "https://www.aad.org/news/dermatologist-guide-skincare.html" },
      { label: "FDA — sunscreen consumer guidance", url: "https://www.fda.gov/drugs/understanding-over-counter-medicines/sunscreen-how-help-protect-your-skin-sun" },
    ],
    sections: [
      {
        heading: "The base routine",
        paragraphs: [
          "Cleanse gently enough to remove what needs removing. Moisturize according to dryness and tolerance. Use broad-spectrum sun protection and other protective measures during UV exposure. These are the controls that make later changes interpretable.",
        ],
      },
      {
        heading: "Add by job, not by trend",
        paragraphs: [
          "Name one outcome: fewer inflammatory breakouts, less visible uneven tone, improved dryness, or better tolerance. Pick a well-supported active that addresses that job and is appropriate for you. Change one variable so you can tell what happened.",
          "Pregnancy, prescription interactions, painful acne, scarring, changing moles, persistent rash, and significant pigment changes are examples of moments to seek individualized medical advice.",
        ],
      },
    ],
  },
  {
    slug: "retinoid-ladder",
    number: "09",
    level: "Ingredients",
    title: "The retinoid ladder: strength, evidence, and tolerance",
    description: "Retinol is not prescription tretinoin, irritation is not a potency meter, and formulation changes the experience.",
    readTime: "16 min",
    takeaways: [
      "‘Retinoid’ names a family; members differ in conversion steps, evidence, regulation, and tolerability.",
      "Start slowly and protect the rest of the routine before increasing frequency.",
      "Ask a clinician about pregnancy, severe irritation, eczema, rosacea, or prescription acne treatment.",
    ],
    sources: [
      { label: "American Academy of Dermatology — retinoid or retinol", url: "https://www.aad.org/public/everyday-care/skin-care-secrets/anti-aging/retinoid-retinol" },
      { label: "PubMed — dermatologist ingredient consensus study", url: "https://pubmed.ncbi.nlm.nih.gov/40233838/" },
    ],
    sections: [
      {
        heading: "One family, different evidence",
        paragraphs: [
          "Retinol, retinaldehyde, adapalene, tretinoin, and other retinoids are not interchangeable labels. Some are cosmetics ingredients, some are nonprescription drugs in certain markets, and some require a prescription.",
          "Concentration alone cannot rank finished products across different molecules and formulas. Stability, delivery, frequency, and your skin’s tolerance affect the real dose experienced over time.",
        ],
      },
      {
        heading: "A lower-drama introduction",
        paragraphs: [
          "Begin on a stable baseline. Use a small amount at a low frequency, avoid stacking multiple irritants, moisturize, and increase only if your skin has remained comfortable. Daily sunscreen supports the goals for which many people choose a retinoid.",
        ],
      },
    ],
  },
  {
    slug: "procedure-safety-checklist",
    number: "12",
    level: "Procedures",
    title: "Before a laser, peel, or microneedling appointment",
    description: "A provider-and-device checklist for procedures whose risk is too often flattened into before-and-after photos.",
    readTime: "11 min",
    takeaways: [
      "Match the provider’s training and the device’s authorization to the exact procedure and goal.",
      "Ask for realistic outcomes, alternatives, downtime, pigment risk, and a complication plan.",
      "RF microneedling is a medical procedure; the FDA has warned about reported serious complications.",
    ],
    sources: [
      { label: "FDA — microneedling devices", url: "https://www.fda.gov/medical-devices/aesthetic-cosmetic-devices/microneedling-devices" },
      { label: "FDA — RF microneedling safety communication", url: "https://www.fda.gov/medical-devices/safety-communications/potential-risks-certain-uses-radiofrequency-rf-microneedling-fda-safety-communication" },
      { label: "American Academy of Dermatology — questions to ask", url: "https://www.aad.org/public/cosmetic/safety/ask-questions" },
    ],
    sections: [
      {
        heading: "Interrogate the setup",
        paragraphs: [
          "Ask who will perform each step, what training they have, the exact device and settings, whether that device is legally marketed for the intended use, and how the plan changes for your skin tone, medications, scarring history, and prior procedures.",
        ],
        bullets: [
          "What outcome is realistic after one session and after a full course?",
          "What are the common, uncommon, and potentially permanent complications?",
          "Who manages a burn, infection, pigment change, or poor result—and at what cost?",
          "What must stop before treatment, and what should be avoided during recovery?",
        ],
      },
      {
        heading: "Treat combinations as separate questions",
        paragraphs: [
          "A device can be authorized for one use without being cleared to deliver a serum, drug, blood product, or cosmetic into skin. ‘We always combine them’ is not evidence that the combination has been reviewed for safety or effectiveness.",
        ],
      },
    ],
  },
];

export const cultureStories: CultureStory[] = [
  {
    slug: "kohl-ancient-egypt",
    place: "Egypt",
    era: "New Kingdom and earlier traditions",
    title: "Kohl was adornment, material technology, and protective practice",
    description: "Museum objects preserve a beauty practice that sat between appearance, environment, medicine, and ritual.",
    readTime: "8 min",
    color: "cobalt",
    note: "Historical formulations may contain lead compounds and are not modern DIY instructions.",
    sources: [
      { label: "The Metropolitan Museum of Art — New Kingdom kohl tube", url: "https://www.metmuseum.org/art/collection/search/569280" },
      { label: "Museo Egizio — kohl tube with linen stopper", url: "https://collezioni.museoegizio.it/en-GB/material/S_8615_02" },
    ],
    sections: [
      {
        heading: "A small object, a wide practice",
        paragraphs: [
          "Surviving tubes, palettes, and applicators show that eye paint was part of daily and funerary life in ancient Egypt. Museum records describe dark galena-based preparations and green malachite-based paints, mixed and applied around the eyes.",
          "The practice cannot be reduced to ‘the first eyeliner.’ It intersected with glare, insects, beliefs about disease and protection, personal presentation, craft, and access to materials.",
        ],
      },
      {
        heading: "What not to copy",
        paragraphs: [
          "Historical importance is not a modern safety assessment. Lead-containing minerals and uncertain replicas should not be placed near the eyes. The responsible way to carry this history forward is through objects, texts, and material analysis—not a kitchen reconstruction.",
        ],
      },
    ],
  },
  {
    slug: "hammam-bathing-culture",
    place: "Middle East and North Africa",
    era: "Late antiquity to living tradition",
    title: "The hammam is architecture, water ritual, and social infrastructure",
    description: "Steam and exfoliation are only the visible surface of a bathing institution shaped by religion, urban life, labor, gender, and community.",
    readTime: "10 min",
    color: "green",
    note: "Practices vary by city, period, community, and household; there is no single universal hammam sequence.",
    sources: [
      { label: "The Metropolitan Museum of Art — baths and bathing culture in the Middle East", url: "https://www.metmuseum.org/fr/essays/baths-and-bathing-culture-in-the-middle-east-the-hammam" },
      { label: "Moroccan National Tourist Office — wellness traditions", url: "https://visitmorocco.com/en/see-do/wellness" },
    ],
    sections: [
      {
        heading: "More than a treatment menu",
        paragraphs: [
          "Hammams developed from older bathing architectures while taking on roles within Islamic cities and patterns of ritual washing. They became places of cleanliness, sociability, work, ceremony, and bodily care.",
          "Modern luxury spas often extract a product sequence—steam, black soap, glove, oil—from a much larger institution. That version can be enjoyable, but it should not stand in for the social and architectural history.",
        ],
      },
      {
        heading: "A living practice under pressure",
        paragraphs: [
          "Public baths remain part of everyday life in parts of Morocco and elsewhere. Water scarcity, energy costs, tourism, and urban redevelopment now shape how these spaces operate and who can access them.",
        ],
      },
    ],
  },
  {
    slug: "japan-modern-beauty-shifts",
    place: "Japan",
    era: "Meiji period through the late 20th century",
    title: "Modern Japanese beauty changed through negotiation, not simple Westernization",
    description: "A long view of lotions, creams, makeup, media, and the persistence of locally formed aesthetics.",
    readTime: "9 min",
    color: "raspberry",
    note: "This archive follows one historical study and does not claim a single Japanese beauty ideal.",
    sources: [
      { label: "National Museum of Japanese History bulletin via CiNii Research", url: "https://cir.nii.ac.jp/crid/1390009224089825024?lang=en", published: "2016" },
    ],
    sections: [
      {
        heading: "The slow change behind a fast story",
        paragraphs: [
          "Historian Takahiro Aoki traces Japanese beauty ideals and the cosmetics market across modern and postwar periods. The account complicates the idea that Western styles simply arrived and replaced older ones.",
          "Skin creams and lotions expanded at different moments from color cosmetics. War, taxes, scarcity, advertising, television, and international campaigns each changed what was available and what felt socially acceptable.",
        ],
      },
      {
        heading: "Why this belongs in a skincare publication",
        paragraphs: [
          "Products do not spread on efficacy alone. Media systems, trade, class, gender expectations, and ideas about modernity shape which routines become normal. Reading that history makes today’s ‘global trend’ headlines less naive.",
        ],
      },
    ],
  },
  {
    slug: "ubtan-turmeric-indian-traditions",
    place: "South Asia",
    era: "Long-running household and ceremonial practices",
    title: "Ubtan sits between ceremony, household knowledge, and modern product claims",
    description: "Turmeric-containing pastes have cultural histories that cannot be converted directly into a clinical efficacy claim.",
    readTime: "8 min",
    color: "violet",
    note: "Natural ingredients can irritate or stain. A tradition is not a universal safety guarantee.",
    sources: [
      { label: "Indian National Science Academy — historical review of turmeric", url: "https://insa.nic.in/writereaddata/UpLoadedFiles/IJHS/Vol51_2016_2_2_Art03.pdf", published: "2016" },
    ],
    sections: [
      {
        heading: "A practice with many forms",
        paragraphs: [
          "Ubtan or uptan refers to paste traditions that may include turmeric, pulse or grain flours, oils, herbs, and fragrant materials. Formulas and meanings vary across regions, families, ceremonies, and everyday care.",
          "Wedding-related use is highly visible, but household cosmetic and cleansing practices have longer and broader histories than a single ceremony.",
        ],
      },
      {
        heading: "Tradition is context, not a trial result",
        paragraphs: [
          "A brand can truthfully describe historical inspiration without claiming that a packaged mask reproduces a culture or treats a skin condition. Ingredient studies, finished-formula studies, and inherited practice answer different questions.",
        ],
      },
    ],
  },
];

export const ingredients: Ingredient[] = [
  {
    slug: "retinoids",
    name: "Retinoids",
    family: "Vitamin A derivatives",
    evidence: "A",
    jobs: ["Acne", "Photoaging", "Uneven tone"],
    watchFor: "Dryness, irritation, pregnancy precautions, and molecule-specific rules.",
    summary: "A broad family with substantial evidence—but very different members, strengths, and regulatory status.",
    guideSlug: "retinoid-ladder",
  },
  {
    slug: "niacinamide",
    name: "Niacinamide",
    family: "Vitamin B3 derivative",
    evidence: "B",
    jobs: ["Barrier support", "Uneven tone", "Redness"],
    watchFor: "Higher percentages are not automatically more effective and may be less tolerable.",
    summary: "A versatile topical with useful human evidence, often strongest as part of a well-built formula rather than a percentage contest.",
  },
  {
    slug: "ceramides",
    name: "Ceramides",
    family: "Barrier lipids",
    evidence: "B",
    jobs: ["Dryness", "Barrier support", "Sensitive-skin routines"],
    watchFor: "The ratio, delivery system, and full moisturizer base matter more than the word on the label.",
    summary: "Skin-identical lipid families used in emollients; evidence belongs to specific formulations and populations.",
  },
  {
    slug: "azelaic-acid",
    name: "Azelaic acid",
    family: "Dicarboxylic acid",
    evidence: "A",
    jobs: ["Acne", "Uneven tone", "Rosacea care"],
    watchFor: "Stinging and dryness; drug/cosmetic status and strengths vary by market.",
    summary: "A well-established multitasker with prescription and nonprescription forms depending on location.",
  },
  {
    slug: "vitamin-c",
    name: "Vitamin C",
    family: "Antioxidants",
    evidence: "B",
    jobs: ["Antioxidant support", "Uneven tone", "Photoaging"],
    watchFor: "Stability, packaging, derivative, pH, and oxidation make cross-product comparisons difficult.",
    summary: "Promising and formulation-sensitive; ‘contains vitamin C’ says far less than most labels imply.",
  },
  {
    slug: "bemotrizinol",
    name: "Bemotrizinol",
    family: "Organic UV filters",
    evidence: "A",
    jobs: ["Broad-spectrum UV protection", "Formula photostability"],
    watchFor: "Availability and permitted concentration differ by market; judge the finished sunscreen.",
    summary: "A photostable UVA/UVB filter long used outside the U.S. and added to the U.S. OTC monograph in June 2026.",
  },
  {
    slug: "ectoin",
    name: "Ectoin",
    family: "Extremolytes",
    evidence: "C",
    jobs: ["Hydration", "Barrier support", "Irritation-focused formulas"],
    watchFor: "A growing ingredient story with a smaller independent clinical base than the marketing footprint suggests.",
    summary: "Biologically interesting and increasingly popular, but finished-formula claims need study-by-study scrutiny.",
  },
];

export const gradeDefinitions: Record<EvidenceGrade, { label: string; description: string }> = {
  A: {
    label: "High confidence",
    description: "Final regulatory action, systematic synthesis, or a mature body of directly relevant evidence.",
  },
  B: {
    label: "Useful human evidence",
    description: "Controlled human data or a strong review with meaningful limits on size, scope, or generalizability.",
  },
  C: {
    label: "Early signal",
    description: "Small, exploratory, preclinical, or otherwise preliminary evidence that needs replication.",
  },
  Context: {
    label: "Context, not efficacy",
    description: "Policy process, market data, historical record, or another source that should not be read as a treatment grade.",
  },
};

export function getStory(slug: string) {
  return stories.find((story) => story.slug === slug);
}

export function getGuide(slug: string) {
  return guides.find((guide) => guide.slug === slug);
}

export function getCultureStory(slug: string) {
  return cultureStories.find((story) => story.slug === slug);
}

export function getIngredient(slug: string) {
  return ingredients.find((ingredient) => ingredient.slug === slug);
}

export const searchableItems = [
  ...stories.map((item) => ({
    href: `/dispatches/${item.slug}`,
    type: item.category,
    title: item.headline,
    description: item.dek,
    terms: `${item.region} ${item.location} ${item.kind}`,
  })),
  ...guides.map((item) => ({
    href: `/guides/${item.slug}`,
    type: item.level,
    title: item.title,
    description: item.description,
    terms: item.takeaways.join(" "),
  })),
  ...cultureStories.map((item) => ({
    href: `/culture/${item.slug}`,
    type: "Culture archive",
    title: item.title,
    description: item.description,
    terms: `${item.place} ${item.era}`,
  })),
  ...ingredients.map((item) => ({
    href: `/ingredients#${item.slug}`,
    type: "Ingredient file",
    title: item.name,
    description: item.summary,
    terms: `${item.family} ${item.jobs.join(" ")}`,
  })),
];
