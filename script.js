/// ライトダークテーマ切り替え
document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("theme-toggle");
    const currentTheme = localStorage.getItem("theme") || "light";

    document.documentElement.setAttribute("data-theme", currentTheme);
    themeToggle.textContent = currentTheme === "dark" ? "☀️ ライトモード" : "🌙 ダークモード";

    themeToggle.addEventListener("click", () => {
        const newTheme = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        themeToggle.textContent = newTheme === "dark" ? "☀️ ライトモード" : "🌙 ダークモード";
    });
});

/// フッダー
document.addEventListener("DOMContentLoaded", () => {
    fetch("footer.html")
      .then(response => response.text())
      .then(data => {
        document.getElementById("footer-container").innerHTML = data;
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
  // 生年月日を指定（YYYY, MM, DD形式）
  const birthDate = new Date(2003, 10, 29); // 1990年1月1日生まれの場合

  // 現在の日付を取得
  const today = new Date();

  // 年齢を計算
  let age = today.getFullYear() - birthDate.getFullYear();

  // 今年の誕生日を迎えていない場合は年齢を1つ減らす
  const monthDifference = today.getMonth() - birthDate.getMonth();
  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  // 計算した年齢を表示
  document.getElementById("age").textContent = age;


  