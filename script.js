const $ = (id) => document.getElementById(id);
const normalize = (value) => String(value || '').toLowerCase();
const categories = ['All', ...Array.from(new Set(cases.map(c => c.category))).sort()];

function renderExperience(){
  $('experienceList').innerHTML = experiences.map(exp => `
    <article class="timeline-card">
      <span class="date">${exp.date}</span>
      <h3>${exp.role}</h3>
      <p class="equipment">${exp.company}</p>
      <ul>${exp.points.map(p => `<li>${p}</li>`).join('')}</ul>
    </article>`).join('');
}

function renderSkills(){
  $('skillsList').innerHTML = skills.map(skill => `
    <article class="skill-card">
      <h3>${skill.group}</h3>
      <div class="chips">${skill.items.map(item => `<span class="chip">${item}</span>`).join('')}</div>
    </article>`).join('');
}

function setupFilters(){
  $('categoryFilter').innerHTML = categories.map(c => `<option value="${c}">${c}</option>`).join('');
  $('searchInput').addEventListener('input', renderCases);
  $('categoryFilter').addEventListener('change', renderCases);
}

function mediaHtml(media){
  if(!media || !media.length){
    return `<div class="no-media">No public photo/video attached for this case.<br/>Technical evidence is documented in the case description.</div>`;
  }
  return media.map(m => {
    const caption = m.caption ? `<div class="media-caption">${m.caption}</div>` : '';
    if(m.type === 'video'){
      return `<figure class="media-item"><video controls playsinline preload="metadata" src="${m.src}"></video>${caption}</figure>`;
    }
    return `<figure class="media-item"><img loading="lazy" src="${m.src}" alt="${m.caption || 'Case documentation'}" />${caption}</figure>`;
  }).join('');
}

function caseSearchText(c){
  return normalize([c.id, c.equipment, c.category, c.title, c.issue, c.result, ...(c.actions || [])].join(' '));
}

function renderCases(){
  const q = normalize($('searchInput').value);
  const selected = $('categoryFilter').value || 'All';
  const filtered = cases.filter(c => (selected === 'All' || c.category === selected) && caseSearchText(c).includes(q));
  $('caseList').innerHTML = filtered.map(c => `
    <article class="case-card">
      <div class="case-grid">
        <div class="media-stack">${mediaHtml(c.media)}</div>
        <div class="case-content">
          <div class="case-top"><span class="case-id">Case #${c.id}</span><span class="category">${c.category}</span></div>
          <div class="equipment">${c.equipment}</div>
          <h3>${c.title}</h3>
          <div class="label">Issue</div>
          <p>${c.issue}</p>
          <div class="label">Activities / Investigation</div>
          <ul>${(c.actions || []).map(a => `<li>${a}</li>`).join('')}</ul>
          <div class="label">Result / Conclusion</div>
          <p class="result">${c.result}</p>
        </div>
      </div>
    </article>`).join('') || `<p class="muted">No case found. Try another keyword or category.</p>`;
}

$('year').textContent = new Date().getFullYear();
$('totalCases').textContent = cases.length + '+';
renderExperience();
renderSkills();
setupFilters();
renderCases();
