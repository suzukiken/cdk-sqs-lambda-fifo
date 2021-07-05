+++
title = "FIFO SQS + Lambdaの設定"
date = "2021-04-09"
tags = ["SQS", "Lambda"]
+++

FIFOのSQSとそのメッセージを受けとるLambdaの設定について。

[CDKのコード](https://github.com/suzukiken/cdksqs-lambda-fifo)

ここではFIFOのSQSのことに限定された話を書く。
[スタンダードSQSについてはこちら](/aws/cdksqs-lambda-standard)。

### パラメータ

CDKでSQSとLambdaの設定をする際に、色々なパラメータがある。

* visibilityTimeout: SQSでメッセージが不可視状態にとどまる時間
* maxReceiveCount: メッセージが何度不可視になるか
* timeout: Lambda関数のタイムアウト
* reservedConcurrentExecutions: Lambda関数の同時実行数
* batchSize: Lambda関数に一度に与えられるメッセージの数（バッチサイズ）

このうちmaxReceiveCountについては1に固定した。
その理由は[スタンダードSQSについての記事](/aws/cdksqs-lambda-standard)と同様。

### 試した4種類のパターン

実験の内容もスタンダードでやったことを同じことをした。

Lambda関数はSQSのメッセージ1件に対して、1秒休んでログを残して処理を終わるものにしている。

試したのはこの6パターン。

|   | バッチサイズの指定 | Lambda関数の同時実行数の指定 | メッセージグループ IDのバリエーション |
|---|--------------------|------------------------------|---------------------------------------|
| 1 | しない             | しない                       |                                     1 |
| 2 |                  1 | しない                       |                                     1 |
| 3 | しない             | しない                       |                                     5 |
| 4 |                  1 | しない                       |                                     5 |
| 5 | しない             |                            1 |                                     5 |
| 6 |                  1 |                            1 |                                     5 |

スタンダードSQSとの違いとして、メッセージグループ IDの指定がある。

6つの実験についてはそれぞれのページに記載した。


