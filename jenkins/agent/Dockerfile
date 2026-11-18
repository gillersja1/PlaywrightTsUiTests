# Keep this tag in step with @playwright/test in package.json.
FROM mcr.microsoft.com/playwright:v1.61.1-noble

RUN apt-get update \
    && apt-get install -y --no-install-recommends openjdk-21-jre-headless git curl \
    && rm -rf /var/lib/apt/lists/*

USER pwuser
WORKDIR /home/pwuser

# The swarm client registers this container with the controller as a build agent.
CMD ["sh", "-c", "curl -fsSL -o /tmp/swarm-client.jar \"$JENKINS_URL/swarm/swarm-client.jar\" && exec java -jar /tmp/swarm-client.jar -url \"$JENKINS_URL\" -webSocket -name playwright-agent -disableClientsUniqueId -labels playwright -executors 1 -mode exclusive -fsroot /home/pwuser/agent -username \"$JENKINS_ADMIN_ID\" -passwordEnvVariable JENKINS_ADMIN_PASSWORD"]
