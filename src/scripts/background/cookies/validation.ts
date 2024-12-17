import { object, string, ObjectSchema, boolean, InferType } from "yup";

const partitionKey: ObjectSchema<browser.cookies.PartitionKey> = object({
  topLevelSite: string().optional(),
});

export type CookiesGetAllDetails = InferType<typeof getAllDetails>;
const getAllDetails: ObjectSchema<browser.cookies._GetAllDetails | undefined> =
  object({
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

export type CookiesGetAllParams = InferType<typeof getAll>;
const getAll = getAllDetails;

export const CookiesValidation = {
  getAll,
};
