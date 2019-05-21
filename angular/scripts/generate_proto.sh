#!/usr/bin/env bash

set -e
set -x

SRC_DAM_PROTO_FILE=./proto/dam_service.proto
SRC_IC_PROTO_FILE=./proto/ic_service.proto
OUT_DAM_FILE=dam-service
OUT_IC_FILE=ic-service
PROTOC_GEN_TS_PATH="./node_modules/.bin/protoc-gen-ts"
TMP_DIR="./tmp"
TMP_PROTO_FILE=${TMP_DIR}/temporary.proto
OUT_DIR="./src/app/shared/proto"
PBJS_BIN="./node_modules/protobufjs/bin/pbjs"
PBTS_BIN="./node_modules/protobufjs/bin/pbts"

mkdir -p ${TMP_DIR}
mkdir -p ${OUT_DIR}

# DAM
cp ${SRC_DAM_PROTO_FILE} ${TMP_PROTO_FILE}

${PBJS_BIN} -t static-module -w commonjs -o ${OUT_DIR}/${OUT_DAM_FILE}.js ${TMP_PROTO_FILE}
${PBTS_BIN} -o ${OUT_DIR}/${OUT_DAM_FILE}.d.ts ${OUT_DIR}/${OUT_DAM_FILE}.js

# IC
cp ${SRC_IC_PROTO_FILE} ${TMP_PROTO_FILE}

${PBJS_BIN} -t static-module -w commonjs -o ${OUT_DIR}/${OUT_IC_FILE}.js ${TMP_PROTO_FILE}
${PBTS_BIN} -o ${OUT_DIR}/${OUT_IC_FILE}.d.ts ${OUT_DIR}/${OUT_IC_FILE}.js
