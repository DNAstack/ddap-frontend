#!/usr/bin/env bash

set -e
set -x

PROTO_FILE=./proto/dam_service.proto
OUT_FILE=dam-service
PROTOC_GEN_TS_PATH="./node_modules/.bin/protoc-gen-ts"
TMP_DIR="./tmp"
OUT_DIR="./src/app/shared/proto"
PBJS_BIN="./node_modules/protobufjs/bin/pbjs"
PBTS_BIN="./node_modules/protobufjs/bin/pbts"

mkdir -p ${TMP_DIR}
mkdir -p ${OUT_DIR}

${PBJS_BIN} -t static-module -w commonjs -o ${OUT_DIR}/${OUT_FILE}.js ${PROTO_FILE}
${PBTS_BIN} -o ${OUT_DIR}/${OUT_FILE}.d.ts ${OUT_DIR}/${OUT_FILE}.js
