export function isNullEmptyOrWhitespace(str: string | null) {
  return !str || str.trim() === '';
}
