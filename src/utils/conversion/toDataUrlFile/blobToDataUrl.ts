export const blobToDataUrl = (data: Blob) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result !== null) resolve(reader.result as string);
      else reject("blobToDataUrl / Failed to read blob");
    };
    reader.onerror = reject;
    reader.readAsDataURL(data);
  });
