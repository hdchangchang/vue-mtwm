(function(doc, win) {
  // 2倍屏
  if (/iPad.*OS|iPhone.*OS/.test(navigator.userAgent)) {
    var h = doc.querySelectorAll('meta[name=viewport]')
    var i = win.devicePixelRatio
    i = i !== 1 ? 2 : 1
    h[0] && h[0].setAttribute('content', 'width=device-width, user-scalable=no, minimum-scale=' + 1 / i +
        ', maximum-scale=' + 1 / i + ', initial-scale=' + 1 / i)
  }

  var docEl = doc.documentElement
  var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
  var recalc = function() {
    var clientWidth = docEl.clientWidth
    if (!clientWidth) return
    docEl.style.fontSize = 100 * (clientWidth / 750) + 'px'
  }

  if (!doc.addEventListener) return
  win.addEventListener(resizeEvt, recalc, false)
  doc.addEventListener('DOMContentLoaded', recalc, false)
})(document, window)
