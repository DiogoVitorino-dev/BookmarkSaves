import { InstagramService } from "@content/instagram/service";
import { Gallery } from "@content/typing";
import { InstagramSearchActions } from "..";
import { InstagramPost } from "@content/instagram/typing";

export async function fetchGalleries(posts: Map<string, InstagramPost>) {
  let result: Gallery | null = null;
  let gallery: Gallery[] = [];

  

  for await (const post of posts.values()) {
    
    if (!window.__content.searching.has(InstagramSearchActions.start))
      throw new Error("Search canceled");

    result = await InstagramService.fetchPost(post);

    if (result) {
      gallery = [...gallery, result];
    }
  }

  return gallery;
}
