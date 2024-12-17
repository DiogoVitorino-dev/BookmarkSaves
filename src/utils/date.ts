const getSafeISO = () => new Date().toISOString().replace(/[:.]/g, "-");

export const DateUtils = {
  getSafeISO,
};
