function fromBlob(dataOrType: Blob | string) {
  function getType(type: string) {
    const result = type.split("/");
    if (result.length > 1) return result[1];
    return result[0];
  }
  if (typeof dataOrType === "string") return getType(dataOrType);
  return getType(dataOrType.type);
}

function fromDataUrl(data: string) {
  data = data.slice(data.indexOf(":") + 1, data.indexOf(";"));
  return data.split("/")[1];
}

export const typeExtract = { fromBlob, fromDataUrl };
