import { MessageAPI } from "@api/message";
import { SearchableAPI } from "@api/typing";
import { APIUtils } from "@api/utils";
import { Bookmark } from "@content/typing";
import { XSearchActions } from "@content/x/search";
import { XStartSearchParams } from "@content/x/validation";

export const X_API = (): SearchableAPI => {
  const { sendRequest } = MessageAPI;
  const { lazyConnect } = APIUtils;

  const connection: Port = <Port>{};

  async function search(breakpoint: XStartSearchParams) {
    if (!(await lazyConnect("x", connection))) return null;

    const { result } = await sendRequest<string | undefined, Bookmark | null>(
      connection,
      {
        action: XSearchActions.start,
        payload: breakpoint,
      }
    );

    return result;
  }

  async function cancel() {
    if (!(await lazyConnect("x", connection))) return null;

    await sendRequest(connection, {
      action: XSearchActions.cancel,
    });
    MessageAPI.disconnect(connection);
  }

  async function isSearchRunning() {
    if (!(await lazyConnect("x", connection))) return false;

    return (
      await sendRequest<_, boolean>(connection, {
        action: XSearchActions.isRunning,
      })
    ).result;
  }

  async function waitForSearchResult() {
    if (!(await lazyConnect("x", connection))) return null;

    return (
      await sendRequest<_, Bookmark | null>(connection, {
        action: XSearchActions.waitForResult,
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
