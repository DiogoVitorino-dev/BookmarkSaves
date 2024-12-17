import { InstagramPost } from "@content/instagram/typing";

export function findPostID(post: InstagramPost) {
  const pathname = window.location.pathname;

  // Opened
  if (pathname.startsWith("/reels/")) {
    return pathname.split("/")[2];
  } else if (pathname.startsWith("/stories/")) {
    return pathname.split("/")[3];
  } else if (pathname.startsWith("/reel/")) {
    return pathname.split("/")[2];
  } else if (pathname.startsWith("/p/")) {
    return pathname.split("/")[2];
  }

  // Through posts
  const postIdPattern = /\/(p|reel)\/([^/]+)\//;

  const aNodes = post.querySelectorAll("a");
  for (let i = 0; i < aNodes.length; ++i) {
    const link = aNodes[i].getAttribute("href");

    if (link) {
      const match = link.match(postIdPattern);
      if (match) return match.pop() || "";
    }
  }

  return "";
}
