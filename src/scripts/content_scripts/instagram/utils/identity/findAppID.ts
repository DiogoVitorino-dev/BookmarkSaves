export function findAppID() {
  const appIdPattern = /"X-IG-App-ID":"([\d]+)"/;

  const bodyScripts: NodeListOf<HTMLScriptElement> =
    document.querySelectorAll("body > script");

  for (let i = 0; i < bodyScripts.length; ++i) {
    const match = bodyScripts[i].text.match(appIdPattern);
    if (match) return match[1];
  }

  console.log("Cannot find app id");
  return "";
}
