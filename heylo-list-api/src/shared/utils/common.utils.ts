export const isEmptyData = (value: any): boolean => {
  if (value === null) {
    return true;
  } else if (typeof value !== "number" && value === "") {
    return true;
  } else if (value === "undefined" || value === undefined) {
    return true;
  } else if (
    value !== null &&
    typeof value === "object" &&
    !Object.keys(value).length
  ) {
    return true;
  } else if (value !== null && Array.isArray(value) && !value.length) {
    return true;
  } else {
    return false;
  }
};
