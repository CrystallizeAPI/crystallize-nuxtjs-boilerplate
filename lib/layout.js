export function lockScroll() {
  document.body.style.overflowY = "hidden";
  document.body.style.height = "100vh";
}

export function unlockScroll() {
  document.body.style.overflowY = "initial";
  document.body.style.height = "auto";
}