#!/usr/bin/env bash

set -e
set -x

URL_PROTO_DAM=https://raw.githubusercontent.com/cdvoisin/ga4gh-identity/master/dam/api/v1/dam_service.proto
URL_PROTO_IC=https://raw.githubusercontent.com/cdvoisin/ga4gh-identity/master/ic/api/v1/ic_service.proto
PROTO_DIR=./proto/
FILE_PROTO_DAM=${PROTO_DIR}/dam_service.proto
FILE_PROTO_IC=${PROTO_DIR}/ic_service.proto

curl -o ${FILE_PROTO_DAM} ${URL_PROTO_DAM}
curl -o ${FILE_PROTO_IC} ${URL_PROTO_IC}
