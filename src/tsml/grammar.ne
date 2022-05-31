@preprocessor typescript

@{%
import moo from 'moo'

const lexer = moo.compile({
  ws: /[ \t]+/,
  integer: /[0-9]+/,
  string: /"(?:\\["\\]|[^\n"\\])*"/,
  word: {
    match: /[a-zA-Z]+/,
    type: moo.keywords({
      kw: ["use", "val"]
    })
  },
  eq: "=",
  newline: { match: /\n/, lineBreaks: true },
  lparen: "(",
  rparen: ")"
});
%}

@lexer lexer

program -> expr

expr -> identifier | integer | string | valBinding

# TODO: Some form of typing here?
integer -> %integer {% ([value]) => {
  return {
    raw: value.text,
    kind: "int",
    value: parseInt(value.value)
  }
} %}

string -> %string {% ([{text, value}]) => {
  return {
    raw: text,
    kind: "string",
    value: value.slice(1, -1) // Remove the quotes
  }
} %}

identifier -> %word {% ([{value}]) => {
  return {
    raw: value,
    kind: "identifier",
    value,
  }
} %}

# TODO: Make it so that I don't have to do this insane argument destructuring to make my AST
valBinding -> "val" __ identifier _ %eq _ expr {% ([kw, _ws1, {value: id}, _ws2, _eq, _ws3, [expr]]) => {
  return {
    raw: `val ${id} = ${expr.raw}`,
    kind: "val",
    identifier: id,
    value: expr,
  }
} %}

# Match optional whitespace
_ -> %ws:* {% () => null %}

# Match required whitespace
__ -> %ws:+ {% () => null %}
