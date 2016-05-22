var toMeter = (function meter(document) {
  var heatMap = ['#a50026', '#d73027', '#f46d43', '#fdae61', '#fee090', '#e0f3f8', '#abd9e9', '#74add1', '#4575b4', '#313695']; // generated with http://colorbrewer2.org

  var getOrCreateDivByClassName = function getOrCreateDivByClassName (className) {
    var meterDiv = null;
    if (document.getElementsByClassName(className).length == 0) {
      meterDiv = document.createElement('div');
      meterDiv.classList.add(className);
    } else {
      meterDiv = document.getElementsByClassName('meter')[0];
      // remove all children, to make rum for new (not beatiful, should just add/remove)
      while (meterDiv.hasChildNodes())
        meterDiv.removeChild(meterDiv.lastChild);
    }
    return meterDiv;
  };

  var toMeter = function toMeter(level, maxLevel) {
    var current = level;
    var meterDiv = getOrCreateDivByClassName('meter');
    for (var i = 0; i < maxLevel; i++) {
      var tick = document.createElement('div');
      tick.classList.add('tick');
      if (i >= maxLevel - level)
        tick.style.backgroundColor = heatMap[i];
      meterDiv.appendChild(tick);
    }
    return meterDiv;
  };

  return toMeter;
})(document);