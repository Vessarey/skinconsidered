import type { Story } from "./types";

export const stories: Story[] = [
  {
    slug: "uk-simple-micellar-water-recall",
    related: { dispatches: ["uk-cosmetics-safety-notifications-2026", "brazil-anvisa-sunscreen-recall-henlau"] },
    updates: [
      {
        kind: "update",
        date: "2026-08-25",
        dateLabel: "August 25, 2026",
        note: "The regulator expanded the recall from the 730 ml bottle to listed batches of the 200 ml and 400 ml sizes. The headline, dek, and batch guidance were updated to match the official notice.",
      },
    ],
    kind: "safety",
    category: "Recall",
    region: "Europe",
    location: "United Kingdom",
    headline: "A U.K. micellar-water recall now covers three bottle sizes",
    shortHeadline: "Simple micellar-water recall expands to 200, 400, and 730 ml",
    dek: "The affected batches may be microbiologically contaminated and could cause eye inflammation. The official notice lists the exact bottle sizes and batch codes to check.",
    date: "2026-08-14",
    dateLabel: "August 14, 2026",
    grade: "A",
    color: "raspberry",
    signal: "Official product recall",
    whyItMatters: "This is specific, actionable information: people with a listed batch are told to stop using it and follow the recall instructions.",
    limitations: "The recall applies only to the sizes and batch codes in the official notice—not every Simple product or every bottle of micellar water.",
    sources: [
      {
        label: "U.K. Office for Product Safety and Standards — recall notice and batch list",
        url: "https://www.gov.uk/product-safety-alerts-reports-recalls/product-recall-simple-730ml-kind-to-skin-micellar-cleansing-water-2608-0103",
        published: "Published August 14; expanded August 25, 2026",
      },
    ],
    sections: [
      {
        heading: "Check the bottle, not just the brand",
        paragraphs: [
          "The U.K. Office for Product Safety and Standards says specific batches of Simple Kind to Skin Micellar Cleansing Water in 200 ml, 400 ml, and 730 ml bottles may be microbiologically contaminated. The hazard named in the notice is possible eye inflammation.",
          "The recall began with the 730 ml size and was expanded on August 25 to include listed batches of the 200 ml and 400 ml bottles. The regulator's annex contains the batch codes that determine whether a bottle is affected.",
        ],
      },
      {
        heading: "What to do",
        paragraphs: [
          "If your size and batch code appear in the official notice, stop using the product immediately. Use the linked recall notice or contact the place of purchase for return, disposal, and refund instructions.",
          "If your bottle is not one of the listed batches, this notice does not say it is recalled. That distinction is why Skin Considered links the regulator's live record rather than reproducing a cropped list on social media.",
        ],
      },
    ],
  },
  {
    slug: "bemotrizinol-us-sunscreen-filter",
    related: { ingredients: ["bemotrizinol"], dispatches: ["australia-sunscreen-testing-consultation"], guides: ["routine-from-zero"] },
    kind: "news",
    category: "Regulation",
    region: "North America",
    location: "United States",
    headline: "Bemotrizinol is now permitted in U.S. over-the-counter sunscreens",
    shortHeadline: "The U.S. added its first new sunscreen active in decades",
    dek: "The FDA issued a final order allowing bemotrizinol at concentrations up to 6%. Product launches still depend on manufacturers and compliant finished formulas.",
    date: "2026-06-09",
    dateLabel: "June 9, 2026",
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
    related: { dispatches: ["eu-cosmetics-bmcha-safety-alerts", "brazil-anvisa-sunscreen-recall-henlau"] },
    kind: "safety",
    category: "Safety",
    region: "Europe",
    location: "United Kingdom",
    headline: "The U.K. publishes a clearer view of its cosmetics notification system",
    shortHeadline: "U.K. cosmetics notifications pass 861,000",
    dek: "The Office for Product Safety and Standards says 861,686 notifications had entered its system by May 28, 2026—and points to prior action on prohibited ingredients.",
    date: "2026-07-17",
    dateLabel: "July 17, 2026",
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
    related: { dispatches: ["bemotrizinol-us-sunscreen-filter", "brazil-anvisa-sunscreen-recall-henlau"], ingredients: ["bemotrizinol"] },
    kind: "news",
    category: "Sunscreen",
    region: "Oceania",
    location: "Australia",
    headline: "Australia's sunscreen-testing review is awaiting a published decision",
    shortHeadline: "Australia's SPF-testing consultation has closed; a decision is pending",
    dek: "The TGA consultation closed May 23 after examining laboratory oversight, testing transparency, ingredient standards, lifecycle checks, and clearer SPF labels. No decision is posted on the consultation page as of September 1.",
    date: "2026-03-26",
    dateLabel: "March 26, 2026",
    grade: "Context",
    color: "green",
    signal: "Public consultation",
    whyItMatters: "Australia has an unusually high skin-cancer burden, so confidence in sunscreen testing and labeling has direct public-health stakes.",
    limitations: "The consultation is closed, but its proposals are not final rules. The TGA says its decision will be published on the consultation page.",
    sources: [
      {
        label: "Australian Therapeutic Goods Administration",
        url: "https://www.tga.gov.au/news/media-releases/improving-regulation-sunscreens-australia",
        published: "March 26, 2026",
      },
    ],
    sections: [
      {
        heading: "What was put forward",
        paragraphs: [
          "The Therapeutic Goods Administration ran a consultation from March 26 to May 23 on possible improvements to sunscreen regulation. Its options included stronger oversight of testing laboratories, more reliable and transparent SPF testing, timelier adoption of new test methods, periodic quality checks, ingredient standards, and simpler labeling.",
        ],
      },
      {
        heading: "Why the process matters",
        paragraphs: [
          "A sunscreen label compresses a large amount of formulation and testing work into a few claims. Regulation determines which test methods count, how evidence is documented, and what happens when products or laboratories fall short.",
          "As of September 1, the consultation page still says submissions will be reviewed and a decision published there. Until that response appears, the correct status is decision pending—not framework changed.",
        ],
      },
    ],
  },
  {
    slug: "eu-cosmetics-bmcha-safety-alerts",
    related: { dispatches: ["uk-cosmetics-safety-notifications-2026", "brazil-anvisa-sunscreen-recall-henlau"] },
    kind: "safety",
    category: "Ingredient safety",
    region: "Europe",
    location: "European Union",
    headline: "A banned fragrance ingredient dominated E.U. cosmetics safety alerts",
    shortHeadline: "BMCHA drove most E.U. cosmetics alerts in 2025",
    dek: "A European Commission report said almost eight in ten cosmetics alerts concerned BMCHA, a banned synthetic fragrance associated with reproductive and skin-irritation risks.",
    date: "2026-03-05",
    dateLabel: "March 5, 2026",
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
    related: { dispatches: ["eu-cosmetics-bmcha-safety-alerts", "australia-sunscreen-testing-consultation"], guides: ["routine-from-zero"] },
    kind: "safety",
    category: "Recall",
    region: "Latin America",
    location: "Brazil",
    headline: "Brazil orders a recall of sunscreens and repellents from one manufacturer",
    shortHeadline: "Anvisa bans products made by Henlau Química",
    dek: "Brazil’s health regulator prohibited manufacture, sale, advertising, and use of listed products and ordered a recall of cosmetics made by Henlau Química.",
    date: "2026-04-29",
    dateLabel: "April 29, 2026",
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
    related: { guides: ["skin-barrier-explained", "routine-from-zero"], dispatches: ["ceramide-np-c15-sensitive-skin-trial"] },
    kind: "research",
    category: "Research",
    region: "Global",
    location: "United Kingdom / international trials",
    headline: "The overlooked evidence for simple cleansing, moisturizing, and sun protection",
    shortHeadline: "Basic routines did meaningful work in dermatology trials",
    dek: "A 2026 narrative review examined the nonmedicated ‘vehicle’ groups in controlled dermatology trials and found meaningful improvement across several conditions.",
    date: "2026-04-02",
    dateLabel: "April 2, 2026",
    grade: "B",
    color: "green",
    signal: "Narrative review of controlled trials",
    whyItMatters: "It supports a lower-cost, lower-complexity starting point: consistent basic care can contribute substantially even when it is not the active treatment under study.",
    limitations: "This was a narrative review, not a pooled meta-analysis or proof that basics replace treatment. One author disclosed honoraria, sponsorship, and speaker fees from several skincare and pharmaceutical companies.",
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
    related: { ingredients: ["ceramides"], guides: ["skin-barrier-explained"], dispatches: ["basic-skincare-vehicle-arms-review"] },
    kind: "research",
    category: "Barrier science",
    region: "Europe",
    location: "Germany",
    headline: "A small controlled trial finds a ceramide signal in impaired skin barriers",
    shortHeadline: "Ceramide NP C15 shows a barrier signal—with caveats",
    dek: "In a 50-person split-body trial, both the test emollient and vehicle improved symptoms; the ceramide formula was associated with lower water loss in participants with impaired barriers.",
    date: "2026-02-27",
    dateLabel: "February 27, 2026",
    grade: "B",
    color: "cobalt",
    signal: "Double-blind, vehicle-controlled human study",
    whyItMatters: "The vehicle response keeps the interpretation honest: formulation base and regular emollient use may matter alongside a highlighted ingredient.",
    limitations: "The study was small and single-center; three coauthors list Evonik Operations affiliations, and the exploratory microbiome findings do not yet have established clinical importance.",
    sources: [
      {
        label: "PubMed — Ceramide NP C15 emollient trial",
        url: "https://pubmed.ncbi.nlm.nih.gov/41758783/",
        published: "February 27, 2026",
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
    related: { guides: ["procedure-safety-checklist"] },
    kind: "procedure",
    category: "Procedures",
    region: "Asia",
    location: "Taiwan",
    headline: "A split-face trial tests skincare alongside picosecond laser treatment",
    shortHeadline: "Post-laser skincare gets a small controlled test",
    dek: "Thirty-five participants received the same laser sessions while each side of the face followed a different topical regimen. The paper reports useful measurements alongside commercial affiliations that readers should see.",
    date: "2026-07-23",
    dateLabel: "July 23, 2026",
    grade: "C",
    color: "violet",
    signal: "Small, single-center split-face trial",
    whyItMatters: "Procedure outcomes depend partly on recovery and barrier support, an area often discussed with more confidence than comparative evidence supports.",
    limitations: "The study was small and tested a branded product bundle, so it cannot isolate one ingredient. Two authors list L'Oréal Taiwan affiliations, while the paper declares no related conflict of interest.",
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
