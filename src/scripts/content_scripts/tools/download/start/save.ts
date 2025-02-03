export function save(file: BlobFile[] | BlobFile) {
  file = !Array.isArray(file) ? [file] : file;

  let url;
  let link: HTMLAnchorElement;

  file.forEach(({ data, name, type }) => {
    url = URL.createObjectURL(data);

    link = document.createElement("a");
    link.href = url;
    link.download = `${name}.${type}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  });
}
