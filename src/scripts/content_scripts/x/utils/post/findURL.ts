import { XPost } from "@content/x/typing";

export function findURL(post: XPost) {
  let url = "";
  const anchor = post
    .querySelectorAll<HTMLAnchorElement>('a[dir="ltr"]')
    .item(0);

  url = anchor.href || "";

  return url;
}
