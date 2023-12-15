FROM jenkins/jenkins:lts

USER root

COPY --from=docker:24.0.6-dind /usr/local/bin/docker /usr/local/bin/

#RUN apt-get update -y
#RUN apt-get install docker-io -y
#RUN apt-get install sudo -y
#RUN rm -rf /var/lib/apt/lists/*

#RUN apt-get update
#RUN apt-get install -y gnupg
#RUN apt-get install -y gnupg2
#RUN apt-get install ca-certificates
#RUN install -m 0755 -d /etc/apt/keyrings
#RUN curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
#RUN chmod a+r /etc/apt/keyrings/docker.gpg

# Add the repository to Apt sources:
#RUN echo \
#  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian \
#  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
#  tee /etc/apt/sources.list.d/docker.list > /dev/null
#
#RUN apt-get update
#
#RUN apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

RUN usermod -aG docker jenkins && usermod -aG docker root

USER jenkins
