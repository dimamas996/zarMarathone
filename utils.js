export const getRandom = (maxValue) => Math.floor(Math.random() * maxValue + 1);

export function getCurrentTime() {
  const date = new Date();
  const options = {
    hour: 'numeric',
    minute: 'numeric',
  };
  return date.toLocaleString('ru', options);
}

export function createReloadButton() {
  const div = createElement('div', 'reloadWrap');
  const btn = createElement('button', 'button');
  btn.innerText = 'Restart';
  btn.addEventListener('click', () => window.location.pathname = './index.html');
  div.appendChild(btn);
  return div;
}

export function createElement(tag, className) {
  const $tag = document.createElement(tag);

  if (className) {
    $tag.classList.add(className);
  }

  return $tag;
}
