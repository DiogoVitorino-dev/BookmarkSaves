import { InstagramUtils } from "../utils";
import { fetchApiData } from "./request";
import { createGallery } from "./gallery";
import { Gallery } from "@content/typing";
import { InstagramPost } from "../typing";

async function fetchPost(post: InstagramPost): Promise<Gallery | null> {
  try {
    const source = InstagramUtils.post.findURL(post);
    if (!source) {
      console.log("failed to find PostUrl");
      return null;
    }

    const { findAppID, findMediaID, findPostID } = InstagramUtils.identity;

    const appId = findAppID();
    if (!appId) {
      console.log("failed to find AppId");
      return null;
    }

    const postId = findPostID(post);
    if (!postId) {
      console.log("failed to find PostId");
      return null;
    }

    const mediaId = await findMediaID(postId);
    if (!mediaId) {
      console.log("failed to find MediaId");
      return null;
    }

    const data = await fetchApiData(mediaId, appId);

    if (!data || !data?.items || data.items.length <= 0) return null;

    return (await createGallery({ ...data.items[0], source })) || null;
  } catch (e) {
    if (e instanceof Error) {
      console.log(`Error in getMediaFromAPI(): ${e}\n${e.stack}`);
    }
  }

  return null;
}

export const InstagramService = {
  fetchPost,
};
