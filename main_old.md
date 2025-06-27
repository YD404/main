# main ウェブサイト仕様書

このドキュメントは、`main`リポジトリのウェブサイトの構造と技術的な仕様をまとめたものです。

## 1. 概要

個人の活動記録やプロフィールなどを公開するための静的ウェブサイトです。主にHTML, CSS, JavaScriptで構成されています。レスポンシブデザインと、ライト／ダークのテーマ切り替え機能を備えています。

## 2. ファイル構成

- `index.html`: トップページ。
- `history.html`: 活動年表ページ。
- `profile.html`: プロフィールページ。
- `links.html`: リンク集ページ。
- `styles.css`: 全ページに適用される共通のスタイルシート。
- `script.js`: 全ページで読み込まれる共通のスクリプト（主にテーマ切り替え機能）。
- `timeline.js`: `history.html`でのみ使用される、年表を動的に生成するスクリプト。
- `timeline.csv`: `timeline.js`が読み込む年表のデータソース。

## 3. HTML構造

- `<header>`: ページ上部のタイトル部分。
- `<main>`: 各ページの主要なコンテンツが配置される。
- `<footer>`: コピーライト表記とテーマ切り替えボタンが配置される。
- スタイルシートとして`styles.css`を読み込み。
- スクリプトとして`script.js`を共通で読み込み。`history.html`では、追加で`papaparse.min.js`（CSV解析ライブラリ）と`timeline.js`を読み込みます。

## 4. CSS (`styles.css`)

### 4.1. カラーリングとテーマ機能

CSS変数（カスタムプロパティ）を用いて、サイト全体の配色を管理し、テーマ切り替えを容易にしています。

#### 4.1.1. CSS変数

- **定義場所**: `:root`セレクタでデフォルト（ライトテーマ）の変数を定義し、`[data-theme="dark"]`属性セレクタでダークテーマ用の値を上書きします。
- **主な変数**:
  - `--bg-color`, `--bg-color-bottom`: ボディ背景のグラデーション色。
  - `--text-color`: 基本の文字色。
  - `--header-bg`, `--header-text`: ヘッダーの背景色と文字色。
  - `--li-color`: リストアイテムの背景色。
  - `--card-bg`: `.default-category`コンテナの背景色。
  - `--card-border`: カードやタイムラインの線の色。
  - `--card-hover`: リンクや要素のホバー時の色。
  - `--link-bg`, `--link-hover`: リンクの背景色とホバー時の文字色。

#### 4.1.2. テーマごとの配色

- **ライトテーマ (`:root`)**:
  - 背景: 明るい紫 (`#DED5F7` ~ `#e2daf8`)
  - テキスト: 黒 (`#000`)
  - カード: 半透明の白 (`rgba(255, 255, 255, 0.65)`)
- **ダークテーマ (`[data-theme="dark"]`)**:
  - 背景: 暗い紫 (`#1e0955` ~ `#2A0D73`)
  - テキスト: 白 (`#fff`)
  - カード: 半透明の黒 (`rgba(0, 0, 0, 0.65)`)

### 4.2. 主要なCSSクラスと役割

- **`body::after`**:
  - `position: fixed`で画面全体を覆う疑似要素を作成し、CSS変数を使った放射状グラデーション（`radial-gradient`）の背景を描画します。`z-index: -1`で最背面に配置されます。

- **`.default-category`**:
  - ページの主要なコンテンツブロック（セクション）のスタイルを定義します。
  - `max-width: 800px`で最大幅を指定し、中央に配置されます。
  - `backdrop-filter: blur(12px)`と半透明の`background-color`により、「グラスモーフィズム」と呼ばれるすりガラスのような効果を実装しています。
  - `border-radius: 32px`で角を大きく丸めています。

- **`.default-category ul`, `.default-category li`**:
  - `index.html`や`links.html`などで使用されるリストのスタイルです。
  - `display: grid`と`grid-template-columns: 1fr 1fr`で2列のグリッドレイアウトを構成します（モバイルでは`1fr`の1列に変化）。
  - `li`はカード状のデザインで、ホバーすると`outline`でハイライトされます。

- **`.timeline`**:
  - `history.html`の年表全体のコンテナです。
  - `position: relative`で、子要素や疑似要素の基準点となります。
  - `::before`疑似要素で、タイムラインの中央を貫く縦線を描画します。
  - 初期状態では`height: 0`で内容は非表示ですが、JavaScriptによって高さが与えられると`transition`で滑らかに表示されます。

- **`.timeline-item`**:
  - 年表内の各イベント（出来事）のスタイルです。
  - `padding-left`の値を変えることで、年・月・日の階層構造をインデントで表現しています。
  - `::before`疑似要素で、縦線上のマーカー（丸印）を描画します。

- **`.timeline-item.year > h3`**:
  - 年の見出しのスタイルです。
  - `cursor: pointer`でクリック可能であることを示します。
  - `::after`疑似要素で矢印（`▸`）を表示し、`.expanded`クラスが付与されると`transform: rotate(90deg)`で下向き（`▼`）に変化します。

## 5. JavaScript

### 5.1. `script.js` (共通スクリプト)

- **テーマ切り替え**:
  - `#theme-toggle`ボタンのクリックを監視します。
  - `document.documentElement.dataset.theme`を読み書きしてテーマを切り替えます。
  - `localStorage.setItem('theme', ...)`でユーザーの選択をブラウザに保存し、次回訪問時もその設定を維持します。

### 5.2. `timeline.js` (年表生成スクリプト)

- **データ処理**: `fetch`で`timeline.csv`を読み込み、`Papa.parse`でJSONに変換します。
- **DOM生成**: 変換したデータを元に、年・月・日の階層構造を持つHTML要素を動的に生成します。
- **アコーディオン動作**:
  - 各年の`<h2>`要素がクリックされると、対応する`.timeline`コンテナの高さを`0`と`scrollHeight`（コンテンツの実際の高さ）の間で切り替えます。
  - この高さの変更がCSSの`transition`をトリガーし、滑らかな開閉アニメーションを実現します。