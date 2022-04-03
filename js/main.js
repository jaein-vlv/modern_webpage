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

/** */

function transformNext(event) {
  const slideNext = event.target;
  const slidePrev = slideNext.previousElementSibling;
  const classList = slideNext.parentElement.parentElement.nextElementSibling;
  let activeLi = classList.getAttribute("data-position");
  const liList = classList.getElementsByTagName("li");

  if (Number(activeLi) < 0) {
    activeLi = Number(activeLi) + 260;

    slidePrev.style.color = "#2f3059";
    slidePrev.classList.add("slide-prev-hover");
    slidePrev.addEventListener("click", transformPrev);

    if (Number(activeLi) === 0) {
      slideNext.style.color = "#cfd8dc";
      slideNext.classList.remove("slide-next-hover");
      slideNext.removeEventListener("click", transformPrev);
    }
  }

  classList.style.transition = "transform 1s";
  classList.style.transform = "translateX(" + String(activeLi) + "px)";
  classList.setAttribute("data-position", activeLi);
}

function transformPrev(event) {
  const slidePrev = event.target;
  const slideNext = slidePrev.nextElementSibling;

  // ul 태그 선택
  const classList = slidePrev.parentElement.parentElement.nextElementSibling;
  let activeLi = classList.getAttribute("data-position");
  const liList = classList.getElementsByTagName("li");

  if (classList.clientWidth < liList.length * 260 + Number(activeLi)) {
    activeLi = Number(activeLi) - 260;

    if (classList.clientWidth > liList.length * 260 + Number(activeLi)) {
      slidePrev.style.color = "#cfd8dc";
      slidePrev.classList.remove("slide-prev-hover");
      slidePrev.removeEventListener("click", transformPrev);
    }
    slideNext.style.color = "#2f3059";
    slideNext.classList.add("slide-next-hover");
    slideNext.addEventListener("click", transformNext);
  }

  classList.style.transition = "transform 1s";
  classList.style.transform = "translateX(" + String(activeLi) + "px)";
  classList.setAttribute("data-position", activeLi);
}

const slidePrevList = document.getElementsByClassName("slide-prev");
for (let i = 0; i < slidePrevList.length; i++) {
  // ul 선택
  let classList =
    slidePrevList[i].parentElement.parentElement.nextElementSibling;
  let liList = classList.getElementsByTagName("li");
  console.log(classList.clientWidth);

  // 카드가 ul 태그 너비보다 넘치면, 왼쪽 버튼은 활성화 오른쪽은 현재 맨 첫카드 위치이므로 비활성화
  if (classList.clientWidth < liList.length * 260) {
    slidePrevList[i].classList.add("slide-prev-hover");
    slidePrevList[i].addEventListener("click", transformPrev);
  } else {
    // 버튼 가리기
    const arrowContainer = slidePrevList[i].parentElement;
    arrowContainer.removeChild(slidePrevList[i].nextElementSibling);
    arrowContainer.removeChild(slidePrevList[i]);
  }
}
