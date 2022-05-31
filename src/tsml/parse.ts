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

import { Parser, Grammar } from 'nearley'
import grammar from './generated/grammar'

export enum ExprType {
  VAL_BINDING = 'val',
  INTEGER = 'int',
  STRING = 'string',
  IDENTIFIER = 'identifier',
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

export type IdentifierExpr = {
  kind: ExprType.IDENTIFIER
  value: Identifier
}

export const createIdentifierExpr = (value: Identifier): IdentifierExpr => ({
  kind: ExprType.IDENTIFIER,
  value,
})

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

export type Expr = (
  | IdentifierExpr
  | IntegerExpr
  | StringExpr
  | ValBindingExpr
) & {
  raw: string
}

export const parse = (raw: string): Expr => {
  const parser = new Parser(Grammar.fromCompiled(grammar))
  parser.feed(raw)

  // TODO: Traverse the tree
  return parser.results[0][0][0]
}
