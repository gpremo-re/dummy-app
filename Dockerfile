ARG IMAGE=gradle:8-jdk20-alpine
FROM $IMAGE

WORKDIR /app

RUN gradle init

COPY build.gradle.kts settings.gradle.kts ./

RUN ./gradlew clean --refresh-dependencies

COPY .env ./

COPY src ./src

ENV APP_VERSION=$APP_VERSION

EXPOSE 8080

CMD [ "./gradlew", "bootRun" ]
