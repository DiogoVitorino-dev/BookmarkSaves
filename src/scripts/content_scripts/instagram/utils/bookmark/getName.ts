import Strings from "@constants/Strings";

export function getName() {
  let result = Strings.bookmarkDefault_.replace("_", "Instagram");
  const pattern = /\/(saved)\/([^/]+)\//;

  const nameMatch = window.location.href.match(pattern);

  if (nameMatch) {
    result = nameMatch.pop() || result;
  }

  return result;
}
