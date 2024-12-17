import Configuration from "@constants/Configuration";
import { VideoHelperAPI } from "./video";

export type HelperApiProtocols =
  keyof typeof Configuration.NativeMessage.helper.protocols;

type HelperApiFeatures<T extends object> = T & {
  disconnect: () => void;
};

export type HelperApiContexts = {
  video: HelperApiFeatures<ReturnType<typeof VideoHelperAPI>>;
};
