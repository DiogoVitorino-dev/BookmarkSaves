import { object, string, mixed, array, lazy } from "yup";
import type { StorageValue } from "./typing";

const itemSchema = object({
  key: string().required(),
  value: mixed<StorageValue>().required(),
});

const key = mixed<string | string[]>().defined();

const item = lazy((val) =>
  Array.isArray(val) ? array().of(itemSchema).defined() : itemSchema.defined()
);

export const StorageValidation = {
  key,
  item,
};
