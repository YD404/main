// timeline.js
// CSVからタイムラインを生成するスクリプト
fetch('timeline.csv')
  .then(res => res.text())
  .then(csv => {
    const data = Papa.parse(csv, { header: true }).data;

    // 年 → 月 → 日 構造を作る
    const structure = {};
    data.forEach(row => {
      const { 年, 月, 日, 内容 } = row;
      if (!structure[年]) structure[年] = {};
      if (!structure[年][月]) structure[年][月] = [];
      structure[年][月].push({ 日, 内容 });
    });

    const container = document.querySelector('.timeline');

    Object.keys(structure).sort().forEach(年 => {
      const yearDiv = document.createElement('div');
      yearDiv.className = 'timeline-item year';
      yearDiv.innerHTML = `<h1>${年}</h1>`;
      container.appendChild(yearDiv);

      const yearEventsContainer = document.createElement('div');
      yearEventsContainer.className = 'year-events-container';
      yearEventsContainer.style.display = 'none'; // Initially hidden
      yearDiv.appendChild(yearEventsContainer);

      // ←ここから追加
      const yearH1 = yearDiv.querySelector('h1');
      yearH1.title = 'クリックして展開／折りたたみ';      // ←追加: ツールチップを設定
      yearH1.style.cursor = 'pointer';                 // ←追加: カーソルをポインタに
      // ←ここまで追加

      yearH1.addEventListener('click', () => {          // Add click listener to H1
        if (yearEventsContainer.style.display === 'none') {
          yearEventsContainer.style.display = 'block';
          yearDiv.classList.add('expanded');            // ←追加: 展開状態クラスを付与
        } else {
          yearEventsContainer.style.display = 'none';
          yearDiv.classList.remove('expanded');         // ←追加: 折りたたみ時にクラスを削除
        }
      });

      Object.keys(structure[年])
        .sort((a, b) => parseInt(a, 10) - parseInt(b, 10))
        .forEach(月 => {
          const monthDiv = document.createElement('div');
          monthDiv.className = 'timeline-item month';
          monthDiv.innerHTML = `<h4>${月}月</h4>`;
          yearEventsContainer.appendChild(monthDiv);

          structure[年][月].forEach(({ 日, 内容 }) => {
            const dayDiv = document.createElement('div');
            dayDiv.className = 'timeline-item day';
            dayDiv.innerHTML = `<p>${日}</p><p>${内容}</p>`;
            yearEventsContainer.appendChild(dayDiv);
          });
        });
    });
  });
