/// ライトダークテーマ切り替え
function initializeThemeToggle() {
    const footerContainer = document.getElementById("footer-container");
    const themeToggle = footerContainer ? footerContainer.querySelector("#theme-toggle") : null;
    const body = document.getElementById("page-body");

    if (!themeToggle || !body) {
        console.warn("Theme toggle button or body element not found.");
        return;
    }

    // ローカルストレージからテーマを読み込む（デフォルトはダーク）
    const currentThemeIsLight = localStorage.getItem("theme") === "light";

    // 初期テーマを設定
    if (currentThemeIsLight) {
        body.classList.add("theme-light");
        themeToggle.textContent = "🌙 ダークモード";
    } else {
        body.classList.remove("theme-light");
        themeToggle.textContent = "☀️ ライトモード";
    }

    themeToggle.addEventListener("click", () => {
        // 現在のテーマを反転
        const newThemeIsLight = !body.classList.contains("theme-light");
        
        if (newThemeIsLight) {
            body.classList.add("theme-light");
            localStorage.setItem("theme", "light");
            themeToggle.textContent = "🌙 ダークモード";
            window.dispatchEvent(new CustomEvent('themeChanged')); // Add this line
        } else {
            body.classList.remove("theme-light");
            localStorage.setItem("theme", "dark");
            themeToggle.textContent = "☀️ ライトモード";
            window.dispatchEvent(new CustomEvent('themeChanged')); // Add this line
        }
    });
}

/// フッダー
document.addEventListener("DOMContentLoaded", () => {
    fetch("footer.html")
      .then(response => response.text())
      .then(data => {
        document.getElementById("footer-container").innerHTML = data;
        initializeThemeToggle(); // フッター読み込み後にテーマ切り替えを初期化
      })
      .catch(error => console.error("フッターの読み込みに失敗しました:", error));
  });
  

/// カード読み込みアニメーション
document.addEventListener('DOMContentLoaded', () => {
    const historyItems = document.querySelectorAll('.default-category');
  
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
// この部分はHTMLに `id="age"` を持つ要素がないため、
// profile.html など、該当するページにのみ記述することを推奨します。
// もし全ページで必要なら、要素が存在するかチェックする処理を追加します。
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

