ARG IMAGE=gradle:8-jdk20-alpine
FROM $IMAGE

WORKDIR /app

RUN gradle init

COPY build.gradle.kts settings.gradle.kts ./

RUN ./gradlew clean --refresh-dependencies

COPY src ./src

EXPOSE 8080

CMD [ "./gradlew", "bootRun" ]
