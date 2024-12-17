import { XSearchActions } from "..";

export function cancel() {
  window.__content.searching.delete(XSearchActions.start);
}
