import { isNullEmptyOrWhitespace } from '../../src/utils/stringUtils';

describe('stringUtils', () => {
  describe('isNullEmptyOrWhitespace', () => {
    it('should return true when string is null', () => {
      const given = null;
      const result = isNullEmptyOrWhitespace(given);
      expect(result).toBe(true);
    });

    it('should return true when string is empty', () => {
      const given = '';
      const result = isNullEmptyOrWhitespace(given);
      expect(result).toBe(true);
    });

    it('should return true when string is just whitespace', () => {
      const given = '   ';
      const result = isNullEmptyOrWhitespace(given);
      expect(result).toBe(true);
    });
  });
});
