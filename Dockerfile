FROM mcr.microsoft.com/devcontainers/java:1-17-bullseye

WORKDIR /workspaces/treesitter-api

COPY main.js /workspaces/treesitter-api/
COPY ace.js /workspaces/treesitter-api/
COPY treesitter-lib /workspaces/treesitter-api/treesitter-lib/

RUN apt-get update \
	&& apt-get install nodejs -y \
	&& apt-get install npm -y \
	&& npm install n && npx n stable

RUN npm install express

# gcloud認証
# RUN echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] http://packages.cloud.google.com/apt cloud-sdk main" | tee -a /etc/apt/sources.list.d/google-cloud-sdk.list && curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key --keyring /usr/share/keyrings/cloud.google.gpg  add - && apt-get update -y && apt-get install google-cloud-cli -y

CMD node main.js

EXPOSE 8080