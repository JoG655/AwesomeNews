const WORDS_PER_MINUTE = 225;

export function readingTime(text: string) {
  const words = text.trim().split(/\s+/).length;

  return Math.ceil(words / WORDS_PER_MINUTE);
}
