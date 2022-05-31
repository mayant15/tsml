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

const typecheck = (expr: Expr, staticEnv: StaticEnvironment) => {
  switch (expr.kind) {
    // Primitives that don't need to type check
    case ExprType.INTEGER:
    case ExprType.STRING:
    case ExprType.VAL_BINDING:
      return true
    case ExprType.IDENTIFIER:
      // This value has been declared and has a type
      return expr.value in staticEnv
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
      case ExprType.IDENTIFIER:
        return runtime.env.dynamic[expr.value]
      default:
        return createUnitValue()
    }
  } else {
    throw TypeError(`Typecheck failed for expression: ${expr.raw}`)
  }
}
