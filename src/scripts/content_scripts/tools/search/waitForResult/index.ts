import { TimeUtils } from "@utils/time";

export const waitForResult = async () => {
  await TimeUtils.retry(() => !window.__content__.searching, -1, 300);
  return true;
};
