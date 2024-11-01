/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*****************************!*\
  !*** ./src/widget-embed.ts ***!
  \*****************************/
window.addEventListener('message', handler);
function handler(event) {
  const widgetMessage = event.data;
  const widgetId = widgetMessage['widgetId'];
  if (!widgetId) {
    return;
  }
  const widgetElement = document.getElementById(`vendy-widget-${widgetId}`);
  if (!widgetElement) {
    return;
  }
  const host = widgetElement.getAttribute('data-host');
  if (event.origin === host && widgetMessage['SIGNATURE'] === 'vendy-message' && widgetMessage.messageType === 'resize') {
    // set height
    const newHeight = widgetMessage.newSize.height;
    widgetElement.style.width = `100%`;
    if (newHeight) {
      widgetElement.style.height = `${newHeight}px`;
    }
  }
}
/******/ })()
;
//# sourceMappingURL=widget-embed.js.map