import { MessageAPI } from "@api/message";
import { CookiesGetterActions } from "@background/cookies/get";
import { CookiesGetAllParams } from "@background/cookies/validation";

export const CookiesAPI = () => {
  const { connect, sendRequest } = MessageAPI;

  const connection = connect({ to: "background", name: "cookies" });

  async function getAll(params: CookiesGetAllParams) {
    const { result } = await sendRequest<CookiesGetAllParams, Cookies>(
      connection,
      {
        action: CookiesGetterActions.getAll,
        payload: params,
      }
    );

    return result;
  }

  function disconnect() {
    MessageAPI.disconnect(connection);
  }

  return {
    getAll,
    disconnect,
  };
};
