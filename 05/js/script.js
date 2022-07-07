(function () {

  const stickyTarget = document.querySelector(".js-sticky");
  const stickyTargetParent = document.querySelector(".js-stickyParent");
  // ビューポートに対するナビの相対位置を取得
  const stickyTargetRect = stickyTarget.getBoundingClientRect();
  // 初期表示されたときのナビのTOP位置
  const stickyTargetPosY = getAbsolutePosY(stickyTargetRect);
  let isFixed = false;

  setHeight(stickyTargetParent, stickyTargetRect);

  function getScrollY() {
    // クロスブラウザー互換性のため（IEがscrollYをサポートしていない)
    return window.scrollY || window.pageYOffset;
  }

  function getAbsolutePosY(domRect) {
    const scrollY = getScrollY();
    const offsetFromViewportTop = domRect.top;
    return scrollY + offsetFromViewportTop;
  }

  // カクっとなるのを防ぐための処理
  function setHeight(element, domRect) {
    element.style.height = domRect.height + "px";
  }

  function unfixed() {
    if (!isFixed) {
      return;
    }
    stickyTarget.classList.remove("is-fixed");
    isFixed = false;
  }

  function fixed() {
    if (isFixed) {
      return;
    }
    stickyTarget.classList.add("is-fixed");
    isFixed = true;
  }

  function onScroll(event) {
    const currentScrollY = getScrollY();
    if (currentScrollY < stickyTargetPosY) {
      unfixed();
    } else {
      fixed();
    }
  }

  window.addEventListener("scroll", onScroll, false);
})();