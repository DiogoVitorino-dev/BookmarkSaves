import { InstagramRepository } from "@repository/instagram";
import { InstagramApiResponse } from "./response";

export async function fetchApiData(
  mediaId: string,
  appId: string
): Promise<InstagramApiResponse.root | null> {
  const { getCachedResponse, cacheResponse } = InstagramRepository();

  const mediaInfoCached = await getCachedResponse(mediaId);
  if (mediaInfoCached) return mediaInfoCached;

  const url = `https://i.instagram.com/api/v1/media/${mediaId}/info/`;
  const resp = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "**",
      "X-IG-App-ID": appId,
    },
    credentials: "include",
    mode: "cors",
  });

  if (resp.status !== 200) {
    console.log(`Fetch info API failed with status code: ${resp.status}`);
    return null;
  }
  const respJson: InstagramApiResponse.root = await resp.json();

  await cacheResponse(mediaId, respJson);

  return respJson;
}
