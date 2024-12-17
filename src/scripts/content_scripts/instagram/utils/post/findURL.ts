import { InstagramPost } from "../../typing";

export  function findURL(post: InstagramPost) {
  const pathname = window.location.pathname;

  // Opened
  if (
    pathname.startsWith("/reels/") ||
    pathname.startsWith("/stories/") ||
    pathname.startsWith("/reel/") ||
    pathname.startsWith("/p/")
  ) {
    return window.location.href;
  }

  // Through posts
  const postIdPattern = /\/(p|reel)\/([^/]+)\//;

  const aNodes = post.querySelectorAll("a");
  for (let i = 0; i < aNodes.length; ++i) {
    const partialHref = aNodes[i].getAttribute("href");

    if (partialHref) {
      const match = partialHref.match(postIdPattern);
      if (match) return window.location.origin + partialHref;
    }
  }

  return "";
}
