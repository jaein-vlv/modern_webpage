const backToTop = document.getElementById("backtotop");

function checkScroll() {
  /*
    웹 페이지가 얼마나 스크롤 되어 있는지
    MDN Web Docs
    Window.pageYOffset => deprecated, use scrollY
  */
  let scrollY = window.scrollY;
  if (scrollY !== 0) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
}

function moveBackToTop() {
  if (window.scrollY > 0) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

// 브라우저 어디서든지 스크롤 할 때, checkScroll 수행
window.addEventListener("scroll", checkScroll);
backToTop.addEventListener("click", moveBackToTop);
