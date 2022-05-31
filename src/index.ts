import { repl, drivers } from './repl'
import { logger } from './utils/logger'
import { createRuntime } from './tsml/runtime'

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
