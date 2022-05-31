import { IODriver } from './io-driver'
import { logger } from '../utils/logger'
import { parseAndEvaluate } from '../tsml'
import { Runtime } from '../tsml/runtime'

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
    const result = parseAndEvaluate(runtime, next)
    logger.info(result)
  }
}

export const repl = { run }
