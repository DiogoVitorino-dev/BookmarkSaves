const Dosis = browser.runtime.getURL("./assets/fonts/Dosis.ttf");

export default async function LoadFonts() {
  const dosisFont = new FontFace("Dosis", Dosis);
  return dosisFont.load();
}
