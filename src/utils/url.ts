export const URLMatches = {
  instagram: /https:\/\/www\.instagram\.com\/[a-zA-Z0-9._]+\/saved\//,
  x: /https:\/\/x.com\/i\/bookmarks/,
};

type UrlMatches = keyof typeof URLMatches;

const match = (url: string): UrlMatches | null => {
  if (url.match(URLMatches.instagram)) return "instagram";
  if (url.match(URLMatches.x)) return "x";
  return null;
};

export const UrlUtils = {
  match,
};
