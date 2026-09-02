import type { ConcernGuide } from "./types";

/**
 * The by-concern guide: for each common concern, which topicals the evidence
 * supports first, what helps alongside, and what to skip. Every ingredient
 * slug points at a topical file, so the reasoning and the sources live there.
 * "See a clinician" names the moment a routine stops being enough.
 */
export const concernGuides: ConcernGuide[] = [
  {
    slug: "acne",
    name: "Acne (inflamed and comedonal)",
    summary: "A retinoid plus benzoyl peroxide is the guideline core. Everything else is an add-on or a prescription step-up.",
    firstLine: [
      { ingredient: "adapalene", why: "OTC 0.1% gel is a true retinoid: unclogs pores and prevents new lesions." },
      { ingredient: "benzoyl-peroxide", why: "Kills acne bacteria without resistance; 2.5–5% is enough." },
    ],
    alsoUseful: [
      { ingredient: "azelaic-acid", why: "Gentler anti-inflammatory that also fades marks; pregnancy-compatible." },
      { ingredient: "salicylic-acid", why: "Helps blackheads and oil; modest on inflamed lesions." },
      { ingredient: "niacinamide", why: "Supports the barrier while stronger actives work." },
      { ingredient: "tretinoin", why: "Prescription step-up when adapalene is not enough." },
      { ingredient: "clascoterone", why: "Prescription androgen blocker for hormonal-pattern acne." },
    ],
    skip: ["Topical clindamycin on its own (resistance)", "Scrubs and daily acid stacking", "Toothpaste, lemon, and other DIY spot treatments"],
    seeClinician: "Nodules, cysts, scarring, acne that has not improved after 12 weeks of a retinoid plus benzoyl peroxide, or acne with sudden hormonal symptoms.",
    related: { procedures: ["superficial-chemical-peel", "photodynamic-therapy", "extractions"], guides: ["retinoid-ladder"] },
  },
  {
    slug: "dark-spots-melasma",
    name: "Dark spots and melasma",
    summary: "Sunscreen is the treatment; everything else is maintenance without it. Layer one or two pigment actives, not five.",
    firstLine: [
      { ingredient: "sunscreen", why: "Tinted, iron-oxide sunscreen blocks the visible light that drives melasma." },
      { ingredient: "azelaic-acid", why: "Prescription 15–20% has trial data comparable to hydroquinone with less risk." },
      { ingredient: "tretinoin", why: "Speeds turnover and is part of the approved triple-combination cream." },
    ],
    alsoUseful: [
      { ingredient: "tranexamic-acid", why: "Gentle topical option; the oral form is stronger but needs a prescriber." },
      { ingredient: "vitamin-c", why: "Modest brightening and antioxidant support under sunscreen." },
      { ingredient: "niacinamide", why: "Reduces pigment transfer; easy to tolerate." },
      { ingredient: "hydroquinone", why: "The strongest option, prescription-only, used in supervised cycles." },
    ],
    skip: ["Imported 'whitening' creams (mercury and undisclosed hydroquinone)", "IPL for melasma (can worsen it)", "Continuous hydroquinone without breaks"],
    seeClinician: "A spot that is new, changing, irregular, or bleeding needs an exam before any brightener; melasma that fails 3–4 months of topical care may warrant oral or procedural options.",
    related: { procedures: ["superficial-chemical-peel", "vascular-pigment-lasers"], dispatches: ["us-skin-lightening-mercury-warning-2026"] },
  },
  {
    slug: "wrinkles-photoaging",
    name: "Fine lines, wrinkles, and sun damage",
    summary: "Two ingredients have randomized evidence for visible aging: daily sunscreen and a retinoid. The rest is supporting cast.",
    firstLine: [
      { ingredient: "sunscreen", why: "Randomized trial evidence for preventing visible aging." },
      { ingredient: "tretinoin", why: "Reference retinoid with vehicle-controlled photoaging trials." },
      { ingredient: "tazarotene", why: "The only other retinoid with an FDA photodamage indication; more irritating." },
    ],
    alsoUseful: [
      { ingredient: "retinol-retinal", why: "OTC option for people who cannot get or tolerate a prescription." },
      { ingredient: "vitamin-c", why: "Antioxidant support and mild brightening." },
      { ingredient: "alpha-hydroxy-acids", why: "Texture and dullness a few nights a week." },
      { ingredient: "peptides", why: "Low risk, thin evidence; fine if you like the product." },
    ],
    skip: ["Collagen creams (collagen does not penetrate)", "'Topical Botox' peptides", "Growth-factor and exosome serums at a premium"],
    seeClinician: "Static wrinkles and laxity that bother you after 6–12 months of consistent retinoid and sunscreen use; the procedures desk compares the next steps.",
    related: { procedures: ["neuromodulators", "nonablative-fractional-laser", "medium-chemical-peel"], trends: ["collagen-supplements", "bakuchiol-natural-retinol"] },
  },
  {
    slug: "redness-rosacea",
    name: "Redness and rosacea",
    summary: "Bumps respond to prescriptions; background redness and vessels respond to lasers. Gentle everything else.",
    firstLine: [
      { ingredient: "azelaic-acid", why: "FDA-approved 15% for rosacea bumps; also calms tone." },
      { ingredient: "ivermectin-cream", why: "Once-daily prescription that ranks at the top for inflammatory lesions." },
      { ingredient: "metronidazole", why: "Long-standing, inexpensive prescription for bumps and pustules." },
    ],
    alsoUseful: [
      { ingredient: "sunscreen", why: "Mineral, fragrance-free sunscreen reduces flare triggers." },
      { ingredient: "niacinamide", why: "Barrier support with mild redness reduction." },
      { ingredient: "ceramides", why: "A bland ceramide moisturizer is the routine's foundation." },
    ],
    skip: ["Physical scrubs and high-strength acids", "Alcohol-heavy toners and fragrance", "Retinoids started at full strength"],
    seeClinician: "Eye symptoms (gritty, red, swollen lids), thickening skin on the nose, or redness that does not respond to a prescription; visible vessels need a laser evaluation rather than more cream.",
    related: { procedures: ["vascular-pigment-lasers", "ipl-photofacial"] },
  },
  {
    slug: "dryness-barrier",
    name: "Dryness, sensitivity, and a damaged barrier",
    summary: "Stop the damage, then moisturize with intent: humectant on damp skin, lipids, and an occlusive at night.",
    firstLine: [
      { ingredient: "ceramides", why: "Replaces the lipids a damaged barrier lacks." },
      { ingredient: "petrolatum", why: "The most effective occlusive; slugging is this used properly." },
    ],
    alsoUseful: [
      { ingredient: "hyaluronic-acid", why: "Humectant on damp skin, sealed with a moisturizer." },
      { ingredient: "urea", why: "Low strengths hydrate; high strengths rescue rough, cracked skin." },
      { ingredient: "niacinamide", why: "Improves barrier function at 2–5%." },
      { ingredient: "ectoin", why: "Soothing, well tolerated, early evidence." },
    ],
    skip: ["Daily exfoliating acids while the barrier is compromised", "Fragrance and essential oils", "Hot water and foaming sulfate cleansers"],
    seeClinician: "Persistent eczema, cracking that bleeds, infection signs, or dryness that does not improve after 2–4 weeks of a simplified routine; prescription options such as ruxolitinib cream exist.",
    related: { guides: ["skin-barrier-explained"], trends: ["slugging", "skin-cycling"], ingredients: ["ruxolitinib-cream"] },
  },
  {
    slug: "oily-pores",
    name: "Oily skin and enlarged pores",
    summary: "Pores do not open or close, but they look smaller when they are clear and the skin around them is smooth.",
    firstLine: [
      { ingredient: "salicylic-acid", why: "Oil-soluble exfoliant that clears pore contents." },
      { ingredient: "adapalene", why: "Retinoids normalize pore lining and reduce congestion over months." },
    ],
    alsoUseful: [
      { ingredient: "niacinamide", why: "Some reduction in sebum and pore appearance." },
      { ingredient: "azelaic-acid", why: "Helps congestion and tone together." },
      { ingredient: "sunscreen", why: "Gel or fluid textures that will actually be worn daily." },
    ],
    skip: ["Pore strips and aggressive extraction at home", "Over-cleansing, which increases oil rebound", "Alcohol-based mattifiers used all day"],
    seeClinician: "Sudden oiliness with new hair growth or irregular periods, or congestion that keeps forming cysts.",
    related: { procedures: ["superficial-chemical-peel", "hydrafacial", "extractions"] },
  },
  {
    slug: "hair-loss",
    name: "Thinning hair and pattern hair loss",
    summary: "Diagnosis first: pattern loss has proven treatments, and other types need different care.",
    firstLine: [{ ingredient: "minoxidil-topical", why: "The only OTC drug with decades of trial evidence for pattern hair loss." }],
    alsoUseful: [
      { ingredient: "ceramides", why: "A gentle, fragrance-free routine keeps an irritated scalp from compounding the problem." },
      { ingredient: "sunscreen", why: "Protects a thinning part line and scalp from burns and photoaging." },
    ],
    skip: ["Rosemary oil or caffeine as a replacement for treatment", "Scalp 'detox' facials sold as hair-growth therapy", "Unapproved oral 'hair peptides'"],
    seeClinician: "Any new hair loss deserves a diagnosis; patchy loss, scarring, itching, or shedding after illness or medication change have different treatments. Oral finasteride or minoxidil and PRP are prescriber decisions.",
    related: { procedures: ["prp-hair-loss", "hair-transplant", "hydrafacial-keravive"] },
  },
  {
    slug: "body-texture-kp",
    name: "Rough body skin and keratosis pilaris",
    summary: "Chemical exfoliation plus moisture beats scrubbing. Consistency matters more than strength.",
    firstLine: [
      { ingredient: "urea", why: "10–20% smooths rough, bumpy skin with trial evidence for xerosis." },
      { ingredient: "alpha-hydroxy-acids", why: "Lactic acid lotions soften keratin plugs." },
    ],
    alsoUseful: [
      { ingredient: "salicylic-acid", why: "Helps the plugs in keratosis pilaris." },
      { ingredient: "petrolatum", why: "Occlusion over a humectant for very dry areas." },
      { ingredient: "retinol-retinal", why: "Body retinol can help stubborn bumps over months." },
    ],
    skip: ["Harsh loofahs and scrubs that inflame follicles", "Very hot showers", "Fragranced body lotions on inflamed skin"],
    seeClinician: "Bumps that are red, painful, pus-filled, or spreading; keratosis pilaris that does not improve in 2–3 months may respond to prescription keratolytics or laser.",
    related: { procedures: ["laser-hair-removal"] },
  },
  {
    slug: "sun-protection",
    name: "Sun protection, every day",
    summary: "The one product with randomized evidence for both skin cancer and visible aging. Texture you will wear beats a higher number you will not.",
    firstLine: [{ ingredient: "sunscreen", why: "Broad-spectrum SPF 30 or higher, a quarter teaspoon for the face, reapplied outdoors." }],
    alsoUseful: [
      { ingredient: "vitamin-c", why: "Morning antioxidant that adds protection under sunscreen." },
      { ingredient: "bemotrizinol", why: "A newly permitted U.S. filter that will improve broad-spectrum formulas." },
    ],
    skip: ["Sunscreen contouring", "Tanning nasal sprays", "SPF in makeup as the only protection"],
    seeClinician: "A yearly skin check if you have a history of sunburns, many moles, or skin cancer in the family; any spot that changes, bleeds, or does not heal.",
    related: { trends: ["sunscreen-contouring", "korean-sunscreen-imports", "nasal-tanning-spray"] },
  },
];
