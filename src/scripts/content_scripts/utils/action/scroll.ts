import { TimeUtils } from "@utils/time";

export interface ScrollProps {
  wait?: number;
  deltaY?: number;
}

export async function scroll({ deltaY, wait }: ScrollProps) {
  window.scrollTo(0, window.scrollY + (deltaY || 100));

  return TimeUtils.sleep(wait || 2000).then(
    () => window.innerHeight + window.scrollY >= document.body.scrollHeight
  );
}
