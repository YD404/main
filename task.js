// APIキーは環境変数や .env などで管理推奨
const API_KEY = '0siTygxcAD2Sc4inf3nxSiiUHciXlw0os6Uv';
const STATE_MAP = {
  '未着手': { icon: 'play_disabled', cls: 'state-pending'  },
  '着手済': { icon: 'play_circle',   cls: 'state-active'   },
  '完了'  : { icon: 'check_circle',  cls: 'state-complete' },
  '停滞': { icon: 'stop_circle', cls: 'state-stalled' }
};

document.addEventListener('DOMContentLoaded', () => {
  loadTasks();
  document.addEventListener('click', hideTooltip);
});

async function loadTasks() {
  const res = await fetch('https://yd404.microcms.io/api/v1/task', {
    headers: { 'X-MICROCMS-API-KEY': API_KEY }
  });
  const { contents } = await res.json();
  
  // 締切日が近い順にソート（期限なしは末尾）
  contents.sort((a, b) => {
    const da = a.deadline ? new Date(a.deadline) : new Date(8640000000000000);
    const db = b.deadline ? new Date(b.deadline) : new Date(8640000000000000);
    return da - db;
  });

  const tbody = document.querySelector('#task-table tbody');
  tbody.innerHTML = '';
  contents.forEach(task => tbody.append(buildRow(task)));
}

function buildRow({ title, caption, state = '未着手', progress = 0, deadline }) {
  const tr = document.createElement('tr');

  // 締切 & 残日数計算
  let remain = null;
  if (deadline) {
    const d = new Date(deadline);
    const today = new Date();
    const diff = Math.ceil((d - today) / (1000 * 60 * 60 * 24));
    remain = diff;
  }

  // 注意・警告判定
  let caution = false, warning = false;
  if (remain !== null) {
    if (remain <= 30 && progress < 75) warning = true;
    else if (remain <= 60 && progress < 50) warning = true;
    else if (remain <= 180 && progress < 25) caution = true;
  }

  // タイトルセル
  const tdTitle = document.createElement('td');
  tdTitle.className = 'title-cell';
  const span = document.createElement('span');
  span.className = 'title-text';
  span.textContent = title;
  if (warning) span.classList.add('warning');
  else if (caution) span.classList.add('caution');
  span.addEventListener('click', e => showTooltip(e.currentTarget, caption));
  tdTitle.appendChild(span);

  // 注意・警告アイコン
  if (warning) {
    const icon = document.createElement('span');
    icon.className = 'warning-icon';
    icon.textContent = 'warning';
    tdTitle.appendChild(icon);
  } else if (caution) {
    const icon = document.createElement('span');
    icon.className = 'caution-icon';
    icon.textContent = 'report_problem';
    tdTitle.appendChild(icon);
  }
  tr.appendChild(tdTitle);

  // 状態
  const { icon, cls } = STATE_MAP[state] || STATE_MAP['未着手'];
  const tdState = document.createElement('td');
  tdState.innerHTML = `<span class="state-icon ${cls}">${icon}</span>`;
  tr.appendChild(tdState);

  // 進捗
  const pct = Math.max(0, Math.min(progress, 100));
  const tdProg = document.createElement('td');
  tdProg.innerHTML = `
    <div class="progress" aria-label="進捗 ${pct}%">
      <div class="progress__fill" style="width:${pct}%"></div>
      <span class="progress__label">${pct}%</span>
    </div>`;
  tr.appendChild(tdProg);

  // 残り日数表示
  const tdRemain = document.createElement('td');
  let remainText = '―';
  if (remain !== null) {
    if (remain > 0) remainText = `あと${remain}日`;
    else if (remain === 0) remainText = '今日まで';
    else remainText = '期限切れ';
  }
  tdRemain.className = 'deadline-cell';
  tdRemain.textContent = remainText;
  tr.appendChild(tdRemain);

  return tr;
}

// ツールチップ表示
function showTooltip(target, text) {
  if (!text) return;
  const tip = document.getElementById('caption-tooltip');
  tip.textContent = text;
  tip.classList.add('active');
  const rect = target.getBoundingClientRect();
  tip.style.top = `${rect.bottom + window.scrollY + 6}px`;
  tip.style.left = `${rect.left + window.scrollX}px`;
}

// クリックでツールチップを非表示
function hideTooltip(e) {
  if (!e.target.closest('.title-cell')) {
    document.getElementById('caption-tooltip').classList.remove('active');
  }
}