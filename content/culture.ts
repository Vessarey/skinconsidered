import type { CultureStory } from "./types";

export const cultureStories: CultureStory[] = [
  {
    slug: "kohl-ancient-egypt",
    related: { culture: ["ubtan-turmeric-indian-traditions"] },
    place: "Egypt",
    era: "New Kingdom and earlier traditions",
    title: "Kohl was adornment, material technology, and protective practice",
    description: "Museum objects preserve a beauty practice that sat between appearance, environment, medicine, and ritual.",
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
    related: { culture: ["japan-modern-beauty-shifts"] },
    place: "Middle East and North Africa",
    era: "Late antiquity to living tradition",
    title: "The hammam is architecture, water ritual, and social infrastructure",
    description: "Steam and exfoliation are only the visible surface of a bathing institution shaped by religion, urban life, labor, gender, and community.",
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
    related: { culture: ["hammam-bathing-culture"] },
    place: "Japan",
    era: "Meiji period through the late 20th century",
    title: "Modern Japanese beauty changed through negotiation, not simple Westernization",
    description: "A long view of lotions, creams, makeup, media, and the persistence of locally formed aesthetics.",
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
    related: { culture: ["kohl-ancient-egypt"] },
    place: "South Asia",
    era: "Long-running household and ceremonial practices",
    title: "Ubtan sits between ceremony, household knowledge, and modern product claims",
    description: "Turmeric-containing pastes have cultural histories that cannot be converted directly into a clinical efficacy claim.",
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
