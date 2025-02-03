import { object, string, ObjectSchema, boolean, InferType } from "yup";

const partitionKey: ObjectSchema<browser.cookies.PartitionKey> = object({
  topLevelSite: string().optional(),
});

export type BrowserGetAllCookiesDetails = InferType<
  typeof getAllCookiesDetails
>;

const getAllCookiesDetails: ObjectSchema<
  browser.cookies._GetAllDetails | undefined
> = object({
  domain: string().optional(),
  firstPartyDomain: string().optional(),
  name: string().optional(),
  partitionKey: partitionKey.optional(),
  path: string().optional(),
  secure: boolean().optional(),
  session: boolean().optional(),
  storeId: string().optional(),
  url: string().optional(),
}).optional();

export type BrowserGetAllCookiesParams = InferType<typeof getAllCookies>;
const getAllCookies = getAllCookiesDetails;

export const BrowserValidation = {
  getAllCookies,
};
