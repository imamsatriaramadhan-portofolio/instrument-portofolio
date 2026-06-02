document.getElementById('year').textContent = new Date().getFullYear();
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
menuBtn.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

const experienceList = document.getElementById('experienceList');
experienceList.innerHTML = experiences.map(exp => `
  <article class="timeline-item">
    <div class="date">${exp.date}</div>
    <div>
      <h3>${exp.role}</h3>
      <h4>${exp.company}</h4>
      <ul>${exp.points.map(p => `<li>${p}</li>`).join('')}</ul>
    </div>
  </article>`).join('');

const skillGrid = document.getElementById('skillGrid');
skillGrid.innerHTML = skills.map(s => `
  <article class="skill-box">
    <h3>${s.group}</h3>
    <div class="tags">${s.items.map(i => `<span class="tag">${i}</span>`).join('')}</div>
  </article>`).join('');

const categorySelect = document.getElementById('categorySelect');
const searchInput = document.getElementById('searchInput');
const caseGrid = document.getElementById('caseGrid');
const categories = ['All', ...Array.from(new Set(cases.map(c => c.category))).sort()];
categorySelect.innerHTML = categories.map(c => `<option value="${c}">${c}</option>`).join('');

function renderCases(){
  const q = searchInput.value.trim().toLowerCase();
  const cat = categorySelect.value;
  const filtered = cases.filter(c => {
    const text = `${c.id} ${c.equipment} ${c.category} ${c.title} ${c.issue} ${c.actions.join(' ')} ${c.result}`.toLowerCase();
    return (cat === 'All' || c.category === cat) && (!q || text.includes(q));
  });
  caseGrid.innerHTML = filtered.map(c => `
    <article class="card">
      <div class="card-top"><span class="case-id">Case #${c.id}</span><span class="category">${c.category}</span></div>
      <h3>${c.title}</h3>
      <div class="equipment">${c.equipment}</div>
      <p><strong>Issue:</strong> ${c.issue}</p>
      <ul>${c.actions.slice(0,4).map(a => `<li>${a}</li>`).join('')}</ul>
      ${c.actions.length > 4 ? `<p class="muted">+ ${c.actions.length - 4} more investigation/action steps</p>` : ''}
      <p class="result"><strong>Result:</strong> ${c.result}</p>
    </article>`).join('') || `<p class="muted">No case found.</p>`;
}
searchInput.addEventListener('input', renderCases);
categorySelect.addEventListener('change', renderCases);
renderCases();
