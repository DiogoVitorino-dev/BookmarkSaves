import { InferType, string } from "yup";

export type InstagramStartSearchParams = InferType<typeof startSearch>;
const startSearch = string().url().optional();

export const InstagramValidation = {
  startSearch,
};
