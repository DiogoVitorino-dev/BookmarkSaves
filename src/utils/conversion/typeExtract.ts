function fromBlob(dataOrType: Blob | string) {
  if (typeof dataOrType === "string") return dataOrType.split("/")[1];
  return dataOrType.type.split("/")[1];
}

function fromDataUrl(data: string) {
  data = data.slice(data.indexOf(":") + 1, data.indexOf(";"));
  return data.split("/")[1];
}

export const typeExtract = { fromBlob, fromDataUrl };
