export function isNullEmptyOrWhitespace(str: string) {
  return !str || str.trim() === '';
}
