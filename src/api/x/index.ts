import { MessageAPI } from "@api/message";

import { APIUtils } from "@api/utils";
import { XSearchActions } from "@content/x/search";
import { XStartSearchParams } from "@content/x/validation";

export const X_API = () => {
  const { sendRequest } = MessageAPI;
  const { lazyConnect } = APIUtils;

  const connection: Port = <Port>{};

  async function search(breakpoint: XStartSearchParams) {
    if (!(await lazyConnect("x", connection))) return null;

    const { result } = await sendRequest<string | undefined>(connection, {
      action: XSearchActions.start,
      payload: breakpoint,
    });

    return result;
  }

  return {
    search,
  };
};
