import { XPost } from "@content/x/typing";
import { getImage } from "../media/image";
import { getVideo } from "../media/video";
import { CollectionRepository } from "@repository/collection";
import { HelperApiContexts } from "@api/helper/typing";

export async function fetchMedia(
  element: XPost,
  source: string,
  helper: HelperApiContexts["video"]
): Promise<Collection | null> {
  const { get, save } = CollectionRepository();

  let result: Collection | null = await get(source)

  if (result) {
    return result;
  } else {
    result = {
      source,
      medias: [],
    };
  }
  let media: Media<BlobFile> | null = null;

  const items = element.querySelectorAll('div[data-testid="tweetPhoto"]');

  for await (const div of items) {
    // image
    media = await getImage(div);
    if (media) result.medias = [...result.medias, media];
  }

  // video
  result.medias = [
    ...result.medias,
    ...(await getVideo(element, source, helper)),
  ];
  
  if (!result.medias.length) return null;

  await save(result);
  return result;
}
