import { categories, projects } from './projects.js';

const icons = new Set(['arrow', 'external', 'server', 'network', 'terminal', 'cloud', 'layers', 'shield', 'file', 'download']);
const filters = document.querySelector('#filters');
const search = document.querySelector('#project-search');
const clearSearch = document.querySelector('#clear-search');
const projectGrid = document.querySelector('#project-grid');
const resultCount = document.querySelector('#result-count');
const noResults = document.querySelector('#no-results');
const cardTemplate = document.querySelector('#project-card');
const dialog = document.querySelector('#project-dialog');
const detailContent = document.querySelector('#detail-content');
const detailKicker = document.querySelector('#detail-kicker');
const closeProject = document.querySelector('#close-project');
const demoLaunch = document.querySelector('#demo-launch');

let activeCategory = categories[0];
let openProjectId;
let detailTrigger;

function makeElement(tag, className, label) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (label) element.textContent = label;
  return element;
}

function icon(name) {
  if (!icons.has(name)) throw new Error('Unknown icon: ' + name);
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', 'icon');
  svg.setAttribute('aria-hidden', 'true');
  const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  use.setAttribute('href', '#' + name);
  svg.append(use);
  return svg;
}

function projectHash(project) {
  return '#project/' + project.id;
}

for (const category of categories) {
  const button = makeElement('button', 'filter', category);
  button.type = 'button';
  button.setAttribute('aria-pressed', String(category === activeCategory));
  button.addEventListener('click', () => setCategory(category));
  filters.append(button);
}

function setCategory(category) {
  activeCategory = category;
  for (const button of filters.children) {
    button.setAttribute('aria-pressed', String(button.textContent === category));
  }
  renderProjects();
}

function renderProjects() {
  const query = search.value.trim().toLowerCase();
  const terms = query ? query.split(/\s+/) : [];
  const matches = projects.filter((project) => {
    if (activeCategory !== categories[0] && !project.categories.includes(activeCategory)) return false;
    const searchable = [
      project.title, project.summary, project.type, project.context,
      ...project.categories, ...project.tags, ...project.work
    ].join(' ').toLowerCase();
    return terms.every((term) => searchable.includes(term));
  });
  const cards = document.createDocumentFragment();
  for (const project of matches) {
    const card = cardTemplate.content.cloneNode(true);
    const article = card.querySelector('article');
    article.dataset.color = project.color;
    card.querySelector('.project-icon').append(icon(project.icon));
    card.querySelector('.project-type').textContent = project.type;
    card.querySelector('h3').textContent = project.title;
    card.querySelector('.project-summary').textContent = project.summary;
    const tags = card.querySelector('.tags');
    for (const tag of project.tags) tags.append(makeElement('li', '', tag));
    card.querySelector('.card-category').textContent = project.categories[0];
    const link = card.querySelector('.case-link');
    link.href = projectHash(project);
    link.setAttribute('aria-label', 'View project: ' + project.title);
    cards.append(card);
  }
  projectGrid.replaceChildren(cards);
  noResults.hidden = matches.length > 0;
  clearSearch.hidden = search.value.length === 0;
  resultCount.textContent = matches.length + (matches.length === 1 ? ' project' : ' projects') +
    (matches.length === projects.length ? '' : ' of ' + projects.length);
}

function section(title, body) {
  const wrapper = makeElement('section', 'detail-section');
  wrapper.append(makeElement('h3', '', title), body);
  return wrapper;
}

function renderDetails(project) {
  dialog.dataset.color = project.color;
  detailKicker.textContent = project.type + ' / ' + project.categories.join(' · ');
  const title = makeElement('h2', '', project.title);
  title.id = 'detail-title';
  const header = makeElement('div', 'detail-header');
  header.append(title, makeElement('p', '', project.summary));
  const tags = makeElement('ul', 'tags');
  tags.setAttribute('aria-label', 'Tools');
  for (const tag of project.tags) tags.append(makeElement('li', '', tag));
  header.append(tags);

  const list = makeElement('ul', 'detail-work');
  for (const task of project.work) list.append(makeElement('li', '', task));
  const sections = [
    header,
    section('The brief', makeElement('p', '', project.context)),
    section('What I did', list),
    section('Result', makeElement('p', '', project.result))
  ];

  if (project.evidence.length) {
    const evidence = makeElement('div', 'evidence');
    if (project.preview) {
      const preview = makeElement('img', 'evidence-preview');
      preview.src = 'evidence/' + project.preview.file;
      preview.alt = project.preview.alt;
      preview.width = 2046;
      preview.height = 1092;
      evidence.append(preview);
    }
    for (const artifact of project.evidence) {
      const link = makeElement('a', 'evidence-link');
      link.href = 'evidence/' + artifact.file;
      const label = makeElement('span', '', artifact.label);
      if (artifact.kind === 'PKT') {
        link.download = artifact.file;
      } else {
        link.target = '_blank';
        link.rel = 'noopener';
        link.setAttribute('aria-label', artifact.label + ' (opens in a new tab)');
      }
      link.append(icon(artifact.kind === 'PKT' ? 'download' : 'file'), label,
        makeElement('small', '', artifact.kind), icon(artifact.kind === 'PKT' ? 'arrow' : 'external'));
      evidence.append(link);
    }
    sections.push(section('Project evidence', evidence));
  } else {
    sections.push(makeElement('p', 'coursework-note', 'Supplementary coursework · Project summary'));
  }

  detailContent.replaceChildren(...sections);
}

function syncProject() {
  const project = projects.find((item) => projectHash(item) === location.hash);
  if (!project) {
    if (dialog.open) dialog.close();
    openProjectId = undefined;
    return;
  }
  if (project.id === openProjectId && dialog.open) return;
  renderDetails(project);
  openProjectId = project.id;
  if (!dialog.open) dialog.showModal();
  dialog.scrollTop = 0;
  closeProject.focus({ preventScroll: true });
}

function dismissProject() {
  if (history.state?.portfolioProject === location.hash) {
    history.back();
    return;
  }
  history.replaceState(null, '', '#projects');
  syncProject();
  document.querySelector('#projects').scrollIntoView();
}

document.addEventListener('click', (event) => {
  const link = event.target.closest('a[href^="#project/"]');
  if (!link || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  if (location.hash === link.hash) return;
  detailTrigger = link;
  history.pushState({ portfolioProject: link.hash }, '', link.hash);
  syncProject();
});

demoLaunch.addEventListener('click', (event) => {
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  const player = document.createElement('iframe');
  player.src = new URL('preview', demoLaunch.href).href;
  player.title = 'PromisedLand Windows Server deployment demo';
  player.referrerPolicy = 'no-referrer';
  player.allowFullscreen = true;
  demoLaunch.replaceWith(player);
  player.focus();
});

window.addEventListener('hashchange', syncProject);
closeProject.addEventListener('click', dismissProject);
dialog.addEventListener('cancel', (event) => {
  event.preventDefault();
  dismissProject();
});
dialog.addEventListener('close', () => {
  if (detailTrigger?.isConnected) detailTrigger.focus({ preventScroll: true });
  detailTrigger = undefined;
});
dialog.addEventListener('click', (event) => {
  if (event.target === dialog) dismissProject();
});

search.addEventListener('input', renderProjects);
clearSearch.addEventListener('click', () => {
  search.value = '';
  renderProjects();
  search.focus();
});
document.querySelector('#reset-filters').addEventListener('click', () => {
  search.value = '';
  setCategory(categories[0]);
  filters.firstElementChild.focus();
});

renderProjects();
syncProject();
