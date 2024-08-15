# 22K0144-random

## 説明
このプログラムは授業で作成したindex.jsでデータベースに保存された入力の中からランダムで1つ選択する機能を追加したものです。

## 使い方
dockerを使ってmongoDBを起動する
'''
$ docker run --rm --name=my-app-db -p 27017:27017 mongo
'''

serverを起動する
'''
$ npm install
$ node random.js
'''
