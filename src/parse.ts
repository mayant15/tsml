export type Expr = {
  raw: string
}

export const parse = (raw: string): Expr => {
  return {
    raw,
  }
}
