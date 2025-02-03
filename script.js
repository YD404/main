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

document.addEventListener("DOMContentLoaded", () => {
    fetch("footer.html")
      .then(response => response.text())
      .then(data => {
        document.getElementById("footer-container").innerHTML = data;
      })
      .catch(error => console.error("フッターの読み込みに失敗しました:", error));
  });
  

  document.addEventListener('DOMContentLoaded', () => {
    const historyItems = document.querySelectorAll('.link-category');
  
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