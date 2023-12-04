FROM gradle:8-jdk20-alpine

WORKDIR /var/jenkins_home/workspace/build/build

RUN gradle init --type basic --dsl kotlin --project-name gradle

RUN echo "org.gradle.welcome=never" > gradle.properties

CMD [ "bash" ]
