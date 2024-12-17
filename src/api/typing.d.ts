export interface SearchableAPI {
  search: (breakpoint: string) => Promise<Bookmark | null>;
  cancel: () => Promise<null | undefined>;
  isSearchRunning: () => Promise<boolean>;
  waitForSearchResult: () => Promise<Bookmark | null>;
}
