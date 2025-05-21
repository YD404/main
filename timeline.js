// timeline.js
// CSVからタイムラインを生成するスクリプト
fetch('timeline.csv') //
  .then(res => res.text())
  .then(csv => {
    const data = Papa.parse(csv, { header: true }).data; //

    // 年 → 月 → 日 構造を作る
    const structure = {};
    data.forEach(row => {
      const { 年, 月, 日, 内容 } = row; //
      if (!structure[年]) structure[年] = {}; //
      if (!structure[年][月]) structure[年][月] = []; //
      structure[年][月].push({ 日, 内容 }); //
    });

    const container = document.querySelector('.timeline'); //

    Object.keys(structure).sort().forEach(年 => {
      const yearDiv = document.createElement('div'); //
      yearDiv.className = 'timeline-item year'; //
      yearDiv.innerHTML = `<h1>${年}</h1>`; //
      container.appendChild(yearDiv); //

      Object.keys(structure[年]).sort().forEach(月 => {
        const monthDiv = document.createElement('div'); //
        monthDiv.className = 'timeline-item month'; //
        monthDiv.innerHTML = `<h4>${月}月</h4>`; //
        container.appendChild(monthDiv); //

        structure[年][月].forEach(({ 日, 内容 }) => {
          const dayDiv = document.createElement('div'); //
          dayDiv.className = 'timeline-item day'; //
          dayDiv.innerHTML = `<p>${日}</p><p>${内容}</p>`; //
          container.appendChild(dayDiv); //
        });
      });
    });
  });