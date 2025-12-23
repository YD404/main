/// links.html専用 - リンクデータの読み込みとレンダリング

// カスタムSVGアイコン定義
const CUSTOM_ICONS = {
    niconico: `<svg class="svg-icon" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg">
        <title>niconico icon</title>
        <path d="M.4787 7.534v12.1279A2.0213 2.0213 0 0 0 2.5 21.6832h2.3888l1.323 2.0948a.4778.4778 0 0 0 .4043.2205.4778.4778 0 0 0 .441-.2205l1.323-2.0948h6.9828l1.323 2.0948a.4778.4778 0 0 0 .441.2205c.1838 0 .3308-.0735.4043-.2205l1.323-2.0948h2.6462a2.0213 2.0213 0 0 0 2.0213-2.0213V7.5339a2.0213 2.0213 0 0 0-2.0213-1.9845h-7.681l4.4468-4.4469L17.1637 0l-5.1452 5.1452L6.8 0 5.6973 1.1025l4.4102 4.4102H2.5367a2.0213 2.0213 0 0 0-2.058 2.058z" />
    </svg>`,
    booth: `<svg class="svg-icon" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M0 1024H1024V0H0V1024Z" fill="#FC4D50" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M773.828 438.341V389.068L650.744 192H608.227L541.093 353.238L475.077 214.446L438.138 214.382L326.272 478.653V227.833H250.172V250.007H192V327.26H250.172V550.306C250.172 570.098 266.227 586.141 286.004 586.141H324.033V832L401.683 831.946C401.683 831.946 401.695 720.762 401.695 720.644C401.695 658.964 455.026 608.963 520.963 608.563C521.198 608.563 521.445 608.535 521.707 608.535H521.744H521.786H521.875C629.722 608.612 717.139 690.28 717.139 790.983V832H773.828V611.427H832V489.487L773.828 438.341Z" fill="white" />
    </svg>`,
    note: `<svg class="svg-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 493 493">
        <path d="m139.57,142.06c41.19,0,97.6-2.09,138.1-1.04,54.34,1.39,74.76,25.06,75.45,83.53.69,33.06,0,127.73,0,127.73h-58.79c0-82.83.35-96.5,0-122.6-.69-22.97-7.25-33.92-24.9-36.01-18.69-2.09-71.07-.35-71.07-.35v158.96h-58.79v-210.22Z" />
    </svg>`
};

// アイコン生成関数
function createIcon(link) {
    const icon = link.icon;
    if (!icon) {
        return '<span class="text-only">';
    }

    // カスタムSVGアイコン
    if (CUSTOM_ICONS[icon]) {
        return CUSTOM_ICONS[icon];
    }

    // FontAwesome アイコン
    const iconType = link.iconType || 'brands'; // デフォルトはbrands
    return `<i class="fa-${iconType} ${icon}"></i>`;
}

// リンクリストのレンダリング
function renderLinks(data) {
    const container = document.getElementById('links-container');
    if (!container) return;

    data.forEach((category, categoryIndex) => {
        const section = document.createElement('section');
        section.className = 'default-category';

        // カテゴリ見出し
        const h2 = document.createElement('h2');
        h2.textContent = category.category;
        section.appendChild(h2);

        // リンクリスト
        const ul = document.createElement('ul');
        category.links.forEach(link => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = link.url;
            a.target = '_blank';
            a.rel = 'noopener noreferrer';

            // niconico専用クラス
            if (link.icon === 'niconico') {
                a.className = 'niconico-link';
            }

            // アイコンとテキスト
            const iconHtml = createIcon(link);
            const nameText = link.note ? `${link.name} ${link.note}` : link.name;

            if (link.icon) {
                a.innerHTML = `${iconHtml}<span>${nameText}</span>`;
            } else {
                a.innerHTML = `<span class="text-only">${nameText}</span>`;
            }

            li.appendChild(a);
            ul.appendChild(li);
        });

        section.appendChild(ul);
        container.appendChild(section);
    });
}

// リンクデータ読み込み・実行
document.addEventListener('DOMContentLoaded', () => {
    const linksContainer = document.getElementById('links-container');
    if (!linksContainer) return;

    fetch('links.json')
        .then(response => response.json())
        .then(data => renderLinks(data))
        .catch(error => console.error('リンクデータの読み込みに失敗しました:', error));
});
