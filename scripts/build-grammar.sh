#!/usr/bin/env bash

OUTPUT_DIR="src/tsml/generated"
OUTPUT_FILE="$OUTPUT_DIR/grammar.ts"
INPUT_FILE="src/tsml/grammar.ne"

mkdir -p $OUTPUT_DIR
yarn nearleyc $INPUT_FILE -o $OUTPUT_FILE
