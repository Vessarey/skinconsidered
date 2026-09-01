import type { Guide } from "./types";

export const guides: Guide[] = [
  {
    slug: "skin-barrier-explained",
    related: { dispatches: ["basic-skincare-vehicle-arms-review", "ceramide-np-c15-sensitive-skin-trial"], ingredients: ["ceramides", "niacinamide"], guides: ["routine-from-zero"] },
    number: "01",
    level: "Foundations",
    title: "The skin barrier, explained without the mythology",
    description: "What the stratum corneum does, what ‘repair’ can reasonably mean, and why irritation is not proof that a product is working.",
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
    related: { dispatches: ["basic-skincare-vehicle-arms-review", "bemotrizinol-us-sunscreen-filter"], guides: ["skin-barrier-explained", "retinoid-ladder"] },
    number: "05",
    level: "Routine",
    title: "Build a routine from zero—not from a shopping cart",
    description: "A three-step base, a one-change-at-a-time rule, and a decision tree for when an active earns a place.",
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
    related: { ingredients: ["retinoids"], guides: ["routine-from-zero"] },
    number: "09",
    level: "Ingredients",
    title: "The retinoid ladder: strength, evidence, and tolerance",
    description: "Retinol is not prescription tretinoin, irritation is not a potency meter, and formulation changes the experience.",
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
    related: { dispatches: ["picosecond-laser-adjunct-skincare-trial"], guides: ["skin-barrier-explained"] },
    number: "12",
    level: "Procedures",
    title: "Before a laser, peel, or microneedling appointment",
    description: "A provider-and-device checklist for procedures whose risk is too often flattened into before-and-after photos.",
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
