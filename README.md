## gcloud CLIをインストールする

## dcokerイメージ作成

docker build . -t treesitter-api-image

## dockerイメージをテスト実行

docker rm treesitter-api-test
docker run -p 8080:8080 --name treesitter-api-test treesitter-api-image

## dockerイメージをデプロイ

参照：
- [イメージを push および pull する](https://cloud.google.com/artifact-registry/docs/docker/pushing-and-pulling?hl=ja)
- [taketsugu のイメージ](https://console.cloud.google.com/artifacts/docker/kccs-dic-ace-stg-220517/asia-northeast1/taketsugu?hl=ja&project=kccs-dic-ace-stg-220517)
- [Cloud Run へのデプロイ](https://cloud.google.com/run/docs/deploying?hl=ja)

### ローカル イメージにレジストリ名でタグ付けする
> docker tag *SOURCE-IMAGE* *LOCATION*-docker.pkg.dev/*PROJECT-ID*/*REPOSITORY*/*IMAGE*:*TAG*

```
docker tag treesitter-api-image asia-northeast1-docker.pkg.dev/kccs-dic-ace-stg-220517/taketsugu/treesitter-api-image:0.0
```

### Docker を構成する
次のコマンドを実行して、このリポジトリの場所に関連付けられている Artifact Registry ドメインの認証情報ヘルパーとして gcloud を構成します。

> gcloud auth configure-docker asia-northeast1-docker.pkg.dev

### タグ付きイメージを Container Registry に push する

> docker push *LOCATION*-docker.pkg.dev/PROJECT-ID/REPOSITORY/IMAGE:TAG

```
docker push asia-northeast1-docker.pkg.dev/kccs-dic-ace-stg-220517/taketsugu/treesitter-api-image:0.0
```

### デプロイする

> gcloud run deploy *SERVICE* --image *IMAGE_URL*  
> ( IMAGE_URL=*REGION*-docker.pkg.dev/*PROJECT_ID*/*REPO_NAME*/*PATH*:*TAG* )

```
gcloud run deploy treesitter-api --image asia-northeast1-docker.pkg.dev/kccs-dic-ace-stg-220517/taketsugu/treesitter-api-image:0.0
```


