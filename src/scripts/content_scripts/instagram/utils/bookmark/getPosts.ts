import { InstagramPost } from "@content/instagram/typing";

export function getPosts(): InstagramPost[] {
  let posts = document.getElementsByClassName("x9i3mqj");

  if (posts.length === 0) {
    posts = document.getElementsByClassName("xo2y696");
  }

  return Array.from(posts) as InstagramPost[];
}
