import { evaluate } from './evaluate'
import { IODriver } from './io-driver'
import { logger } from './logger'
import { parse } from './parse'
import { Runtime } from './runtime'

type REPLConfig = {
  driver: IODriver
  runtime: Runtime
}

const prompt = () => {
  logger.info('$ ')
}

const run = async ({ driver, runtime }: REPLConfig) => {
  const shouldClose = false
  while (!shouldClose) {
    prompt()
    const next = await driver.getNextStatement()
    const expr = parse(next)
    logger.debug('Parsed Expr: ', expr)
    const result = evaluate(expr, runtime)
    logger.debug('Result: ', result)
    logger.debug('Static Env: ', runtime.env.static)
    logger.debug('Dynamic Env: ', runtime.env.dynamic)
  }
}

export default {
  run,
}
