(function () {
  // "#39,L13,13": a press per code; L = hold it 900 ms.
  var seq = (location.hash.slice(1) || '').split(',').filter(Boolean);
  function fire(type, k) { var e = document.createEvent('Event'); e.initEvent(type, true, true); e.keyCode = k; document.dispatchEvent(e); }
  var t = 1200;
  setTimeout(function () { fire('keydown', 0); fire('keyup', 0); }, t);
  seq.forEach(function (s) {
    var long = s[0] === 'L', k = +s.replace('L', '');
    t += 400; setTimeout(function () { fire('keydown', k); }, t);
    t += long ? 900 : 60; setTimeout(function () { fire('keyup', k); }, t);
  });
})();
(function () { var st = document.createElement('style'); st.textContent = '*{-webkit-transition:none!important;transition:none!important}'; document.head.appendChild(st); })();
