import { InferType, string } from "yup";

export type XStartSearchParams = InferType<typeof startSearch>;

const startSearch = string().url().optional();

export const XValidation = {
  startSearch,
};
