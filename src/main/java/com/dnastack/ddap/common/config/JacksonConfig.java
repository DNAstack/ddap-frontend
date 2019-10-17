package com.dnastack.ddap.common.config;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.google.protobuf.Message;
import com.google.protobuf.util.JsonFormat;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.jackson.Jackson2ObjectMapperBuilderCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.protobuf.ProtobufHttpMessageConverter;
import org.springframework.http.converter.protobuf.ProtobufJsonFormatHttpMessageConverter;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.List;

@Slf4j
@Configuration
public class JacksonConfig {

    @Bean
    public ProtobufHttpMessageConverter protobufHttpMessageConverter() {
        return new ProtobufJsonFormatHttpMessageConverter();
    }

    @Bean
    public RestTemplate restTemplate(ProtobufHttpMessageConverter hmc) {
        return new RestTemplate(List.of(hmc));
    }

    @Bean
    public Jackson2ObjectMapperBuilderCustomizer customizedObjectMapper() {
        log.info("Initializing custom changes for jackson object mapper.");

        return objectMapper -> {
            objectMapper.serializationInclusion(JsonInclude.Include.NON_EMPTY);
            objectMapper.failOnUnknownProperties(false);
            objectMapper.serializers(new Protobuf2JsonSerializer());
        };
    }

    public static class Protobuf2JsonSerializer extends JsonSerializer<Message> {

        @Override
        public void serialize(Message message, JsonGenerator gen, SerializerProvider serializers) throws IOException {
            gen.writeRawValue(JsonFormat.printer().print(message));
        }

        @Override
        public Class<Message> handledType() {
            return Message.class;
        }
    }
}
