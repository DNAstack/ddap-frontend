#!/bin/bash

set -x

#Helper script to generate Java protobuf definition.


/Users/harshd/WebstormProjects/ddap-frontend/angular/proto/dam_service.proto

SRC_DIR="/Users/harshd/WebstormProjects/ddap-frontend/angular/proto"
DST_DIR="./src/main/java"
time protoc --java_out=$DST_DIR -I $SRC_DIR $SRC_DIR/dam_service.proto