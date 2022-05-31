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
