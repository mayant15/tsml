import { Expr } from './parse'
import { createStringValue, Value } from './runtime'

export const evaluate = (expr: Expr): Value => {
  return createStringValue(expr.raw)
}
