import { drivers } from './io-driver'
import { logger } from './logger'
import repl from './repl'
import { createRuntime } from './runtime'

const greet = () => {
  logger.info('Welcome to TSML!')
}

async function main() {
  greet()
  await repl.run({
    driver: drivers.stdin,
    runtime: createRuntime(),
  })
}

main()
