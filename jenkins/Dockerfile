FROM jenkins/jenkins:lts

USER root

COPY --from=docker:24.0.6-dind /usr/local/bin/docker /usr/local/bin/

#RUN apt-get update -y
#RUN apt-get install docker-io -y
#RUN apt-get install sudo -y
#RUN rm -rf /var/lib/apt/lists/*

RUN groupadd docker
RUN usermod -aG docker jenkins && usermod -aG docker root

USER jenkins
