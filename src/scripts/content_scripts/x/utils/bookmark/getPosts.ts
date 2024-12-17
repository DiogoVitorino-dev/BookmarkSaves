import { XPost } from "@content/x/typing";

export function getPosts(): XPost[] {
  return Array.from(
    document.querySelectorAll('article[data-testid="tweet"]')
  ) as XPost[];
}
