import { noop } from './util'

enum LogLevel {
  ERROR = 0,
  WARN,
  INFO,
  DEBUG,
}

const logLevel = process.env['TSML_LOG_LEVEL'] ?? LogLevel.DEBUG

export const logger = {
  debug: logLevel >= LogLevel.DEBUG ? console.log : noop,
  info: logLevel >= LogLevel.INFO ? console.log : noop,
  warn: logLevel >= LogLevel.WARN ? console.warn : noop,
  error: logLevel >= LogLevel.ERROR ? console.error : noop,
}
