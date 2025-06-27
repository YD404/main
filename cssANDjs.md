汎用 CSS 仕様書

本仕様書は、モノトーン基調で無機質かつ未来的な UI ― 「ペイル・コクーン」や「PSYCHO-PASS」に見られる電子ペーパー風の質感 ― を実装するための CSS ガイドラインである。ダークテーマ／ライトテーマ両対応の変数設計を採用し、統一感のあるインターフェースを構築する。

1. テーマ設計

テーマクラス概要ダークテーマなし（標準）基本カラーパレットは従来通りライトテーマ.theme-light変数で明度側に調整1.1 ルート定義（デフォルト＝ダークテーマ）

:root {

/* Color tokens */

--bg-color: #0A0A0A;

--panel-bg-color: #1C1C1C;

--border-color: #444444;

--text-color-primary: #E0E0E0;

--text-color-secondary:#A0A0A0;

--text-color-accent: #FFFFFF;

--line-color: #333333;


/* Typography */

--font-primary: 'Noto Sans JP', sans-serif;

--font-mono: 'Roboto Mono', monospace;


/* Sizing scale */

--space-1: 4px; /* xs */

--space-2: 8px; /* sm */

--space-3: 12px; /* md */

--space-4: 16px; /* lg */

--space-5: 24px; /* xl */


/* Transition */

--ease: cubic-bezier(0.4, 0.0, 0.2, 1);

--fade-time: 0.2s;

}

1.2 ライトテーマ変数上書き

.theme-light {

--bg-color: #F5F6F8;

--panel-bg-color: #FFFFFF;

--border-color: #B0B0B0;

--text-color-primary: #232323;

--text-color-secondary:#606060;

--text-color-accent: #0A0A0A;

--line-color: #E5E7EB;

}

1.3 運用方法

HTML要素（body等）に .theme-light を付与するとライトテーマに切替

JavaScript/OS連動などで動的切替も可

2. カラーパレット 一覧

変数名ダーク値ライト値用途--bg-color#0A0A0A#F5F6F8全体背景--panel-bg-color#1C1C1C#FFFFFFパネル背景--border-color#444444#B0B0B0境界線--text-color-primary#E0E0E0#232323主要テキスト--text-color-secondary#A0A0A0#606060補助テキスト--text-color-accent#FFFFFF#0A0A0A強調テキスト--line-color#333333#E5E7EB区切り線3. ベーススタイル

要素スタイル備考body背景色: var(--bg-color)文字色: var(--text-color-primary)フォント: var(--font-primary)行間: 1.6全ページ共通h1フォントサイズ: 2rem字間: 0.05em文字色: var(--text-color-accent)最上位見出しh21.5rem / 0.05em / var(--text-color-primary)h31.25rem / 0.04em / var(--text-color-primary)h41.125rem / 0.03em / var(--text-color-secondary)h51rem / 0.02em / var(--text-color-secondary)h60.875rem / 0.02em / var(--text-color-secondary)pマージン下: var(--space-3)段落間の余白a文字色: var(--text-color-accent)下線: none遷移: color var(--fade-time) var(--ease)a:hover, a:focus文字色: var(--text-color-primary)下線: 1px solid var(--text-color-primary)コントラスト確保code, preフォント: var(--font-mono)背景色: var(--panel-bg-color)パディング: var(--space-2)インライン／ブロック両用hr高さ: 1px背景色: var(--line-color)境界線: noneセクション区切りul, olパディング左: var(--space-5)箇条書き4. フォントファミリー

変数名フォント用途--font-primary'Noto Sans JP', sans-serif日本語を含む主要なテキスト--font-mono'Roboto Mono', monospaceデジタル風表示（ラベル等）5. フォームコントロール

要素スタイル詳細input[type="text"], textarea背景色: var(--panel-bg-color)境界線: 1px solid var(--border-color)文字色: var(--text-color-primary)フォーカス時: 境界線色 var(--text-color-accent)トランジション: border-color var(--fade-time) var(--ease)input[type="checkbox"], input[type="radio"]幅高: 16px背景: var(--panel-bg-color)境界線: 1px solid var(--border-color)チェック時: 背景 var(--text-color-accent)select背景: var(--panel-bg-color)文字色: var(--text-color-primary)境界線: 1px solid var(--border-color).form-labelフォント: var(--font-mono)文字色: var(--text-color-secondary)マージン下: var(--space-1)6. 主要コンポーネントのスタイル

6.1 UI パネル

クラススタイル.ui-panel背景: var(--panel-bg-color)境界線: 2px solid var(--border-color)パディング: var(--space-4)6.2 タイトルバー

クラススタイル.window-title-barフォント: var(--font-mono)文字色: var(--text-color-secondary)境界線下: 1px solid var(--line-color)パディング: var(--space-2) var(--space-3)6.3 ボタン

セレクタスタイル.btn背景: transparent文字色: var(--text-color-secondary)境界線: 1px solid var(--border-color)パディング: var(--space-2) var(--space-4)カーソル: pointer遷移: all var(--fade-time) var(--ease).btn:hover, .btn:focus背景: var(--border-color)文字色: var(--text-color-accent).btn--primary背景: var(--text-color-accent)文字色: var(--bg-color).btn--primary:hover背景: var(--text-color-primary)6.4 スライダー

セレクタスタイルinput[type="range"]::-webkit-slider-runnable-track高さ: 2px背景: var(--border-color)input[type="range"]::-webkit-slider-thumb幅: 10px高さ: 20px背景: var(--text-color-primary)境界: noneマージン-top: -9px注: Firefox 用 ::-moz-* も同様。

7. レイアウト指針

コンポーネント位置・挙動#info画面上部中央・position: fixed; top: var(--space-4); left: 50%; transform: translateX(-50%);``.btn-close で非表示 (display:none)#controls画面下部中央・bottom: var(--space-4); left: 50%; transform: translateX(-50%);``W キーで toggle('hidden')#digit-slider-panel画面右下・bottom: var(--space-4); right: var(--space-4);常時表示、固定サイズモード切替スライダー input の input イベントでモード更新・モーフィング開始8. レスポンシブ & ブレークポイント

名前条件用途smmax-width: 600pxモバイル向け。パネルが全幅を占有。フォントサイズ -1 ステップmdmin-width: 601px and max-width: 1024pxタブレット。パネル余白縮小。lgmin-width: 1025pxデスクトップ。デフォルト設定9. アニメーション / トランジション

名称定義用途.fade-inopacity 0→1 / var(--fade-time) var(--ease)初期表示.fade-out逆の挙動非表示.slide-uptransform: translateY(10px) → 0 / var(--fade-time)トースト等10. アクセシビリティ指針

コントラスト比は WCAG AA (4.5:1) 以上を確保。

フォーカスリングは outline: 2px solid var(--text-color-accent); outline-offset: 2px; を基本とする。

aria-live を用いた動的更新領域の通知を実装する。

インタラクティブ要素のタップ領域は 44×44px 以上を推奨。

11. ユーティリティクラス (抜粋)

クラス内容.text-centertext-align: center;.mt-4margin-top: var(--space-4);.mb-4margin-bottom: var(--space-4);.hiddendisplay: none !important;.visually-hiddenアクセシブル非表示 