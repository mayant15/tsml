import { logger } from '../utils/logger'
import {
  Expr,
  ExprType,
  IdentifierExpr,
  IntegerExpr,
  StringExpr,
  ValBindingExpr,
} from './parse'
import {
  createIntValue,
  createStringValue,
  createUnitValue,
  Runtime,
  StaticEnvironment,
  Value,
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

export type EvaluationResult = {
  value: Value
  runtime: Runtime
}

const evaluateIntegerExpr = (
  expr: IntegerExpr,
  runtime: Runtime
): EvaluationResult => ({
  runtime,
  value: createIntValue(expr.value),
})

const evaluateStringExpr = (
  expr: StringExpr,
  runtime: Runtime
): EvaluationResult => ({
  runtime,
  value: createStringValue(expr.value),
})

const evaluateValBinding = (
  expr: ValBindingExpr,
  runtime: Runtime
): EvaluationResult => {
  // TODO: Ignore the runtime here? Handle this when we do scopes (let bindings)
  const { value } = evaluate(expr.value, runtime)

  const newRuntime: Runtime = {
    env: {
      dynamic: {
        ...runtime.env.dynamic,
        [expr.identifier]: value,
      },
      static: {
        ...runtime.env.static,
        [expr.identifier]: value.kind,
      },
    },
  }

  logger.info(
    `val ${expr.identifier} = ${
      newRuntime.env.dynamic[expr.identifier].content
    } : ${newRuntime.env.static[expr.identifier]}`
  )

  return {
    runtime: newRuntime,
    value: createUnitValue(),
  }
}

const evaluateIdentifierExpr = (
  expr: IdentifierExpr,
  runtime: Runtime
): EvaluationResult => ({
  runtime,
  value: runtime.env.dynamic[expr.value],
})

export const evaluate = (expr: Expr, runtime: Runtime): EvaluationResult => {
  if (typecheck(expr, runtime.env.static)) {
    switch (expr.kind) {
      case ExprType.INTEGER:
        return evaluateIntegerExpr(expr, runtime)
      case ExprType.STRING:
        return evaluateStringExpr(expr, runtime)
      case ExprType.VAL_BINDING:
        return evaluateValBinding(expr, runtime)
      case ExprType.IDENTIFIER:
        return evaluateIdentifierExpr(expr, runtime)
      default:
        return {
          runtime,
          value: createUnitValue(),
        }
    }
  } else {
    throw TypeError(`Typecheck failed for expression: ${expr.raw}`)
  }
}
