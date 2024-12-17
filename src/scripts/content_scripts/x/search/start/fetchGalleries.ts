import { Gallery } from "@content/typing";
import { createGallery } from "./gallery";
import { XPost } from "@content/x/typing";

export async function fetchGalleries(posts: Map<string, XPost>) {
  /*const helper = await HelperAPI("video");

  helper.setCookies({
    url: Configuration.supportedOrigins.x,
    options: {
      secure: true,
    },
  });*/

  const newGalleries = await Promise.all(
    Array.from(posts).map(([, element]) => createGallery(element))
  );

  const gallery: Gallery[] = newGalleries.filter((item) => item !== null);

  //helper.disconnect();

  return gallery;
}
