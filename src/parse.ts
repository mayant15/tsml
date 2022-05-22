// Syntax elements
// 1. Integer -> (0-9)+
//   eg. 1
// 2. String -> " .* "
//   eg. "hello"
// 3. Identifier -> [a-ZA-Z]([a-zA-Z0-9])*
//   eg. hello
// 4. ValBinding -> val Identifier = Expr
//   eg. val id = 2

// Parsing
// Start -> Expr
// E -> Integer | String | ValBinding
// Expr -> E | ( E )
// Integer -> (0-9)+
// String -> " .* "
// ValBinding -> val Identifier = Expr

import moo from 'moo'
import { logger } from './logger'

const rules: moo.Rules = {
  whitespace: /[ \t]+/,
  number: /[0-9]+/,
  string: /"(?:\\["\\]|[^\n"\\])*"/,
  keyword: ['use', 'fun', 'val'],
  newline: { match: /\n/, lineBreaks: true },
}

const lexer = moo.compile(rules)

export enum ExprType {
  VAL_BINDING = 'val',
  INTEGER = 'int',
  STRING = 'string',
}

export type IntegerExpr = {
  kind: ExprType.INTEGER
  value: number
}

export const createIntegerExpr = (value: number): IntegerExpr => ({
  kind: ExprType.INTEGER,
  value,
})

export type StringExpr = {
  kind: ExprType.STRING
  value: string
}

export const createStringExpr = (value: string): StringExpr => ({
  kind: ExprType.STRING,
  value,
})

export type Identifier = string

export type ValBindingExpr = {
  kind: ExprType.VAL_BINDING
  identifier: Identifier
  value: Expr
}

export const createValBindingExpr = (
  identifier: Identifier,
  value: Expr
): ValBindingExpr => ({
  kind: ExprType.VAL_BINDING,
  identifier,
  value,
})

export type Expr = (IntegerExpr | StringExpr | ValBindingExpr) & {
  raw: string
}

const parsers = {
  integer: (input: string): IntegerExpr => {
    return createIntegerExpr(42)
  },
  string: (input: string): StringExpr => {
    return createStringExpr('')
  },
}

export const parse = (raw: string): Expr => {
  lexer.reset(raw)
  for (const token of lexer) {
    // Ignore whitespace
    if (token.type === 'whitespace') {
      continue
    }

    logger.debug(token)
  }
  return {
    raw,
    ...parsers.integer('42'),
  }
}
