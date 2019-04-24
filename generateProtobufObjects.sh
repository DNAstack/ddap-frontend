#!/bin/bash

set -x

#Helper script to generate Java protobuf definition.

SRC_DIR="./angular/proto"
DST_DIR="./e2e-tests/src/main/java"

JAVA_PACKAGE_NAME='package dam.v1.e2e;'

cp $SRC_DIR/dam_service.proto target/dam_service.proto

sed -i -e "s/^package.*\;$/$JAVA_PACKAGE_NAME/" target/dam_service.proto
time protoc --java_out=$DST_DIR target/dam_service.proto