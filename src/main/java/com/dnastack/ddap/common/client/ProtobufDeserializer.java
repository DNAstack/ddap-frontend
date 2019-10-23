package com.dnastack.ddap.common.client;

import com.google.protobuf.InvalidProtocolBufferException;
import com.google.protobuf.Message;
import com.google.protobuf.util.JsonFormat;
import reactor.core.publisher.Mono;

public class ProtobufDeserializer {

    public static <T extends Message> Mono<T> fromJson(String json, T defaultMessageInstance) {
        try {
            Message.Builder builder = defaultMessageInstance.newBuilderForType();
            JsonFormat.parser().merge(json, builder);
            return Mono.just((T) builder.build());
        } catch (InvalidProtocolBufferException e) {
            return Mono.error(e);
        }
    }

}
