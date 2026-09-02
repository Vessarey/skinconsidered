import type { PriceMenu, Source } from "./types";

/**
 * Advertised-price survey.
 *
 * ASPS publishes national average physician fees for only a handful of
 * procedure categories, and the consumer price sites that aggregate patient
 * reports block scripted access, so their figures cannot be verified here.
 * This registry lists the public clinic price menus the desk read on the
 * retrieval date. Procedure files quote the range across these menus, with
 * the clinic count, so a reader can see exactly where a number came from.
 *
 * This is a convenience sample of published U.S. menus, not a national
 * survey. Package pricing is usually lower per session; consultation,
 * numbing, product, and follow-up may be extra; prices change without
 * notice. Add a menu here before citing it in content/procedure-prices.ts.
 */

export const PRICE_SURVEY_DATE = "2026-09-01";

export const priceMenus: PriceMenu[] = [
  {
    id: "evolve",
    name: "Evolve Med Spa price menu",
    location: "New Jersey, New York, Maryland, and Pennsylvania locations",
    url: "https://evolvemedspa.com/pricing-menu/",
    retrieved: PRICE_SURVEY_DATE,
  },
  {
    id: "ljc",
    name: "La Jolla Cosmetic Medical Spa procedure prices",
    location: "San Diego area, California",
    url: "https://www.ljcmedspa.com/pricing-promotions/medical-spa-procedure-prices/",
    retrieved: PRICE_SURVEY_DATE,
    note: "Page states prices as of October 2, 2024; ranges reflect areas and packages.",
  },
  {
    id: "stpete",
    name: "St Pete Wellness Med Spa price menu",
    location: "St. Petersburg, Florida",
    url: "https://stpetewellnessmedspa.com/medspa-price-menu/",
    retrieved: PRICE_SURVEY_DATE,
  },
  {
    id: "signature",
    name: "Signature Medical Spa price list",
    location: "Charlottesville, Virginia",
    url: "https://www.signaturemedspa.com/price-list/",
    retrieved: PRICE_SURVEY_DATE,
  },
  {
    id: "esana",
    name: "ESANA Plastic Surgery Center & MedSpa price list",
    location: "New Haven and Guilford, Connecticut",
    url: "https://esanamedspa.com/price-list/",
    retrieved: PRICE_SURVEY_DATE,
    note: "Page states prices effective August 1, 2022, including Connecticut sales tax.",
  },
  {
    id: "rose",
    name: "The Rose Clinic spa pricing",
    location: "Orem, Utah",
    url: "https://www.theroseclinic.com/rose-spa/pricing/",
    retrieved: PRICE_SURVEY_DATE,
  },
  {
    id: "ringpfeil",
    name: "Ringpfeil Advanced Dermatology — photodynamic therapy",
    location: "Philadelphia, Pennsylvania",
    url: "https://www.ringpfeildermatology.com/cosmetic-dermatology/acne-treatment/photodynamic-acne.php",
    retrieved: PRICE_SURVEY_DATE,
  },
  {
    id: "removery",
    name: "Removery tattoo removal cost guide",
    location: "National chain",
    url: "https://removery.com/laser-tattoo-removal-cost-guide/",
    retrieved: PRICE_SURVEY_DATE,
    note: "Publishes a per-session range and monthly package pricing rather than a fixed menu.",
  },
  {
    id: "electrolysis-norwalk",
    name: "Electrolysis Hair Removal Lab rates",
    location: "Norwalk, California",
    url: "https://electrolysishairlab.com/products/book-rates",
    retrieved: PRICE_SURVEY_DATE,
  },
  {
    id: "electrolysis-chicago",
    name: "Electrolysis 100% Permanent prices",
    location: "Chicago, Illinois",
    url: "https://electrolysis100permanent.com/prices/",
    retrieved: PRICE_SURVEY_DATE,
  },
  {
    id: "bosley-guide",
    name: "Bosley hair transplant cost guide (industry ranges)",
    location: "National chain guide, not its own menu",
    url: "https://www.bosley.com/blog/hair-transplant-cost-guide-2026/",
    retrieved: PRICE_SURVEY_DATE,
    note: "Publishes U.S. industry per-graft ranges rather than the chain's own prices.",
  },
  {
    id: "fountain",
    name: "The Fountain Spa — Oxygen RX facial",
    location: "Ramsey and Hackensack, New Jersey",
    url: "https://www.thefountainspa.com/product/oxygen-rx-facial/",
    retrieved: PRICE_SURVEY_DATE,
  },
];

/** ASPS's last published fee table for minimally invasive procedures (2022 statistics). */
export const aspsFees2022: Source = {
  label: "American Society of Plastic Surgeons — 2022 average surgeon/physician fees (PDF)",
  url: "https://www.plasticsurgery.org/documents/news/Statistics/2022/cosmetic-procedures-average-cost-2022.pdf",
  published: "2022 statistics",
};

export function priceMenuSource(id: string): Source | undefined {
  const menu = priceMenus.find((item) => item.id === id);
  if (!menu) return undefined;
  return { label: `${menu.name} (${menu.location})`, url: menu.url, published: `Retrieved ${menu.retrieved}` };
}
