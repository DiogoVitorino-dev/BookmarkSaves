import { InstagramSearchActions } from "..";

export function cancel() {
  window.__content.searching.delete(InstagramSearchActions.start);
}
