(function () {
  //***  
  // viriables
  // ***
  
  //const htmlElement = document.getElementsByTagName("body");
  const htmlElement = document.querySelector("body");
  const locked = "is-locked";
  // ボタンと本体
  const openButton = document.querySelector(".js-openDrawer");
  const drawer = document.querySelector(".js-drawer");
  const closeButton = drawer.querySelector(".js-closeDrawer");
  const overlay = drawer.querySelector(".js-overlay");

  // 現在の状態（開いていたらtrue）
  let drawerOpen = false;
  let touchY = null;

   // 閉じたあとに開くボタンにフォーカスを戻すか
  let focusOpenButtonAfterClose = true;

  const tabbableElements = drawer.querySelectorAll("a[href], button");
  const firstTabbable = tabbableElements[0];
  const lastTabbable = tabbableElements[tabbableElements.length - 1];

  // アンカーリンク
  const anchorLinks = drawer.querySelectorAll('.nav-link');

  // ***
  // functions
  // ***
  function activateScrollLock() {
    console.log("activateScrollLock called : ");
    htmlElement.classList.add(locked);
  }
  
  function deactivateScrollLock() {
    console.log("deactivateScrollLock called : ");
    htmlElement.classList.remove(locked);
  }
  
  
  function onTransitionendDrawer(event) {
    console.log("onTransitionendDrawer called : "+drawerOpen);
    if (event.target !== drawer || event.propertyName !== "visibility") {
      return;
    }
    if (!drawerOpen) {
      deactivateScrollLock();
      if (focusOpenButtonAfterClose) {
        openButton.focus();
      }
    }
  }

  // stateは真偽値
  function changeAriaExpanded(state) {
    console.log("changeAriaExpanded called : ");
    const value = state ? true : false;
    if( value === true ){
      drawer.classList.add("is-active");
      openButton.classList.add("is-active");
      closeButton.classList.add("is-active");  
    }else{
      drawer.classList.remove("is-active");
      openButton.classList.remove("is-active");
      closeButton.classList.remove("is-active");
    }
  }

  // stateは真偽値
  function changeState(state) {
    console.log("changeState called : ");
    if(state === drawerOpen) {
      console.log("2回以上連続で同じ状態に変更しようとしました");
      return;
    }
    changeAriaExpanded(state);
    drawerOpen = state;
  }

  function openDrawer() {
    console.log("openDrawer called : ");
    changeState(true);
  }

  function closeDrawer() {
    console.log("closeDrawer called : ");
    changeState(false);
  }

  function onClickOpenButton() {
    console.log("onClickOpenButton called : ");
    activateScrollLock();
    openDrawer();
    firstTabbable.focus();
  }

  function onClickCloseButton() {
    console.log("onClickCloseButton called : ");
    closeDrawer();
  }

  function onKeydownTabKeyFirstTabbable(event) {
    console.log("onKeydownTabKeyFirstTabbable called : ");
    if(event.key !== "Tab" || !event.shiftKey) {
      return;
    }
    event.preventDefault();
    lastTabbable.focus();
  }

  function onKeydownTabKeyLastTabbable(event) {
    console.log("onKeydownTabKeyLastTabbable called : ");
    if(event.key !== "Tab" || event.shiftKey) {
      return;
    }
    event.preventDefault();
    firstTabbable.focus();
  }


  function onClickAnchorLink(event) {
    console.log("onClickAnchorLink called : ");
    focusOpenButtonAfterClose = false;
    closeDrawer();
  }

  openButton.addEventListener("click", onClickOpenButton, false);
  closeButton.addEventListener("click", onClickCloseButton, false);
  overlay.addEventListener("click", onClickCloseButton, false);
  drawer.addEventListener("transitionend", onTransitionendDrawer, false);

  firstTabbable.addEventListener("keydown", onKeydownTabKeyFirstTabbable, false);
  lastTabbable.addEventListener("keydown", onKeydownTabKeyLastTabbable, false);

  
  for (let i = 0, len = anchorLinks.length; i < len; i++) {
    anchorLinks[i].addEventListener('click', onClickAnchorLink, false);
  }
})();