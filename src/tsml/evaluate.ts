import { logger } from '../utils/logger'
import { Expr, ExprType } from './parse'
import {
  createIntValue,
  createStringValue,
  createUnitValue,
  Runtime,
  StaticEnvironment,
  Value,
  ValueType,
} from './runtime'

const getType = (expr: Expr) => {
  switch (expr.kind) {
    case ExprType.INTEGER:
      return ValueType.Int
    case ExprType.STRING:
      return ValueType.String
    case ExprType.VAL_BINDING:
      return ValueType.Unit
  }
}

const typecheck = (expr: Expr, staticEnv: StaticEnvironment) => {
  switch (expr.kind) {
    case ExprType.INTEGER:
    case ExprType.STRING:
    case ExprType.VAL_BINDING:
      return true
  }
}

export const evaluate = (expr: Expr, runtime: Runtime): Value => {
  if (typecheck(expr, runtime.env.static)) {
    switch (expr.kind) {
      case ExprType.INTEGER:
        return createIntValue(expr.value)
      case ExprType.STRING:
        return createStringValue(expr.value)
      case ExprType.VAL_BINDING:
        // TODO: Should I mutate the runtime here?
        const value = evaluate(expr.value, runtime)
        runtime.env.static[expr.identifier] = value.kind
        runtime.env.dynamic[expr.identifier] = value
        logger.info(
          `val ${expr.identifier} = ${
            runtime.env.dynamic[expr.identifier].content
          } : ${runtime.env.static[expr.identifier]}`
        )
        return createUnitValue()
      default:
        return createUnitValue()
    }
  } else {
    throw TypeError(`Typecheck failed for expression: ${expr.raw}`)
  }
}
