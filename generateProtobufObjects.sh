#!/bin/bash

set -x

#Helper script to generate Java protobuf definition.

SRC_DIR="./angular/proto"
DST_DIR="./e2e-tests/src/main/java"
time protoc --java_out=$DST_DIR $SRC_DIR/dam_service.proto