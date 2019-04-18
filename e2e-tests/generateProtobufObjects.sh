#!/bin/bash

set -x

#Helper script to generate Java protobuf definition.

SRC_DIR="./src/main/resources/protos"
DST_DIR="./src/main/java"
time protoc --java_out=$DST_DIR $SRC_DIR/dam_service.proto