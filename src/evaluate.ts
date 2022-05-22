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
    case ExprType.INTEGER:
      return ValueType.String
    case ExprType.VAL_BINDING:
      return ValueType.Unit
  }
}

const typecheck = (expr: Expr, staticEnv: StaticEnvironment) => {
  switch (expr.kind) {
    case ExprType.INTEGER:
    case ExprType.INTEGER:
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
        runtime.env.dynamic[expr.identifier] = evaluate(expr.value, runtime)
        return createUnitValue()
      default:
        return createUnitValue()
    }
  } else {
    throw TypeError(`Typecheck failed for expression: ${expr.raw}`)
  }
}
