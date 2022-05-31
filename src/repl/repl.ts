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
  let currentRuntime = runtime
  while (!shouldClose) {
    prompt()
    const next = await driver.getNextStatement()
    const {
      runtime: newRuntime,
      value: { content, kind },
    } = parseAndEvaluate(currentRuntime, next)
    logger.info(`${content} : ${kind}`)
    currentRuntime = newRuntime
  }
}

export const repl = { run }
