import { MessageAPI } from "@api/message";
import { SearchableAPI } from "@api/typing";
import { APIUtils } from "@api/utils";

import { InstagramSearchActions } from "@content/instagram/search";
import { InstagramStartSearchParams } from "@content/instagram/validation";
import { Bookmark } from "@content/typing";

export const InstagramAPI = (): SearchableAPI => {
  const { sendRequest } = MessageAPI;
  const { lazyConnect } = APIUtils;

  const connection: Port = <Port>{};

  async function search(breakpoint: InstagramStartSearchParams) {
    if (!(await lazyConnect("instagram", connection))) return null;

    const { result } = await sendRequest<string | undefined, Bookmark | null>(
      connection,
      {
        action: InstagramSearchActions.start,
        payload: breakpoint,
      }
    );

    return result;
  }

  async function cancel() {
    if (!(await lazyConnect("instagram", connection))) return null;

    await sendRequest(connection, {
      action: InstagramSearchActions.cancel,
    });
    MessageAPI.disconnect(connection);
  }

  async function isSearchRunning() {
    if (!(await lazyConnect("instagram", connection))) return false;

    return (
      await sendRequest<_, boolean>(connection, {
        action: InstagramSearchActions.isRunning,
      })
    ).result;
  }

  async function waitForSearchResult() {
    if (!(await lazyConnect("instagram", connection))) return null;

    return (
      await sendRequest<_, Bookmark | null>(connection, {
        action: InstagramSearchActions.waitForResult,
      })
    ).result;
  }

  return {
    search,
    cancel,
    isSearchRunning,
    waitForSearchResult,
  };
};
