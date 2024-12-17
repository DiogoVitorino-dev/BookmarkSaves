import type { InferType } from "yup";
import type { StorageValidation } from "./validation";

export interface NativeStorageItem {
  [key: string]: StorageItemValue;
}

type FlattenStorageItem = Flatten<InferType<typeof StorageValidation.item>>;
type FlattenStorageKey = Flatten<InferType<typeof StorageValidation.key>>

type StorageItemWithTypeValue<Value = _> = Omit<FlattenStorageItem, "value"> & {
  value: Value;
};

export type StorageItem<Value = StorageValue> = StorageItemWithTypeValue<Value>;

export type StorageKey = FlattenStorageKey

export type StorageValue = Primitive | Primitive[] | object | object[];
