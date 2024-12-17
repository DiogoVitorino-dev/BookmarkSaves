declare type Primitive = string | number | boolean;

declare type Port = browser.runtime.Port;

declare type _ = never | void;

declare type Flatten<Type> = Type extends Array<infer Item> ? Item : Type;

type Cookies = browser.cookies.Cookie[];

interface AppFile<Data> {
  name: string;
  data: Data;
}

type BlobFile = AppFile<Blob>;
type DataUrlFile = AppFile<string>;
type Base64File = AppFile<string>;

declare module "*.css";

declare module "custom-global" {
  global {
    interface Window {
      __content: ContentWindow;
    }
  }
}

interface ContentWindow {
  searching: Set<string>;
  searchResult: import("@content/typing").Bookmark | null;
}
