import { tickerItems } from "@/lib/content";
import { TickerMarquee } from "./TickerMarquee";

export function NewsTicker() {
  return <TickerMarquee items={tickerItems} />;
}
