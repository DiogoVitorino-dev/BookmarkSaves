// https://stackoverflow.com/questions/3231459/how-can-i-create-unique-ids-with-javascript/46243198#46243198

export const generateName = () =>
  new Date(Math.ceil(Math.random() * 1e13)).valueOf().toString(36);

export const generateNameFromUrl = (url: string) =>
  url.split("/").pop()?.split("?")[0].split(".")[0];
