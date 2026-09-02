import type { AdvertisedPrice, CostBand } from "./types";

/**
 * Advertised price ranges by procedure slug, compiled from the menus in
 * content/price-survey.ts on the survey date. Each entry states the range as
 * advertised, what it is per (session, unit, syringe, vial, applicator,
 * area), and which menus carried it. A profile with no entry keeps its
 * "No reliable estimate" cost band.
 *
 * Rules: quote what the menus print, round nothing, and say when a range
 * spans different units or areas. Package prices per session are usually
 * lower than the single-session figures quoted here.
 */
export const procedurePrices: Record<string, AdvertisedPrice & { band: CostBand }> = {
  "classic-facial": {
    range: "$80–$250 per facial",
    basis: "Signature and custom facials across five menus; 30–80 minutes, add-ons extra.",
    menus: ["evolve", "signature", "esana", "stpete", "rose"],
    band: "Under $250",
  },
  hydradermabrasion: {
    range: "$175–$400 per session",
    basis: "Generic diamond-tip and hydradermabrasion treatments including DiamondGlow and 'hydraneedling'; the HydraFacial brand is priced separately.",
    menus: ["evolve", "ljc", "stpete", "rose"],
    band: "$250–$750",
  },
  hydrafacial: {
    range: "$199–$349 per session",
    basis: "Signature, Deluxe, and Platinum tiers across five menus; boosters and series discounts change the total.",
    menus: ["evolve", "ljc", "stpete", "signature", "esana"],
    band: "$250–$750",
  },
  extractions: {
    range: "$20 add-on to $115 per extraction facial",
    basis: "Extraction as a facial add-on or a 30–45 minute extraction facial.",
    menus: ["rose", "esana"],
    band: "Under $250",
  },
  "led-light-therapy": {
    range: "$30 add-on to $200+ per session",
    basis: "In-office LED as a 20-minute add-on or a stand-alone facial; home devices are a separate purchase.",
    menus: ["rose", "esana", "ljc"],
    band: "Under $250",
  },
  "oxygen-facial": {
    range: "$215 per facial (one menu)",
    basis: "One published spa price; other menus in the survey did not list an oxygen facial.",
    menus: ["fountain"],
    band: "Under $250",
  },
  diamondglow: {
    range: "$175–$375 per session",
    basis: "Single sessions across four menus; peel enhancements and packages change the total.",
    menus: ["evolve", "ljc", "stpete", "rose"],
    band: "$250–$750",
  },
  microdermabrasion: {
    range: "$130–$250 per session",
    basis: "Face or face-and-neck sessions; packages of five are priced lower per visit.",
    menus: ["signature", "esana"],
    band: "Under $250",
  },
  dermaplaning: {
    range: "$60–$120 per session",
    basis: "Stand-alone dermaplaning; as an add-on it is $40–$75.",
    menus: ["evolve", "signature", "esana", "stpete", "rose"],
    band: "Under $250",
  },
  "superficial-chemical-peel": {
    range: "$75–$275 per peel",
    basis: "Light and branded superficial peels (PCA, Illuminize, Rejuvenize, Skin Better, moderate peels) across five menus.",
    menus: ["evolve", "signature", "esana", "stpete", "rose"],
    band: "Under $250",
  },
  "medium-chemical-peel": {
    range: "$250–$895+ per peel",
    basis: "Branded medium-depth peels (Perfect Derma, Melanage, Cosmelan, advanced peels); physician-applied TCA peels are often quoted per consultation.",
    menus: ["ljc", "signature", "stpete", "rose"],
    band: "$250–$750",
  },
  "vi-peel": {
    range: "$275–$475 per peel",
    basis: "VI Peel and VI Peel Precision Plus single sessions; series of three priced lower per peel.",
    menus: ["stpete", "esana"],
    band: "$250–$750",
  },
  neuromodulators: {
    range: "$10–$16 per unit",
    basis: "Botox, Dysport, Xeomin, Daxxify, and Letybo per unit across five menus; one menu prices by area ($240–$940). ASPS's 2022 fee table put the average treatment at $528.",
    menus: ["evolve", "ljc", "stpete", "signature", "rose", "esana"],
    band: "$250–$750",
  },
  "hyaluronic-acid-fillers": {
    range: "$400–$1,050 per syringe",
    basis: "HA fillers across six menus; lip and cheek products sit at different points in the range. ASPS's 2022 fee table put the average HA treatment at $794.",
    menus: ["evolve", "ljc", "stpete", "signature", "esana", "rose"],
    band: "$250–$750",
  },
  "biostimulator-fillers": {
    range: "$600–$995 per syringe or vial",
    basis: "Radiesse per syringe and Sculptra per vial across six menus; a Sculptra plan usually needs several vials. ASPS's 2022 fee table put the average non-HA treatment at $1,039.",
    menus: ["evolve", "ljc", "stpete", "signature", "esana", "rose"],
    band: "$750–$2,000",
  },
  "skin-boosters": {
    range: "$300–$500 per syringe (HA skin-quality product)",
    basis: "Skinvive as listed on two menus; polynucleotide and exosome products were sold as add-ons ($250–$300) rather than priced as stand-alone injections.",
    menus: ["signature", "stpete", "rose"],
    band: "$250–$750",
  },
  microneedling: {
    range: "$149–$600 per session",
    basis: "Face sessions across six menus; neck and chest add $200–$300, and PRP add-ons are priced separately.",
    menus: ["evolve", "ljc", "stpete", "signature", "esana", "rose"],
    band: "$250–$750",
  },
  "rf-microneedling": {
    range: "$553–$2,500 per session",
    basis: "Morpheus8 and Sylfirm X face or face-and-neck sessions across six menus; body areas run $2,400–$3,700 per area.",
    menus: ["evolve", "ljc", "stpete", "esana", "rose", "signature"],
    band: "$750–$2,000",
  },
  "ipl-photofacial": {
    range: "$175–$750 per session",
    basis: "IPL, Lumecca, and BBL photofacials for face or face-and-neck across six menus; series of three priced lower per visit.",
    menus: ["evolve", "ljc", "stpete", "signature", "esana", "rose"],
    band: "$250–$750",
  },
  "vascular-pigment-lasers": {
    range: "$150–$900 per session",
    basis: "Vbeam, spider-vein laser, vascular IPL, and lesion-specific BBL treatments; price tracks the size of the area.",
    menus: ["ljc", "signature", "rose", "stpete"],
    band: "$250–$750",
  },
  "nonablative-fractional-laser": {
    range: "$320–$1,600+ per session",
    basis: "Clear + Brilliant, Moxi, LaseMD, and Fraxel Dual across six menus; Fraxel sits at the top of the range.",
    menus: ["evolve", "ljc", "stpete", "signature", "rose", "esana"],
    band: "$250–$750",
  },
  "hybrid-fractional-laser": {
    range: "$500–$3,800 per session",
    basis: "Halo face through face-neck-chest treatments on two menus; the low end is a light setting on a single area.",
    menus: ["ljc", "stpete"],
    band: "$750–$2,000",
  },
  "ablative-laser-resurfacing": {
    range: "$900–$5,000 per treatment",
    basis: "Fractional and deep CO2 or erbium resurfacing on three menus; the top of the range includes sedation and three areas.",
    menus: ["rose", "ljc", "stpete"],
    band: "Over $2,000",
  },
  "laser-hair-removal": {
    range: "$30–$1,000 per session by area",
    basis: "From an extra-small area to full body across six menus; packages of five or six and 'unlimited year' plans are priced lower per visit. ASPS's 2022 fee table put the combination-laser average at $582.",
    menus: ["evolve", "ljc", "stpete", "signature", "esana", "rose"],
    band: "$250–$750",
  },
  "photodynamic-therapy": {
    range: "$650 per treatment (one practice)",
    basis: "One dermatology practice's published cosmetic PDT price, with 4–6 treatments advised; medical PDT for precancers is billed through insurance.",
    menus: ["ringpfeil"],
    band: "$250–$750",
  },
  "ultrasound-tightening": {
    range: "$500–$6,500 per treatment",
    basis: "Ultherapy by area (brow, neck, décolletage) up to full face and neck across three menus. ASPS's 2022 fee table put nonsurgical skin tightening at $1,832.",
    menus: ["ljc", "signature", "esana"],
    band: "$750–$2,000",
  },
  "rf-tightening": {
    range: "$250 per session to $4,500 per six-session series",
    basis: "Evolve X and Forma radiofrequency sessions and series on two menus; single-session monopolar treatments were not listed.",
    menus: ["stpete", "esana"],
    band: "$750–$2,000",
  },
  "subdermal-rf-tightening": {
    range: "$1,500–$3,500 per area",
    basis: "FaceTite and AccuTite by area (nasolabial folds, jowls, neck, lids) on one menu; full face and neck plans combine areas.",
    menus: ["rose"],
    band: "Over $2,000",
  },
  "thread-lift": {
    range: "$310–$5,920 per treatment",
    basis: "From smooth-thread sessions to full PDO and Silhouette InstaLift plans across three menus; two menus price per thread ($500–$600).",
    menus: ["ljc", "signature", "stpete"],
    band: "$750–$2,000",
  },
  "deoxycholic-acid": {
    range: "$496–$690 per vial",
    basis: "Kybella per vial across five menus; two to four vials per session and several sessions are typical.",
    menus: ["evolve", "ljc", "stpete", "signature", "esana"],
    band: "$250–$750",
  },
  "laser-tattoo-removal": {
    range: "$200–$500 per session",
    basis: "A national chain's published per-session range; complete-removal packages are sold as monthly plans by tattoo size.",
    menus: ["removery"],
    band: "$250–$750",
  },
  electrolysis: {
    range: "$50–$200 per session by time",
    basis: "15- to 60-minute sessions on two menus; the Chicago menu prices by electrologist.",
    menus: ["electrolysis-norwalk", "electrolysis-chicago"],
    band: "Under $250",
  },
  sclerotherapy: {
    range: "$225–$900 per session",
    basis: "Spider-vein sessions on two menus, one priced per 15 minutes ($400). ASPS's 2022 fee table put the average at $428.",
    menus: ["ljc", "rose"],
    band: "$250–$750",
  },
  cryolipolysis: {
    range: "$750–$1,000 per applicator",
    basis: "CoolSculpting per applicator across four menus; multi-applicator plans run $1,400–$6,999. ASPS's 2022 fee table put noninvasive fat reduction at $1,226.",
    menus: ["evolve", "ljc", "signature", "esana"],
    band: "$750–$2,000",
  },
  "electromagnetic-muscle-stimulation": {
    range: "$350–$800 per session",
    basis: "CoolTone and Emsculpt NEO single sessions on two menus; four-session series priced lower per visit.",
    menus: ["signature", "evolve"],
    band: "$250–$750",
  },
  "plla-buttock-augmentation": {
    range: "$2,750–$9,500 per session by syringe count",
    basis: "One menu's Radiesse buttock plans from 10 to 50 syringes; Sculptra per vial ($749–$995) applies when that product is used.",
    menus: ["evolve", "stpete", "esana"],
    band: "Over $2,000",
  },
  "prp-hair-loss": {
    range: "$600–$745 per session",
    basis: "PRP or PRF scalp sessions across three menus; initial series of three to six priced $1,800–$3,240.",
    menus: ["evolve", "stpete", "rose"],
    band: "$250–$750",
  },
  "hair-transplant": {
    range: "$4–$10 per graft (industry range)",
    basis: "Published U.S. industry per-graft ranges for FUE; a 2,000-graft session therefore spans roughly $8,000–$20,000 before add-ons. Clinics quote after consultation.",
    menus: ["bosley-guide"],
    band: "Over $2,000",
  },
  "hydrafacial-keravive": {
    range: "$490 per session (one menu)",
    basis: "One menu's Keravive price; the take-home spray is included by the protocol.",
    menus: ["stpete"],
    band: "$250–$750",
  },
  "energy-based-vaginal-devices": {
    range: "$750–$1,100 per session; $2,000–$4,350 per series",
    basis: "Forma V and ThermiVa sessions and three-session series across three menus.",
    menus: ["ljc", "esana", "rose"],
    band: "$750–$2,000",
  },
  "prp-adjunct": {
    range: "$100–$350 as an add-on to microneedling",
    basis: "PRP added to a microneedling session across four menus; stand-alone PRP facials were $350–$650.",
    menus: ["signature", "esana", "stpete", "rose"],
    band: "$250–$750",
  },
  blepharoplasty: {
    range: "$4,250 upper blepharoplasty (one menu)",
    basis: "One plastic surgery practice's listed upper-lid price including its state sales tax; ASPS's average surgeon fee excludes anesthesia and facility.",
    menus: ["esana"],
    band: "Over $2,000",
  },
};
