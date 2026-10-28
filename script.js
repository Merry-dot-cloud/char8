// 首页轮播与窄屏导航交互
const slides = Array.from(document.querySelectorAll(".slide"));
const dots = Array.from(document.querySelectorAll(".carousel-dot"));
const previousButton = document.querySelector(".carousel-prev");
const nextButton = document.querySelector(".carousel-next");
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".site-nav");

let activeSlide = 0;
let carouselTimer;

// 同步切换图片、分页指示器与无障碍状态
function showSlide(index) {
  activeSlide = (index + slides.length) % slides.length;

  slides.forEach((slide, slideIndex) => {
    const isActive = slideIndex === activeSlide;
    slide.classList.toggle("is-active", isActive);
    slide.setAttribute("aria-hidden", String(!isActive));
  });

  dots.forEach((dot, dotIndex) => {
    const isActive = dotIndex === activeSlide;
    dot.classList.toggle("is-active", isActive);
    dot.setAttribute("aria-current", String(isActive));
  });

  const indexLabel = document.querySelector(".hero-index");
  if (indexLabel) {
    indexLabel.innerHTML = `${String(activeSlide + 1).padStart(2, "0")} <i></i> 0${slides.length}`;
  }
}

// 自动播放并在手动操作后重新计时
function restartCarousel() {
  window.clearInterval(carouselTimer);
  carouselTimer = window.setInterval(() => showSlide(activeSlide + 1), 6000);
}

if (slides.length > 0) {
  previousButton?.addEventListener("click", () => {
    showSlide(activeSlide - 1);
    restartCarousel();
  });

  nextButton?.addEventListener("click", () => {
    showSlide(activeSlide + 1);
    restartCarousel();
  });

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showSlide(index);
      restartCarousel();
    });
  });

  restartCarousel();
}

// 小屏幕下展开导航，选择链接后自动收起
menuButton?.addEventListener("click", () => {
  const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isExpanded));
  navigation?.classList.toggle("is-open", !isExpanded);
  menuButton.setAttribute("aria-label", isExpanded ? "打开导航菜单" : "关闭导航菜单");
});

navigation?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("is-open");
    menuButton?.setAttribute("aria-expanded", "false");
    menuButton?.setAttribute("aria-label", "打开导航菜单");
  });
});
