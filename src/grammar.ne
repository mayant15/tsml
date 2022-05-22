@preprocessor typescript

@{%
import moo from 'moo'

const lexer = moo.compile({
  ws: /[ \t]+/,
  integer: /[0-9]+/,
  string: /"(?:\\["\\]|[^\n"\\])*"/,
  word: {
    match: /[a-z]+/,
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

# TODO: Parentheses should create tuples
expr -> exprContent | %lparen _ exprContent _ %rparen {% ([_lparen, _ws1, content, _ws2, _rparen]) => content %}

exprContent -> integer | string | valBinding

integer -> %integer

string -> %string

identifier -> %word

valBinding -> "val" %ws identifier _ %eq _ expr

# Match optional whitespace
_ -> %ws:*
