# Lifull Home's Archive Sort
- Lifull Home's Archiveサイトの賃貸掲載履歴を部屋ごとにソートする拡張機能です。
- サイト例：https://www.homes.co.jp/archive/b-13683211/

## 使い方 (Chrome extensionとして)
- $ git clone https://github.com/hidehiro98/chromeextension_lifull_homes_archive
- chrome://extensions/ にアクセス
- 右上のディベロッパーモードをオンにする
- 左上の「パッケージ化されていない拡張機能を読み込む」をクリック
- このリポジトリのsrcディレクトリを選択する

## 使い方 (Tampermonkey scriptとして)
- https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=ja をインストール
- Tampermonkeyをクリックして`新規スクリプトを追加`クリック
- 2行目を`// @name         Lifull Home's Archive Sort`に置き換え
- 7行目を`// @match        https://www.homes.co.jp/archive/b-*`に置き換え
- `src/content.js`の内容を全て`// Your code here...`にコピペ
