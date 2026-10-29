const tools = {
  resume: { kicker: 'RESUME LAB / 01', title: 'Make the good stuff easier to see.' },
  cover: { kicker: 'COVER LETTER / 02', title: 'Make the connection feel specific.' },
  ats: { kicker: 'ATS ANALYZER / 03', title: 'A transparent check, not a mystery score.' },
  truth: { kicker: 'TRUTH CHECKER / 04', title: 'Keep every strong claim accountable.' },
  portfolio: { kicker: 'PORTFOLIO BUILDER / 05', title: 'Give your work somewhere to land.' },
  intro: { kicker: 'SELF-INTRO SCRIPT / 06', title: 'Find the natural version of your story.' },
  compare: { kicker: 'BEFORE / AFTER / 07', title: 'See what changed before you share it.' }
};

const workspaceContent = document.querySelector('#workspace-content');
const workspaceTitle = document.querySelector('#workspace-title');
const workspaceKicker = document.querySelector('#workspace-kicker');
const navItems = document.querySelectorAll('[data-tool]');
let activeTool = 'resume';
let resumeApplied = false;
let analysisRun = false;
let introContext = 'career fair';
let selectedRole = 'Frontend intern';

function render(tool = activeTool) {
  activeTool = tool;
  const config = tools[tool];
  workspaceKicker.textContent = config.kicker;
  workspaceTitle.textContent = config.title;
  navItems.forEach((item) => item.classList.toggle('active', item.dataset.tool === tool));

  const views = { resume: resumeView, cover: coverView, ats: atsView, truth: truthView, portfolio: portfolioView, intro: introView, compare: compareView };
  workspaceContent.innerHTML = views[tool]();
  bindViewActions();
}

function resumeView() {
  return `<div class="panel-grid">
    <div class="demo-panel"><div class="panel-label">CURRENT DRAFT</div><h3 class="panel-title">Experience · Campus Web Club</h3>
      <div class="resume-line"><span class="line-tag">PROJECT WORK</span><del>Worked on a website project</del></div>
      <div class="resume-line"><span class="line-tag">LEADERSHIP</span><del>Did data entry in college club</del></div>
      <div class="resume-line"><span class="line-tag">COLLABORATION</span><del>Good at teamwork</del></div>
      <div class="review-note"><strong>Review prompt:</strong> What was the project scope? Add only what you can stand behind.</div>
    </div>
    <div class="demo-panel soft"><div class="panel-label">SUGGESTED CLARITY PASS</div><h3 class="panel-title">Specific, still yours</h3>
      <div class="resume-line"><span class="line-tag">PROJECT WORK</span>${resumeApplied ? '<ins>Built a responsive website using React <small>[verify scope]</small></ins>' : 'Built a responsive website using React <small>[preview suggestion]</small>'}</div>
      <div class="resume-line"><span class="line-tag">LEADERSHIP</span>${resumeApplied ? '<ins>Organized club records, improving accuracy <small>[verify result]</small></ins>' : 'Organized club records, improving accuracy <small>[preview suggestion]</small>'}</div>
      <div class="resume-line"><span class="line-tag">COLLABORATION</span>${resumeApplied ? '<ins>Collaborated in a 4-member project team</ins>' : 'Collaborated in a 4-member project team <small>[preview suggestion]</small>'}</div>
      <div class="action-row"><button class="small-button" data-action="apply-resume">${resumeApplied ? 'Applied to draft' : 'Apply suggestions'}</button><span class="micro-copy">You review every claim.</span></div>
    </div>
  </div>`;
}

function coverView() {
  return `<div class="panel-grid">
    <div class="demo-panel soft"><div class="panel-label">TARGET ROLE</div><h3 class="panel-title">Choose a focus</h3>
      <div class="role-pills">${['Frontend intern','Web design trainee','Product support'].map((role) => `<button class="role-pill ${selectedRole === role ? 'selected' : ''}" data-role="${role}">${role}</button>`).join('')}</div>
      <p class="panel-copy">The draft below connects Aarav’s project work to the role — without adding a skill that is not already in his notes.</p>
      <div class="review-note"><strong>Honesty check:</strong> This letter is editable. Swap in your own details before using it.</div>
    </div>
    <div class="letter-paper"><div class="letter-meta">SAMPLE DRAFT · ${selectedRole.toUpperCase()}</div><strong>Dear hiring team,</strong><p>I’m excited to apply for the ${selectedRole.toLowerCase()} role. In my college web club, I helped build and organize a responsive website project while working with a small student team.</p><p>That experience taught me to ask clearer questions, communicate progress, and care about how people move through a page. I’d bring that same curiosity and care to your team.</p><p>Thank you for your time,<br />Aarav Kumar</p></div>
  </div>`;
}

function atsView() {
  const runLabel = analysisRun ? 'Analysis complete' : 'Run transparent check';
  return `<div class="demo-panel"><div class="panel-label">HEURISTIC REVIEW · NOT AN EMPLOYER ATS SCORE</div><div class="score-overview"><div class="score-ring"><strong>${analysisRun ? '82' : '—'}</strong><small>${analysisRun ? '/ 100' : 'ready'}</small></div><div><h3 class="panel-title">${analysisRun ? 'A strong foundation with a few review points.' : 'Ready to review Aarav’s sample application.'}</h3><p class="panel-copy">We look at visible signals only: role keywords, sections, readability, and relevance. A real employer’s system may work differently.</p><div class="metric"><span>Keyword coverage</span><div class="metric-bar"><span style="width:${analysisRun ? '78%' : '0%'}"></span></div><b>${analysisRun ? '78%' : '—'}</b></div><div class="metric"><span>Section clarity</span><div class="metric-bar"><span style="width:${analysisRun ? '92%' : '0%'}"></span></div><b>${analysisRun ? '92%' : '—'}</b></div><div class="metric"><span>Readability</span><div class="metric-bar"><span style="width:${analysisRun ? '86%' : '0%'}"></span></div><b>${analysisRun ? '86%' : '—'}</b></div></div></div><div class="action-row"><button class="small-button" data-action="run-analysis">${runLabel}</button><span class="micro-copy">Transparent signals over false precision.</span></div></div>`;
}

function truthView() {
  return `<div class="demo-panel"><div class="panel-label">CLAIM-BY-CLAIM REVIEW</div><div class="truth-summary"><strong><span id="verified-count">1</span> of 3 claims ready</strong><span>Confirm before export →</span></div><div class="claim-list">
    <div class="claim verified"><span class="claim-status"></span><div class="claim-text">Collaborated in a 4-member project team<small>Evidence: project notes supplied by you</small></div><button class="claim-button" data-action="toggle-claim">verified</button></div>
    <div class="claim"><span class="claim-status"></span><div class="claim-text">Improved website load time by 40%<small>No evidence attached yet · could be exaggerated</small></div><button class="claim-button" data-action="toggle-claim">confirm</button></div>
    <div class="claim"><span class="claim-status"></span><div class="claim-text">Led a team of 10 developers<small>Unclear scope · revise or add evidence</small></div><button class="claim-button" data-action="toggle-claim">revise</button></div>
  </div><div class="review-note"><strong>Remember:</strong> Extracting a claim does not prove it. You are the final source of truth.</div></div>`;
}

function portfolioView() {
  return `<div class="panel-grid"><div class="demo-panel soft"><div class="panel-label">PORTFOLIO CONTENT</div><h3 class="panel-title">A compact first impression</h3><p class="panel-copy">Choose what you want a recruiter to see first. This preview uses the same verified details from the sample workspace.</p><div class="resume-line"><span class="line-tag">FEATURED PROJECT</span>Campus Club Website</div><div class="resume-line"><span class="line-tag">SKILLS</span>React · HTML/CSS · Team collaboration</div><div class="resume-line"><span class="line-tag">LINKS</span>LinkedIn · GitHub <small>[add your own URLs]</small></div><div class="action-row"><button class="small-button outline" data-action="portfolio-toast">Edit content</button><span class="micro-copy" id="portfolio-message">Preview only</span></div></div><div class="portfolio-preview"><div class="portfolio-name">Aarav<br />Kumar<span style="color:var(--coral)">.</span></div><div class="portfolio-role">B.TECH STUDENT · ASPIRING WEB DEVELOPER</div><div class="portfolio-grid"><div class="portfolio-tile"><strong>Campus Club Website</strong><span>Responsive React project</span></div><div class="portfolio-tile"><strong>Skills</strong><span>React · HTML/CSS · teamwork</span></div></div></div></div>`;
}

function introView() {
  return `<div class="panel-grid"><div class="demo-panel soft"><div class="panel-label">INTRODUCTION CONTEXT</div><h3 class="panel-title">Where will you use it?</h3><div class="role-pills">${['career fair','interview','networking'].map((context) => `<button class="role-pill ${introContext === context ? 'selected' : ''}" data-context="${context}">${context}</button>`).join('')}</div><p class="panel-copy">A good intro is not a performance. It is a short, comfortable way to give someone a useful starting point.</p><div class="review-note"><strong>Human edit:</strong> Read this out loud. Keep the phrases that sound like your voice.</div></div><div class="intro-preview"><blockquote>“Hi, I’m Aarav. I’m a B.Tech student who enjoys making websites easier to use. Recently, I worked with a four-person student team on a responsive campus project, and I’m now looking for a chance to keep learning through real product work.”</blockquote><footer>30–40 seconds · ${introContext} version · editable draft</footer></div></div>`;
}

function compareView() {
  return `<div class="demo-panel"><div class="panel-label">VISIBLE EDITS · HUMAN REVIEW REQUIRED</div><div class="compare-columns"><div class="compare-box"><h4>BEFORE</h4><p>Worked on a website project. Did data entry in college club. Good at teamwork.</p></div><div class="compare-box after"><h4>AFTER · AI-ASSISTED</h4><p><strong>Built a responsive website using React</strong> [verify scope]<br /><br /><strong>Organized club records, improving accuracy</strong> [verify result]<br /><br /><strong>Collaborated in a 4-member project team.</strong></p></div></div><div class="compare-footer">Three changes surfaced · Two still need your verification · Nothing is auto-submitted</div></div>`;
}

function bindViewActions() {
  document.querySelectorAll('[data-action="apply-resume"]').forEach((button) => button.addEventListener('click', () => { resumeApplied = true; render('resume'); }));
  document.querySelectorAll('[data-action="run-analysis"]').forEach((button) => button.addEventListener('click', () => { analysisRun = true; render('ats'); }));
  document.querySelectorAll('[data-role]').forEach((button) => button.addEventListener('click', () => { selectedRole = button.dataset.role; render('cover'); }));
  document.querySelectorAll('[data-context]').forEach((button) => button.addEventListener('click', () => { introContext = button.dataset.context; render('intro'); }));
  document.querySelectorAll('[data-action="portfolio-toast"]').forEach((button) => button.addEventListener('click', () => { const message = document.querySelector('#portfolio-message'); if (message) message.textContent = 'Content editor opens next'; }));
  document.querySelectorAll('[data-action="toggle-claim"]').forEach((button) => button.addEventListener('click', () => { const claim = button.closest('.claim'); claim.classList.toggle('verified'); button.textContent = claim.classList.contains('verified') ? 'verified' : 'confirm'; const count = document.querySelectorAll('.claim.verified').length; const counter = document.querySelector('#verified-count'); if (counter) counter.textContent = count; }));
}

navItems.forEach((item) => item.addEventListener('click', () => {
  const tool = item.dataset.tool;
  if (tools[tool]) {
    render(tool);
    if (item.closest('.tool-grid')) document.querySelector('#toolkit').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}));

render();
