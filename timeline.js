fetch('timeline.csv')
  .then(res => res.text())
  .then(csv => {
    const data = Papa.parse(csv, { header: true }).data;
    const structure = {};
    data.forEach(({ 年, 月, 日, 内容 }) => {
      if (!structure[年]) structure[年] = {};
      if (!structure[年][月]) structure[年][月] = [];
      structure[年][月].push({ 日, 内容 });
    });

    const container = document.getElementById('timeline-container');

    // 年ソートも数値で
    Object.keys(structure)
      .sort((a, b) => parseInt(a, 10) - parseInt(b, 10))
      .forEach(年 => {
        const section = document.createElement('section');
        section.className = 'default-category';
        const h2 = document.createElement('h2');
        h2.textContent = `${年}年`;
        section.appendChild(h2);

        const timelineDiv = document.createElement('div');
        timelineDiv.className = 'timeline';
        section.appendChild(timelineDiv);

        const timelineContentWrapper = document.createElement('div');
        timelineContentWrapper.className = 'timeline-content';
        timelineDiv.appendChild(timelineContentWrapper);

        // ここが数値ソートされた月ループ
        Object.keys(structure[年])
          .sort((a, b) => parseInt(a, 10) - parseInt(b, 10))
          .forEach(月 => {
            const monthDiv = document.createElement('div');
            monthDiv.className = 'timeline-item month';
            monthDiv.innerHTML = `<h4>${月}月</h4>`;
            timelineContentWrapper.appendChild(monthDiv);

            structure[年][月].forEach(({ 日, 内容 }) => {
              const dayDiv = document.createElement('div');
              dayDiv.className = 'timeline-item day';
              dayDiv.innerHTML = `<h5>${日}</h5><p>${内容}</p>`;
              timelineContentWrapper.appendChild(dayDiv);
            });
          });

        // クリックで開閉動作
        h2.addEventListener('click', () => {
          section.classList.toggle('open');
          const timelineContent = section.querySelector('.timeline');
          if (section.classList.contains('open')) {
            timelineContent.style.height = timelineContent.scrollHeight + 'px';
          } else {
            timelineContent.style.height = '0';
          }
        });

        container.appendChild(section);
      });
  });
