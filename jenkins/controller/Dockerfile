FROM jenkins/jenkins:2.580.2-lts-jdk21

# Everything is configured as code, so the setup wizard is not needed.
ENV JAVA_OPTS="-Djenkins.install.runSetupWizard=false"
ENV CASC_JENKINS_CONFIG=/var/jenkins_casc/casc.yaml

COPY plugins.txt /usr/share/jenkins/ref/plugins.txt
RUN jenkins-plugin-cli --plugin-file /usr/share/jenkins/ref/plugins.txt

COPY casc.yaml /var/jenkins_casc/casc.yaml
COPY report-csp.groovy /usr/share/jenkins/ref/init.groovy.d/report-csp.groovy
