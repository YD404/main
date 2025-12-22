/// 共通リソースの動的読み込み (Common Head)
(function loadCommonResources() {
    const head = document.head;

    // 1. Google Fonts Preconnect
    const preconnect1 = document.createElement('link');
    preconnect1.rel = 'preconnect';
    preconnect1.href = 'https://fonts.googleapis.com';
    head.appendChild(preconnect1);

    const preconnect2 = document.createElement('link');
    preconnect2.rel = 'preconnect';
    preconnect2.href = 'https://fonts.gstatic.com';
    preconnect2.crossOrigin = 'anonymous';
    head.appendChild(preconnect2);

    // 2. Google Fonts (Noto Sans JP, Roboto Mono, Material Icons)
    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&family=Roboto+Mono:wght@400;700&family=Material+Symbols+Outlined:wght@400&display=swap';
    head.appendChild(fontLink);

    // 3. Font Awesome
    const faScript = document.createElement('script');
    faScript.src = 'https://kit.fontawesome.com/033bd174f7.js';
    faScript.crossOrigin = 'anonymous';
    head.appendChild(faScript);

    // 4. CSS Files
    const cssFiles = ['base.css', 'styles.css', 'components.css'];
    cssFiles.forEach(file => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = file;
        head.appendChild(link);
    });
})();

/// ライトダークテーマ切り替え
function initializeThemeToggle() {
    const footerContainer = document.getElementById("footer-container");
    const themeToggle = footerContainer ? footerContainer.querySelector("#theme-toggle") : null;
    const body = document.getElementById("page-body");

    // Bodyがない場合は処理しない（head内読み込み対応）
    if (!body) return;

    // ローカルストレージからテーマを読み込む（デフォルトはダーク）
    const currentThemeIsLight = localStorage.getItem("theme") === "light";
    const themeIcon = footerContainer ? footerContainer.querySelector("#theme-icon") : null;

    // 初期テーマを設定
    if (currentThemeIsLight) {
        body.classList.add("theme-light");
        if (themeIcon) themeIcon.textContent = "dark_mode";
    } else {
        body.classList.remove("theme-light");
        if (themeIcon) themeIcon.textContent = "light_mode";
    }

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            // 現在のテーマを反転
            const newThemeIsLight = !body.classList.contains("theme-light");

            if (newThemeIsLight) {
                body.classList.add("theme-light");
                localStorage.setItem("theme", "light");
                if (themeIcon) themeIcon.textContent = "dark_mode";
                window.dispatchEvent(new CustomEvent('themeChanged'));
            } else {
                body.classList.remove("theme-light");
                localStorage.setItem("theme", "dark");
                if (themeIcon) themeIcon.textContent = "light_mode";
                window.dispatchEvent(new CustomEvent('themeChanged'));
            }
        });
    }
}

/// フッダー・ヘッダー読み込み
document.addEventListener("DOMContentLoaded", () => {
    // ヘッダー読み込み
    const headerContainer = document.querySelector("header");
    if (headerContainer) {
        const pageTitle = headerContainer.querySelector("h1")?.textContent || "";
        fetch("header.html")
            .then(response => response.text())
            .then(data => {
                headerContainer.innerHTML = data;
                const titleEl = headerContainer.querySelector("#page-title");
                if (titleEl) titleEl.textContent = pageTitle;
            })
            .catch(error => console.error("ヘッダーの読み込みに失敗しました:", error));
    }

    // フッター読み込み
    fetch("footer.html")
        .then(response => response.text())
        .then(data => {
            const footerContainer = document.getElementById("footer-container");
            if (footerContainer) {
                footerContainer.innerHTML = data;
                initializeThemeToggle();
            }
        })
        .catch(error => console.error("フッターの読み込みに失敗しました:", error));
});


/// カード読み込みアニメーション
document.addEventListener('DOMContentLoaded', () => {
    const historyItems = document.querySelectorAll('.default-category, .panel');

    historyItems.forEach((item, index) => {
        item.style.opacity = 0;
        item.style.transform = 'translateY(20px)'; // 少し下にずらしておく

        const delay = index * 100; // アニメーション開始を少しずつ遅らせる
        setTimeout(() => {
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            item.style.opacity = 1;
            item.style.transform = 'translateY(0)';
        }, delay);
    });
});

///age 年齢計算
document.addEventListener('DOMContentLoaded', () => {
    const ageElement = document.getElementById("age");
    if (ageElement) {
        const birthDate = new Date(2003, 10, 29);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        ageElement.textContent = age;
    }
});

/// カラーコードコピー機能
document.addEventListener('DOMContentLoaded', () => {
    const colorCodes = document.querySelectorAll('.color-hex, .color-rgb');

    colorCodes.forEach(el => {
        el.addEventListener('click', async () => {
            const text = el.textContent;
            try {
                await navigator.clipboard.writeText(text);
                el.classList.add('copied');
                const originalText = el.textContent;
                el.textContent = 'Copied!';
                setTimeout(() => {
                    el.classList.remove('copied');
                    el.textContent = originalText;
                }, 1000);
            } catch (err) {
                console.error('コピーに失敗しました:', err);
            }
        });
    });
});
