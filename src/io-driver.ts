import * as rd from 'readline'

/**
 * Implement this interface to get input from either stdin or file
 */
export type IODriver = {
  getNextStatement: () => Promise<string>
}

const rl = rd.createInterface({
  input: process.stdin,
})

const readInput = () => new Promise<string>((res) => rl.question('', res))

const stdin: IODriver = {
  getNextStatement: readInput,
}

const file: IODriver = {
  getNextStatement: () => Promise.resolve(''),
}

export const drivers = {
  stdin,
  file,
}
