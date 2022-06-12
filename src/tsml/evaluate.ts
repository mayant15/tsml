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
  Environment,
  Value,
} from './runtime'

const typecheck = (expr: Expr, staticEnv: Environment) => {
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
      ...runtime.env,
      [expr.identifier]: value,
    },
  }

  // Log this but deliberately picking from the environment and not
  //  `value`, just to make sure that the new environment is correct
  const { content, kind } = newRuntime.env[expr.identifier]
  logger.info(`val ${expr.identifier} = ${content} : ${kind}`)

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
  value: runtime.env[expr.value],
})

export const evaluate = (expr: Expr, runtime: Runtime): EvaluationResult => {
  if (typecheck(expr, runtime.env)) {
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
