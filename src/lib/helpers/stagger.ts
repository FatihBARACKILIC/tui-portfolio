export type RailTone = "accent" | "line";

export type Staggered<T> = T & {
  delayMs: number;
  tone: RailTone;
};

const isCurrentItem = (item: unknown): boolean => {
  if (typeof item !== "object" || item === null || !("current" in item)) {
    return false;
  }

  return Reflect.get(item, "current") === true;
};

export const withStagger = <T>(
  items: readonly T[],
  baseMs: number,
  stepMs = 70
): Staggered<T>[] =>
  items.map((item, index) => ({
    ...item,
    delayMs: baseMs + index * stepMs,
    tone: isCurrentItem(item) ? "accent" : "line",
  }));
