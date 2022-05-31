import { ExprType, parse } from './parse'

describe('parse', () => {
  describe('integer literals', () => {
    it('should parse 3', () => {
      const { kind, raw, value } = parse('3')
      expect(kind).toBe(ExprType.INTEGER)
      expect(raw).toBe('3')
      expect(value).toBe(3)
    })
  })

  describe('string literal', () => {
    it('should parse "abc"', () => {
      const { kind, value, raw } = parse('"abc"')
      expect(kind).toBe(ExprType.STRING)
      expect(raw).toBe('"abc"')
      expect(value).toBe('abc')
    })
  })
})
