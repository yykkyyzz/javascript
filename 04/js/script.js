(function () {

  const imagesList = [
    "/04/images/360192black.png",
    "/04/images/360192yellow.png",
    "/04/images/364195fff.png",
    "/04/images/600400c40e69.png",
    "/04/images/600400dbb22c.png",
    "/04/images/600400f057a1.png",
    "/04/images/600400fff.png",
    "/04/images/438292000fff.png",
    "/04/images/480360000fff.png",
  ];

  const gallery = document.querySelector(".js-gallery");
  const progressbar = document.querySelector(".js-progressbar");
  const fragment = document.createDocumentFragment();

  const rootElement = document.documentElement;
  const scrollbarFixTargets = document.querySelectorAll(".js-scrollbarFix");
  let scrollbarFix = false;

  const count = imagesList.length;
  let current = 0;

  function initProgressbar() {
    progressbar.setAttribute("aria-valuemax", count);
  }

  function removeProgressbar() {
    const parent = progressbar.parentElement;
    parent.removeChild(progressbar);
  }

  function hideProgressbar() {
    progressbar.addEventListener("transitionend", onTransitionendProgressbar, false);
    progressbar.classList.add("is-hide");
  }

  function onTransitionendProgressbar(event) {
    if (event.propertyName !== "visibility") {
      return;
    }
    progressbar.removeEventListener("transitionend", onTransitionendProgressbar, false);
    deactivatePreventKeydownTabKey();
    deactivateScrollLock();
    removeProgressbar();
  }

  function updateCount() {
    current = current + 1;
    progressbar.setAttribute("aria-valuenow", current);

    if (current === count) {
      gallery.appendChild(fragment);
      hideProgressbar();
    }
  }

  function appendImageItem(url) {
    const div = document.createElement("div");
    const img = document.createElement("img");
    div.classList.add("gallery-item");
    img.classList.add("gallery-image");
    img.setAttribute("src", url);
    div.appendChild(img);
    fragment.appendChild(div);
  }

  function loadImage(url) {
    const img = new Image();
    img.onload = function () {
      appendImageItem(this.src);
      updateCount();
    };
    img.src = url + "?t=" + Date.now();
  }

  function loadAllImages() {
    setTimeout(function() {
      console.log('called loadAllImages time out 5000');
      imagesList.forEach(function (url) {
        loadImage(url);
      })  
    }, 5000);
    // imagesList.forEach(function (url) {
    //   loadImage(url);
    // })  

  }

  function onKeydownTabKey(event) {
    if (event.key !== "Tab") {
      return;
    }
    event.preventDefault();
  }

  function activatePreventKeydownTabKey() {
    progressbar.addEventListener("keydown", onKeydownTabKey, false);
  }

  function deactivatePreventKeydownTabKey() {
    progressbar.removeEventListener("keydown", onKeydownTabKey, false);
  }

  function onTouchMoveProgressbar(event) {
    if (event.targetTouches.length > 1) {
      return;
    }
    event.preventDefault();
  }

  function activateScrollLock() {
    
    rootElement.classList.add("is-locked");
    progressbar.addEventListener("touchmove", onTouchMoveProgressbar, false);
  }

  function deactivateScrollLock() {
    
    rootElement.classList.remove("is-locked");
    progressbar.removeEventListener("touchmove", onTouchMoveProgressbar, false);
  }

  


  initProgressbar();
  progressbar.focus();
  activatePreventKeydownTabKey();
  activateScrollLock();
  loadAllImages();

})();