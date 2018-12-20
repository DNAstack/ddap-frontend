# Packages the application into a runnable Docker container

FROM selenium/standalone-chrome:3.12.0-cobalt

# include all the files assembled for us by the build-docker-e2e-image script
USER root
RUN mkdir -p /tmp/build
COPY target/ /tmp/build
RUN chown -R seluser:seluser /tmp/build \
    && for file in $(ls -A /tmp/build); do mv -t / /tmp/build/$file; done \
    && rm -rf /tmp/build \
    && mkdir /target \
    && chown seluser:seluser /target
USER seluser:seluser

ENTRYPOINT ["./mvnw", "test"]
