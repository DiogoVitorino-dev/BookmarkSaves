import { InstagramRepository } from "@repository/instagram";

export async function findMediaID(postId: string) {
  const match = window.location.href.match(
    /www.instagram.com\/stories\/[^/]+\/(\d+)/
  );
  if (match) return match[1];

  const mediaIdPattern =
    /instagram:\/\/media\?id=(\d+)|["' ]media_id["' ]:["' ](\d+)["' ]/;

  const { getCachedMediaId, cacheMediaId } = InstagramRepository();

  const mediaIdCached = await getCachedMediaId(postId);
  if (mediaIdCached) return mediaIdCached;

  const postUrl = `https://www.instagram.com/p/${postId}/`;

  const resp = await fetch(postUrl);
  const text = await resp.text();
  const idMatch = text.match(mediaIdPattern);

  if (!idMatch) return "";

  let mediaId = "";
  for (let i = 0; i < idMatch.length; ++i) {
    if (idMatch[i]) mediaId = idMatch[i];
  }

  if (!mediaId) return "";

  await cacheMediaId(postId, mediaId);

  return mediaId;
}
