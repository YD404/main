fetch('lifevideo.csv')
    .then(res => res.text())
    .then(csv => {
        const data = Papa.parse(csv, { header: true }).data;
        const structure = {};

        // 年ごとにデータを構造化
        data.forEach(({ 年, タイトル, 説明, カテゴリ, 動画URL1, 動画URL2 }) => {
            if (!年) return;
            if (!structure[年]) structure[年] = [];
            structure[年].push({ タイトル, 説明, カテゴリ, 動画URL1, 動画URL2 });
        });

        const container = document.getElementById('lifevideo-container');

        // 年ソート（数値で）
        let itemIndex = 0;
        Object.keys(structure)
            .sort((a, b) => parseInt(a, 10) - parseInt(b, 10))
            .forEach((年, yearIndex) => {
                // タイムラインコンテナ
                const timelineDiv = document.createElement('div');
                timelineDiv.className = 'timeline';

                // タイムラインの縦線
                const lineDiv = document.createElement('div');
                lineDiv.className = 'timeline-line';
                timelineDiv.appendChild(lineDiv);

                // 年セクション
                const yearSection = document.createElement('h2');
                yearSection.className = 'timeline-section';
                yearSection.innerHTML = `<span class="dot dot-lg"></span>${年}年`;
                yearSection.style.cursor = 'pointer';
                timelineDiv.appendChild(yearSection);

                // 年の中身を格納するコンテナ
                const yearContent = document.createElement('div');
                yearContent.className = 'timeline-year-content';
                yearContent.style.display = 'block';
                timelineDiv.appendChild(yearContent);
                yearSection.classList.add('open');

                // 各作品のカード
                structure[年].forEach(({ タイトル, 説明, カテゴリ, 動画URL1, 動画URL2 }) => {
                    itemIndex++;
                    const delay = (itemIndex * 0.1).toFixed(1);

                    // カテゴリアイコンの設定
                    let iconSvg = 'atom.svg';
                    if (カテゴリ === '創作') {
                        iconSvg = 'wand-sparkles.svg';
                    }

                    const itemDiv = document.createElement('div');
                    itemDiv.className = 'timeline-item';

                    // 動画埋め込みの生成
                    let embedHtml = '';
                    if (動画URL1 && 動画URL2) {
                        // 2つの動画がある場合はグリッド表示
                        embedHtml = `
              <div class="grid grid-cols-1 grid-cols-2">
                <div class="embed">
                  <iframe src="${動画URL1}" frameborder="0" allowfullscreen></iframe>
                </div>
                <div class="embed">
                  <iframe src="${動画URL2}" frameborder="0" allowfullscreen></iframe>
                </div>
              </div>
            `;
                    } else if (動画URL1) {
                        embedHtml = `
              <div class="embed">
                <iframe src="${動画URL1}" frameborder="0" allowfullscreen></iframe>
              </div>
            `;
                    }

                    itemDiv.innerHTML = `
            <span class="dot dot-sm"></span>
            <div class="card card-lg animate-fade-in" style="animation-delay: ${delay}s;">
              <h2 class="text-2xl font-semibold mb-3 text-dark">${タイトル}</h2>
              <p class="mb-4">${説明}</p>
              <div class="label mb-4">
                <img src="https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/${iconSvg}" alt="${カテゴリ} Icon">
                <span>${カテゴリ}</span>
              </div>
              ${embedHtml}
            </div>
          `;

                    yearContent.appendChild(itemDiv);
                });

                // 年セクションのクリックで開閉
                yearSection.addEventListener('click', () => {
                    const isOpen = yearContent.style.display !== 'none';
                    yearContent.style.display = isOpen ? 'none' : 'block';
                    yearSection.classList.toggle('open', !isOpen);
                });

                container.appendChild(timelineDiv);
            });
    });
