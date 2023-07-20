## gcloud CLIをインストールする

https://cloud.google.com/sdk/docs/install?hl=ja#supported_python_versions
> Docker のヒント: Docker イメージ内に gcloud CLI をインストールする場合は、代わりに 1 回の実行ステップを使用します。

## gcloudログイン
gcloud init
gcloud auth login

## CloudRunをソースコードからデプロイ
https://cloud.google.com/run/docs/deploying-source-code?hl=ja
> gcloud run deploy treesitter-api --source .