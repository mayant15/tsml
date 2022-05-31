import { logger } from '../utils/logger'
import { evaluate } from './evaluate'
import { parse } from './parse'
import { Runtime, Value } from './runtime'

export const parseAndEvaluate = (
  runtime: Runtime,
  statement: string
): Value => {
  const expr = parse(statement)
  logger.debug('Parsed Expr: ', expr)

  const result = evaluate(expr, runtime)
  logger.debug('Result: ', result)
  logger.debug('Static Env: ', runtime.env.static)
  logger.debug('Dynamic Env: ', runtime.env.dynamic)

  return result
}
