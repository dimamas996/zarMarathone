import {createElement} from "./main.js";

export const getRandom = (maxValue) => Math.floor(Math.random() * maxValue + 1);
export function getCurrentTime() {
  const date = new Date();
  const options = {
    hour: "numeric",
    minute: "numeric",
  };
  return date.toLocaleString("ru", options);
}

export function createReloadButton() {
  const div = createElement("div", "reloadWrap");
  const btn = createElement("button", "button");
  btn.innerText = "Restart";
  btn.addEventListener("click", () => window.location.reload());
  div.appendChild(btn);
  return div;
}


