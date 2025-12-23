/// profile.html専用 - 年齢計算・カラーコードコピー機能

// 年齢計算
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

// カラーコードコピー機能
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
