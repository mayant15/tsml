import { parseAndEvaluate } from '../src/tsml'
import { createRuntime, ValueType } from '../src/tsml/runtime'

describe('identifiers', () => {
  let runtime = createRuntime()

  beforeEach(() => {
    runtime = createRuntime()
  })

  it.todo('should throw if identifier not in runtime')

  it('should return value in runtime if exists', () => {
    const { runtime: newRuntime } = parseAndEvaluate(runtime, 'val abc = 3')
    const {
      value: { kind, content },
    } = parseAndEvaluate(newRuntime, 'abc')
    expect(kind).toBe(ValueType.Int)
    expect(content).toBe(3)
  })
})
