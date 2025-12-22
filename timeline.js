fetch('timeline.csv')
  .then(res => res.text())
  .then(csv => {
    const data = Papa.parse(csv, { header: true }).data;
    const structure = {};
    data.forEach(({ 年, 月, 日, 内容 }) => {
      if (!年) return;
      if (!structure[年]) structure[年] = {};
      if (!structure[年][月]) structure[年][月] = [];
      structure[年][月].push({ 日, 内容 });
    });

    const container = document.getElementById('timeline-container');

    // 年ソート（数値で）
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
        yearContent.style.display = 'block'; // 最初から展開
        timelineDiv.appendChild(yearContent);
        yearSection.classList.add('open'); // 開いた状態のクラスを付与

        // 月ソート（数値で）
        Object.keys(structure[年])
          .sort((a, b) => parseInt(a, 10) - parseInt(b, 10))
          .forEach(月 => {
            // 月ヘッダー
            const monthDiv = document.createElement('div');
            monthDiv.className = 'timeline-item';
            monthDiv.innerHTML = `
              <span class="dot dot-sm"></span>
              <div class="timeline-month">${月}月</div>
            `;
            yearContent.appendChild(monthDiv);

            // 日ごとのエントリ
            structure[年][月].forEach(({ 日, 内容 }) => {
              const dayDiv = document.createElement('div');
              dayDiv.className = 'timeline-item timeline-day';
              dayDiv.innerHTML = `
                <span class="dot dot-sm dot-filled"></span>
                <div class="card">
                  <h5>${日}</h5>
                  <p>${内容}</p>
                </div>
              `;
              yearContent.appendChild(dayDiv);
            });
          });

        // クリックで開閉
        yearSection.addEventListener('click', () => {
          const isOpen = yearContent.style.display !== 'none';
          yearContent.style.display = isOpen ? 'none' : 'block';
          yearSection.classList.toggle('open', !isOpen);
        });

        container.appendChild(timelineDiv);
      });
  });
