import { evaluate } from './evaluate'
import { IODriver } from './io-driver'
import { logger } from './logger'
import { parse } from './parse'

type REPLConfig = {
  driver: IODriver
}

const prompt = () => {
  logger.info('$ ')
}

const run = async ({ driver }: REPLConfig) => {
  const shouldClose = false
  while (!shouldClose) {
    prompt()
    const next = await driver.getNextStatement()
    const expr = parse(next)
    logger.debug('Parsed Expr: ', expr)
    const result = evaluate(expr)
    logger.debug('Result: ', result)
  }
}

export default {
  run,
}
