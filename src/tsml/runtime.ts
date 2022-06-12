export enum ValueType {
  Unit = 'unit',
  Int = 'int',
  String = 'string',
  Function = 'function',
}

type ValueBase<Kind extends ValueType, JSType> = {
  kind: Kind
  content: JSType
}

export type UnitValue = ValueBase<ValueType.Unit, undefined>
const globalUnitValue: UnitValue = {
  kind: ValueType.Unit,
  content: undefined,
}
export const createUnitValue = (): UnitValue => globalUnitValue

export type IntValue = ValueBase<ValueType.Int, number>
export const createIntValue = (content: number): IntValue => ({
  kind: ValueType.Int,
  content,
})

export type StringValue = ValueBase<ValueType.String, string>
export const createStringValue = (content: string): StringValue => ({
  kind: ValueType.String,
  content,
})

export type Value = UnitValue | IntValue | StringValue

export type EnvElementId = string

export type Environment = Record<EnvElementId, Value>

export type Runtime = {
  readonly env: Environment
}

export const createRuntime = (): Runtime => {
  return {
    env: {},
  }
}
