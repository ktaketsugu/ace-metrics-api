FROM openjdk:17.0.2-slim-buster

WORKDIR /workspaces/treesitter-api

COPY main.js /workspaces/treesitter-api/
COPY ace.js /workspaces/treesitter-api/
COPY treesitter-lib /workspaces/treesitter-api/treesitter-lib/

RUN apt-get update \
	&& apt-get install nodejs npm curl -y \
	&& npm install n && npx n stable

# 個別にRUNしないとビルドに失敗する
RUN apt-get remove --purge npm -y
# 個別にRUNしないとビルドに失敗する
RUN npm install express -y

# gcloud認証
# RUN echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] http://packages.cloud.google.com/apt cloud-sdk main" | tee -a /etc/apt/sources.list.d/google-cloud-sdk.list
#    && curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key --keyring /usr/share/keyrings/cloud.google.gpg  add - && apt-get update -y && apt-get install google-cloud-cli -y

CMD node main.js

EXPOSE 8080