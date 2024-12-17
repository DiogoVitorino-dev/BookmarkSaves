export const URLMatches = {
  instagram: /https:\/\/www\.instagram\.com\/[a-zA-Z0-9._]+\/saved\//,
  x: /https:\/\/x.com\/i\/bookmarks/,
};

const match = (url: string, domain: keyof typeof URLMatches) =>
  url.match(URLMatches[domain]);

export const UrlUtils = {
  match,
};
