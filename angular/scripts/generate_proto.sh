#!/usr/bin/env bash

set -e
set -x

SRC_PROTO_FILE=./proto/dam_service.proto
OUT_FILE=dam-service
PROTOC_GEN_TS_PATH="./node_modules/.bin/protoc-gen-ts"
TMP_DIR="./tmp"
TMP_PROTO_FILE=${TMP_DIR}/dam_service.proto
OUT_DIR="./src/app/shared/proto"
PBJS_BIN="./node_modules/protobufjs/bin/pbjs"
PBTS_BIN="./node_modules/protobufjs/bin/pbts"

mkdir -p ${TMP_DIR}
mkdir -p ${OUT_DIR}
cp ${SRC_PROTO_FILE} ${TMP_PROTO_FILE}

${PBJS_BIN} -t static-module -w commonjs -o ${OUT_DIR}/${OUT_FILE}.js ${TMP_PROTO_FILE}
${PBTS_BIN} -o ${OUT_DIR}/${OUT_FILE}.d.ts ${OUT_DIR}/${OUT_FILE}.js
