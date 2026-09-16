import type { Story } from "./types";

export const stories: Story[] = [
  {
    slug: "eu-sunscreen-in-vitro-testing-2026",
    related: { dispatches: ["australia-sunscreen-testing-consultation", "bemotrizinol-us-sunscreen-filter"], guides: ["routine-from-zero"] },
    kind: "news",
    category: "Regulation",
    region: "Europe",
    location: "European Union",
    headline: "European Commission backs SPF testing without induced sunburn",
    shortHeadline: "EU backs sunburn-free sunscreen SPF testing",
    dek: "A September 15 recommendation supports laboratory SPF testing within its validated scope. The underlying campaign does not establish that all sunscreens meet their claims.",
    date: "2026-09-15",
    dateLabel: "September 15, 2026",
    grade: "Context",
    color: "cobalt",
    signal: "Commission recommendation informed by a market-surveillance campaign",
    whyItMatters: "How SPF is measured matters for both label credibility and the volunteers involved in testing. This announcement supports a less harmful method; it does not announce a ban on human SPF testing.",
    limitations: "The sample was largely risk-targeted, not representative of all sunscreens. Correlation does not mean identical results. ISO 23675 excludes sticks and powders and does not measure water resistance.",
    sources: [
      {
        label: "European Commission DG GROW — sunscreen-testing announcement",
        url: "https://single-market-economy.ec.europa.eu/news/eu-moves-more-ethical-sunscreen-testing-2026-09-15_en",
        published: "September 15, 2026",
      },
      {
        label: "EU Publications Office — JACOP 2025 sunscreen final report (download available)",
        url: "https://op.europa.eu/en/publication-detail/-/publication/d11996e2-8c85-11f1-9262-01aa75ed71a1/language-en",
        published: "Report written June 2026; released July 30, 2026",
      },
      {
        label: "ISO 23675:2024 — public abstract and method scope",
        url: "https://www.iso.org/standard/76616.html",
        published: "December 2024",
      },
    ],
    sections: [
      {
        heading: "What changed—and when",
        paragraphs: [
          "On September 15, the European Commission encouraged manufacturers to prioritise sunscreen tests that avoid harming human volunteers. Conventional in vivo SPF testing uses UV-induced skin redness; in vitro testing measures light passing through a sunscreen film on a laboratory substrate.",
          "This is a new announcement about earlier work, not a study completed this week. JACOP 2025 testing ran from October 2025 to March 2026. The report was written in June and released on the EU publications website on July 30; ISO 23675 was published in December 2024.",
        ],
      },
      {
        heading: "What the comparison supports",
        paragraphs: [
          "Authorities in 11 EU countries collected 74 sunscreen and SPF day-cream products. The report gives a correlation of r = 0.855 between in vivo and in vitro SPF results. Two stick/lip-balm products could not undergo the in vitro test, so 74 is the campaign's product count—not the number of paired comparisons or human participants.",
          "A strong correlation means the results tended to move together, not that both methods always gave the same SPF. The report says in vitro values were generally slightly lower and that borderline or conflicting results required individual assessment. The hybrid HDRS method was not evaluated in this campaign.",
        ],
      },
      {
        heading: "Method validation is not a product clearance",
        paragraphs: [
          "Authorities assessed 33 of the 74 products (45%) as non-conforming for SPF and/or UVA performance. Sampling combined targeted, risk-based selection with non-targeted sampling; this is not a market-wide failure rate. National follow-up included withdrawals, recalls and other measures, with a May 29 reporting cut-off—not a new blanket recall on September 15.",
          "ISO's public scope covers emulsions and alcoholic single-phase formulations, excluding sticks and powders. It measures static SPF, not water resistance. UVA protection was assessed using a separate standard. The announcement cannot establish whether a particular bottle meets its label claims.",
        ],
      },
      {
        heading: "What readers should take from it",
        paragraphs: [
          "The Commission continues to recommend sunscreen alongside shade, protective clothing and avoiding peak sun exposure. A change in test-method preference is not a reason to abandon sun protection or a recommendation to buy a particular brand.",
          "CTX grades the policy and testing context, not treatment efficacy. The campaign was Commission-funded and the report was written by EY for the Commission. We reviewed the published report, not the individual laboratory files or a full conflict-of-interest audit; only ISO's public abstract was reviewed. Sources checked September 16, 2026.",
        ],
      },
    ],
  },
  {
    slug: "fda-paba-trolamine-sunscreen-final-order-2026",
    related: { dispatches: ["bemotrizinol-us-sunscreen-filter"], guides: ["routine-from-zero"] },
    kind: "news",
    category: "Regulation",
    region: "North America",
    location: "United States",
    headline: "FDA finalizes removal of two sunscreen actives—with a 2027 effective date",
    shortHeadline: "FDA sets 2027 removal of PABA and trolamine salicylate",
    dek: "A final U.S. order removes PABA and trolamine salicylate from the sunscreen monograph. FDA says consumers need not change their sunscreen use in response.",
    date: "2026-09-11",
    dateLabel: "September 11, 2026",
    grade: "A",
    color: "cobalt",
    signal: "Final FDA administrative order, not yet effective",
    whyItMatters: "This is a finalized regulatory decision, not a recall of sunscreen shelves. FDA says it knows of no U.S. sunscreen products currently sold with either active.",
    limitations: "The order covers two sunscreen actives, not all chemical filters. Its scheduled effective date is September 11, 2027, with a statutory exception if disputed.",
    sources: [
      {
        label: "FDA — Final Administrative Order OTC000008-1, order record and PDF",
        url: "https://www.accessdata.fda.gov/scripts/cder/omuf/index.cfm?event=OrderDetail&orderid=OTC000008",
        published: "September 11, 2026",
      },
      {
        label: "FDA — sunscreen regulatory-action questions and answers",
        url: "https://www.fda.gov/drugs/understanding-over-counter-medicines/questions-and-answers-fdas-regulatory-actions-over-counter-sunscreen",
        published: "September 10, 2026 announcement",
      },
      {
        label: "FDA — consumer sunscreen guidance, Removed Ingredients",
        url: "https://www.fda.gov/drugs/understanding-over-counter-medicines/sunscreen-how-help-protect-your-skin-sun",
      },
    ],
    sections: [
      {
        heading: "What the order changes",
        paragraphs: [
          "FDA concluded that the safety risks of aminobenzoic acid (PABA) and trolamine salicylate as sunscreen actives outweigh their benefits. Once the order takes effect, sunscreens containing either active will require an approved drug application rather than the monograph pathway.",
          "Section VI sets September 11, 2027 as the effective date, subject to the statutory process if the order is disputed. A final decision is not the same as an immediate market withdrawal.",
        ],
      },
      {
        heading: "What readers should take from it",
        paragraphs: [
          "FDA's consumer advice is unchanged: use sunscreen with other sun-protection measures. The agency says no consumer action is needed because it is unaware of currently marketed U.S. sunscreens containing these ingredients.",
          "The remaining parts of the 2021 proposal—including other actives, labeling and maximum SPF—are left for future orders. This decision is not a blanket verdict against other sunscreen filters or formulas.",
        ],
      },
      {
        heading: "Dates and evidence boundaries",
        paragraphs: [
          "FDA's consumer pages describe a September 10 announcement, while the formal order is marked issued September 11, 2026. This file uses the order's date; neither date should be confused with its scheduled 2027 implementation.",
          "Grade A applies to the documented regulatory action, not a ranking of products. Our sources are agency records, not a manufacturer-sponsored trial; no brand recommendation follows from this report. Sources checked September 11, 2026.",
        ],
      },
    ],
  },
  {
    slug: "canada-kohl-lead-recall-2026",
    related: { culture: ["kohl-ancient-egypt"] },
    kind: "safety",
    category: "Recall",
    region: "North America",
    location: "Canada",
    headline: "Canada recalls two kohl products over lead levels",
    shortHeadline: "Two kohl products recalled in Canada over lead levels",
    dek: "Health Canada says two named eye-cosmetic products contain lead above its impurity limits. The recall tells consumers to stop using them and return them to the importer for a refund.",
    date: "2026-09-04",
    dateLabel: "September 4, 2026",
    grade: "A",
    color: "raspberry",
    signal: "Official consumer-product recall",
    whyItMatters: "Kohl is applied close to the eye, and repeated lead exposure can build up in the body. The notice gives Canadian shoppers two exact product names and a concrete action.",
    limitations: "The notice does not report the measured lead concentrations or identify lot codes. It applies to two named products sold through one importer in Canada—not to every kohl or kajal product.",
    sources: [
      {
        label: "Health Canada — traditional kohl products recalled due to chemical hazard",
        url: "https://recalls-rappels.canada.ca/en/alert-recall/traditional-kohl-products-recalled-due-chemical-hazard",
        published: "September 4, 2026",
      },
    ],
    sections: [
      {
        heading: "Check the product name",
        paragraphs: [
          "The recall names Mumtaz Herbal Kajal With Almond Oil for Sensitive Eyes and Al-Asmad Alharmain Zam Zam & Rose Water. Health Canada says both contain lead above the impurity limits in its cosmetics guidance.",
          "The importer reported that 576 units of each product were sold in Canada from January through August 2026. The products originated in India and the United Arab Emirates and were imported by Sara Islamic Store in Mississauga, Ontario.",
        ],
      },
      {
        heading: "What to do now",
        paragraphs: [
          "Health Canada tells consumers to stop using either recalled product immediately and return it to Sara Islamic Store for a refund. The official recall linked below has the importer's current contact information.",
          "As of August 28, the company had reported no incidents or injuries in Canada. That does not measure exposure or prove that use was harmless; it only describes reports received by that date.",
        ],
      },
      {
        heading: "Keep the safety finding in scope",
        paragraphs: [
          "Lead can accumulate in the body, and Health Canada emphasizes that children are especially vulnerable. The notice does not publish the laboratory value, so readers cannot calculate an individual's exposure from the recall alone.",
          "Kohl also has deep cultural and material histories across North Africa, the Middle East, and South Asia. A product-specific safety action should not be turned into a claim about every modern formula or about the communities connected to the practice.",
        ],
      },
    ],
  },
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
    headline: "Simple micellar water recall covers three U.K. bottle sizes",
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
    slug: "us-skin-lightening-mercury-warning-2026",
    related: { dispatches: ["us-cosmetics-mocra-listing-2026", "bemotrizinol-us-sunscreen-filter"] },
    kind: "safety",
    category: "Consumer warning",
    region: "North America",
    location: "United States",
    headline: "FDA testing found high mercury levels in a skin-lightening product",
    shortHeadline: "FDA warns about mercury in La Crema De Rebeca",
    dek: "FDA laboratory testing found high mercury levels in La Crema De Rebeca. The agency says repeated skin exposure can cause serious, potentially permanent kidney and neurologic harm.",
    date: "2026-05-14",
    dateLabel: "May 14, 2026",
    grade: "A",
    color: "raspberry",
    signal: "FDA laboratory finding and warning letter",
    whyItMatters: "Mercury was not disclosed on the product label, so a shopper could not identify this risk from the ingredient list.",
    limitations: "The warning letter names one product and company. It does not establish that every skin-lightening product contains mercury, and it is not a recall notice.",
    sources: [
      {
        label: "U.S. Food and Drug Administration — La Crema De Rebeca warning letter",
        url: "https://www.fda.gov/inspections-compliance-enforcement-and-criminal-investigations/warning-letters/la-crema-de-rebeca-728782-05142026",
        published: "May 14, 2026",
      },
      {
        label: "FDA consumer warning — skin products containing mercury and/or hydroquinone",
        url: "https://www.fda.gov/consumers/health-fraud-scams/fda-warns-consumers-skin-products-containing-mercury-andor-hydroquinone",
      },
    ],
    sections: [
      {
        heading: "What to do now",
        paragraphs: [
          "Do not use La Crema De Rebeca. FDA also advises consumers not to use over-the-counter skin-lightening products and to talk with a clinician about treatment options for dark spots or other pigment concerns.",
          "If you have used the named product, bring the product name and a photo of its label to a clinician. The FDA consumer page linked below explains the health concerns and lists products the agency has tested.",
        ],
      },
      {
        heading: "What FDA found",
        paragraphs: [
          "FDA said laboratory analysis confirmed high mercury levels in La Crema De Rebeca, a product marketed online for skin treatment and skin lightening. The agency said mercury was not disclosed on the label and described the product as misbranded and an unapproved new drug.",
          "Repeated skin application can allow mercury to enter the bloodstream. FDA lists kidney damage, neurologic damage, and direct skin injury among the possible harms, with heightened risk for children and pregnant individuals.",
        ],
      },
      {
        heading: "Keep the scope precise",
        paragraphs: [
          "This is strong evidence about the named product because it rests on FDA laboratory analysis. It is not evidence that every product marketed for hyperpigmentation or every product from a particular community or country contains mercury.",
        ],
      },
    ],
  },
  {
    slug: "us-cosmetics-mocra-listing-2026",
    related: { dispatches: ["us-skin-lightening-mercury-warning-2026", "bemotrizinol-us-sunscreen-filter"] },
    kind: "news",
    category: "U.S. regulation",
    region: "North America",
    location: "United States",
    headline: "U.S. cosmetic listings pass 1.29 million under MoCRA",
    shortHeadline: "What 1.29 million U.S. cosmetic listings do—and do not—mean",
    dek: "FDA reported 16,398 active facility registrations and 1,298,361 active cosmetic product listings as of June 30, 2026. Listing is a traceability requirement, not FDA approval.",
    date: "2026-06-30",
    dateLabel: "June 30, 2026",
    grade: "Context",
    color: "cobalt",
    signal: "FDA registration and product-listing data",
    whyItMatters: "The system gives FDA more information about who makes cosmetics and which products are marketed in the United States.",
    limitations: "The totals are administrative data, not safety scores. FDA explicitly says registration and listing are neither cosmetic approval nor a promotional certificate.",
    sources: [
      {
        label: "U.S. Food and Drug Administration — cosmetic facility registration and product listing",
        url: "https://www.fda.gov/cosmetics/registration-listing-cosmetic-product-facilities-and-products",
        published: "Data as of June 30, 2026",
      },
      {
        label: "FDA — Modernization of Cosmetics Regulation Act of 2022",
        url: "https://www.fda.gov/cosmetics/cosmetics-laws-regulations/modernization-cosmetics-regulation-act-2022-mocra",
      },
    ],
    sections: [
      {
        heading: "The number in plain English",
        paragraphs: [
          "Under the Modernization of Cosmetics Regulation Act, covered manufacturers and processors register facilities with FDA, while the responsible person named on a cosmetic label lists each marketed product and its ingredients. Facility registrations are renewed every two years; product listings are updated annually.",
          "FDA's June 30 snapshot counted 16,398 unique active facility registrations and 1,298,361 unique active cosmetic product listings. Certain small businesses and products covered by drug or device requirements may be exempt.",
        ],
      },
      {
        heading: "What changed for accountability",
        paragraphs: [
          "MoCRA also requires responsible persons to report serious adverse events to FDA within 15 business days and to maintain records supporting adequate safety substantiation. It gives FDA new records-access and mandatory-recall authorities under defined conditions.",
          "The law does not require one specific safety test for every cosmetic product or ingredient. Companies remain responsible for ensuring safety, and FDA can act against adulterated or misbranded products.",
        ],
      },
      {
        heading: "What the label cannot claim",
        paragraphs: [
          "A facility number or product listing does not mean FDA tested, approved, or endorses a cosmetic. FDA says it does not issue certificates for cosmetic registrations or listings, so a seller should not use listing as an approval badge.",
        ],
      },
    ],
  },
  {
    slug: "us-rf-microneedling-safety-communication",
    related: { guides: ["procedure-safety-checklist"], dispatches: ["picosecond-laser-adjunct-skincare-trial"] },
    kind: "safety",
    category: "Procedure safety",
    region: "North America",
    location: "United States",
    headline: "FDA is evaluating serious complications reported after RF microneedling",
    shortHeadline: "What the FDA RF microneedling warning means for patients",
    dek: "FDA says it received reports of burns, scarring, fat loss, disfigurement, and nerve damage with certain uses of radiofrequency microneedling devices.",
    date: "2025-10-15",
    dateLabel: "October 15, 2025",
    grade: "A",
    color: "violet",
    signal: "FDA medical-device safety communication",
    whyItMatters: "The communication turns a trend-driven treatment decision into a concrete discussion about the provider, exact device, risks, and complication plan.",
    limitations: "Adverse-event reports do not show how often complications occur or establish that every device or use has the same risk. FDA says its evaluation is ongoing.",
    sources: [
      {
        label: "U.S. Food and Drug Administration — RF microneedling safety communication",
        url: "https://www.fda.gov/medical-devices/safety-communications/potential-risks-certain-uses-radiofrequency-rf-microneedling-fda-safety-communication",
        published: "October 15, 2025",
      },
      {
        label: "FDA — Microneedling Devices",
        url: "https://www.fda.gov/medical-devices/aesthetic-cosmetic-devices/microneedling-devices",
      },
    ],
    sections: [
      {
        heading: "Before you book",
        paragraphs: [
          "Treat radiofrequency microneedling as a medical procedure. FDA recommends choosing a licensed healthcare provider who is trained and experienced with the procedure and asking which exact device will be used.",
          "Ask what complications are possible for your skin and treatment area, what recovery should look like, and who will treat a problem. FDA says RF microneedling devices should not be used at home.",
        ],
      },
      {
        heading: "What FDA reported",
        paragraphs: [
          "The safety communication names burns, scarring, fat loss, disfigurement, and nerve damage among serious complications reported with certain uses. Some reports described the need for medical or surgical treatment.",
          "FDA says it is working with manufacturers and healthcare providers and will update the public if significant new information becomes available. Problems can be reported through MedWatch.",
        ],
      },
      {
        heading: "What clearance does not mean",
        paragraphs: [
          "FDA has authorized specific microneedling devices for specific indications. That does not authorize every treatment claim, every body area, or combining a device with unreviewed topical products, platelet-rich plasma, or other substances.",
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
    headline: "Australia's sunscreen reviews address two different questions",
    shortHeadline: "Australia's SPF-testing review and 4-MBC proposal are separate",
    dek: "The broader SPF-testing consultation closed May 23. A separate consultation on the ingredient 4-MBC opened September 11 and closes October 12. Proposals are not final rules.",
    date: "2026-03-26",
    dateLabel: "March 26, 2026",
    grade: "Context",
    color: "green",
    signal: "Two distinct regulatory consultations",
    whyItMatters: "Australia has an unusually high skin-cancer burden, so confidence in sunscreen testing and labeling has direct public-health stakes.",
    limitations: "These consultations do not establish final new rules. The 4-MBC review uses exposure modelling and published toxicology; full underlying raw data were not available for independent corroboration. It does not measure the rate of harm in sunscreen users.",
    updates: [{
      kind: "update",
      date: "2026-09-15",
      dateLabel: "September 15, 2026",
      note: "Clarified the distinction between the earlier SPF-testing consultation and the separate 4-MBC consultation announced September 11. Added its October 12 closing date, proposal origins and review limitations. The original March 26 article date is unchanged; September 15 is our editorial update, not a new regulatory action.",
    }],
    sources: [
      {
        label: "Australian Therapeutic Goods Administration",
        url: "https://www.tga.gov.au/news/media-releases/improving-regulation-sunscreens-australia",
        published: "March 26, 2026",
      },
      {
        label: "TGA — broader sunscreen-regulation consultation",
        url: "https://consultations.tga.gov.au/tga/improvements-to-regulation-of-sunscreens-in-aus/",
        published: "March 26–May 23, 2026 consultation period",
      },
      {
        label: "TGA — 4-MBC consultation, options and deadline",
        url: "https://consultations.tga.gov.au/tga/scheduling-pre-meeting-notice-4mbc-nov-2026/",
        published: "September 11–October 12, 2026 consultation period",
      },
      {
        label: "TGA — 4-MBC announcement and consumer advice",
        url: "https://www.tga.gov.au/news/media-releases/tga-consult-additional-controls-active-sunscreen-ingredient",
        published: "September 11, 2026",
      },
      {
        label: "TGA — 4-MBC safety review and limitations",
        url: "https://www.tga.gov.au/resources/publication/corporate-reports/safety-review-4-methylbenzylidene-camphor-4-mbc",
        published: "Published September 11, 2026; report version July 2026",
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
          "The broader consultation page checked September 15 lists the consultation as closed on May 23; no final response was found on that page. That is a page-specific observation, not proof that every Australian sunscreen policy remains unchanged.",
        ],
      },
      {
        heading: "A separate ingredient-safety consultation",
        paragraphs: [
          "On September 11, the TGA opened a separate consultation on 4-methylbenzylidene camphor (4-MBC). It closes October 12, 2026, ahead of advisory-committee consideration in November. October 12 is the closing date, not an opening or implementation date.",
          "The TGA Delegate put forward two options using concentration limits and, for one option, age and application-site conditions. Two private applicants proposed a prohibition. These are competing proposals, not adopted restrictions; the applicants' proposal should not be described as a TGA ban.",
          "The TGA's September 11 announcement advises Australians to continue sunscreen use alongside other sun-protection measures. It does not announce a product recall. This ingredient-specific process is separate from the earlier review of SPF testing and broader regulation.",
        ],
      },
      {
        heading: "What the safety review can establish",
        paragraphs: [
          "The July-version report, published September 11, combines existing safety assessments and toxicology with the Australian Sunscreen Exposure Model. Its recommendations depend on assumed exposure and available evidence, not a newly measured rate of disease among sunscreen users. It lacked full raw data for independent corroboration and excluded other consumer-product exposure, metabolites and impurities from its risk assessment.",
          "CTX grades the policy process, not sunscreen efficacy or a product's safety. Our sources are regulator records, not a sponsored product trial; private applicants' proposals are identified as such. Sources for this clarification checked September 15, 2026. The September 11 development is not being presented as a new September 15 action.",
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
