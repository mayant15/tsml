import { logger } from '../utils/logger'
import { evaluate, EvaluationResult } from './evaluate'
import { parse } from './parse'
import { Runtime } from './runtime'

export const parseAndEvaluate = (
  runtime: Runtime,
  statement: string
): EvaluationResult => {
  const expr = parse(statement)
  logger.debug('Parsed Expr: ', expr)

  const result = evaluate(expr, runtime)
  logger.debug('Result: ', result.value)
  logger.debug('Static Env: ', result.runtime.env.static)
  logger.debug('Dynamic Env: ', result.runtime.env.dynamic)

  return result
}
