type SearchEntry = { title: string; description: string; terms: string; type: string };

function normalize(value: string) {
  return value.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/moisturis/g, "moisturiz").replace(/[^a-z0-9]+/g, " ").trim();
}

function variants(word: string) {
  if (/^retinoids?$/.test(word)) return ["retinoid", "retinol", "retinal", "tretinoin", "adapalene", "tazarotene"];
  return word.length > 4 && word.endsWith("s") ? [word, word.slice(0, -1)] : [word];
}

/** Title matches lead; descriptions and aliases keep the rest of the archive discoverable. */
export function searchArchive<T extends SearchEntry>(items: T[], query: string): T[] {
  const phrase = normalize(query);
  if (!phrase) return items;
  const words = phrase.split(/\s+/).map(variants);
  return items.map((item, index) => {
    const title = normalize(item.title);
    const description = normalize(item.description);
    const haystack = title + " " + description + " " + normalize(item.terms + " " + item.type);
    if (!words.every((options) => options.some((word) => haystack.includes(word)))) return { item, index, score: -1 };
    const score = (title === phrase ? 100 : title.includes(phrase) ? 60 : 0)
      + words.filter((options) => options.some((word) => title.includes(word))).length * 10
      + words.filter((options) => options.some((word) => description.includes(word))).length;
    return { item, index, score };
  }).filter((result) => result.score >= 0).sort((a, b) => b.score - a.score || a.index - b.index).map((result) => result.item);
}
