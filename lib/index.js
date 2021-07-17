'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

var clamp = function clamp(min, max, value) {
  return Math.max(min, Math.min(max, value));
};
var calculateMouseAngle = function calculateMouseAngle(_ref) {
  var centerX = _ref.centerX,
      centerY = _ref.centerY,
      clientX = _ref.clientX,
      clientY = _ref.clientY;
  var x = clientX - centerX;
  var y = clientY - centerY;
  var degree = Math.atan2(y, x) * 180 / Math.PI + 90;
  var angle = degree < 0 ? degree + 360 : degree;
  return angle;
};
var calculatePercentageFromMouseAngle = function calculatePercentageFromMouseAngle(_ref2) {
  var mouseAngle = _ref2.mouseAngle,
      angleOffset = _ref2.angleOffset,
      angleRange = _ref2.angleRange;
  var angle = mouseAngle - angleOffset;

  if (angle < 0) {
    angle += 360;
  }

  if (angle <= angleRange) {
    return clamp(0, 1, angle / angleRange);
  } else {
    return +(angle - angleRange < (360 - angleRange) / 2);
  }
};
var calculatePositionFromMouseAngle = function calculatePositionFromMouseAngle(_ref3) {
  var mouseAngle = _ref3.mouseAngle,
      multiRotation = _ref3.multiRotation,
      angleOffset = _ref3.angleOffset,
      angleRange = _ref3.angleRange,
      percentage = _ref3.percentage,
      previousPercentage = _ref3.previousPercentage,
      previousMouseAngle = _ref3.previousMouseAngle;

  if (previousMouseAngle !== null) {
    // normalize and cancel the interaction if the delta angle is too big
    var deltaAngle = (mouseAngle - previousMouseAngle) % 360;
    var validDeltaAngle = deltaAngle > 180 ? -(360 - deltaAngle) : deltaAngle < -180 ? 360 + deltaAngle : deltaAngle;

    if (validDeltaAngle >= 120 || validDeltaAngle <= -120) {
      return {
        updated: false,
        mouseAngle: previousMouseAngle,
        percentage: previousPercentage
      };
    } // clamp the percentage


    var newPercentage = previousPercentage + validDeltaAngle / angleRange;

    if (!multiRotation && (newPercentage < 0 || newPercentage > 1)) {
      var clampedPercentage = newPercentage < 0 ? 0 : 1;
      var theoricalMouseAngle = newPercentage < 0 ? angleOffset : angleOffset + angleRange;
      return {
        updated: true,
        mouseAngle: theoricalMouseAngle,
        percentage: clampedPercentage
      };
    }

    return {
      updated: true,
      mouseAngle: mouseAngle,
      percentage: newPercentage
    };
  } else {
    if (multiRotation) {
      var rawPercentage = calculatePercentageFromMouseAngle({
        angleOffset: angleOffset,
        angleRange: angleRange,
        mouseAngle: mouseAngle
      });
      var deltaPercent = (rawPercentage + 1 - percentage % 1) % 1;
      var validDeltaPercent = deltaPercent > 0.5 ? deltaPercent - 1 : deltaPercent;
      return {
        updated: true,
        mouseAngle: mouseAngle,
        percentage: percentage + validDeltaPercent
      };
    } else {
      var _newPercentage = calculatePercentageFromMouseAngle({
        angleOffset: angleOffset,
        angleRange: angleRange,
        mouseAngle: mouseAngle
      });

      return {
        updated: true,
        mouseAngle: mouseAngle,
        percentage: _newPercentage
      };
    }
  }
};
var findClosest = function findClosest(values, value) {
  var result;
  var lastDelta = Infinity;
  values.forEach(function (item) {
    var delta = Math.abs(value - item);

    if (delta < lastDelta) {
      result = item;
      lastDelta = delta;
    }
  });
  return result;
};
var getValueFromPercentage = function getValueFromPercentage(_ref4) {
  var min = _ref4.min,
      max = _ref4.max,
      percentage = _ref4.percentage;
  return min + (max - min) * percentage;
};
var getPercentageFromValue = function getPercentageFromValue(_ref5) {
  var min = _ref5.min,
      max = _ref5.max,
      value = _ref5.value;
  return (value - min) / (max - min);
};
var getClientCenter = function getClientCenter(_ref6) {
  var container = _ref6.container,
      size = _ref6.size;
  var rect = container.current.getBoundingClientRect();
  return {
    centerX: rect.x + size / 2,
    centerY: rect.y + size / 2
  };
};

var DIRECTIONS = {
  37: -1,
  38: 1,
  39: 1,
  40: -1
};
var onMouseMoveStart = function onMouseMoveStart(dispatch) {
  return function (e) {
    e.preventDefault();
    e.stopPropagation();
    dispatch({
      clientX: e.clientX,
      clientY: e.clientY,
      type: 'START'
    });
  };
};
var onKeyDown = function onKeyDown(dispatch) {
  return function (e) {
    var direction = DIRECTIONS[e.keyCode];

    if (!direction) {
      return;
    } else {
      e.preventDefault();
      dispatch({
        type: 'STEPS',
        direction: direction
      });
    }
  };
};
var onScroll = function onScroll(dispatch) {
  return function (e) {
    var direction = e.deltaX < 0 || e.deltaY > 0 ? 1 : e.deltaX > 0 || e.deltaY < 0 ? -1 : 0;
    e.preventDefault();
    dispatch({
      type: 'STEPS',
      direction: direction
    });
  };
};

var addEventToBody = function addEventToBody(name, fn) {
  return document.body.addEventListener(name, fn);
};

var removeEventFromBody = function removeEventFromBody(name, fn) {
  return document.body.removeEventListener(name, fn);
};

var handleEventListener = function handleEventListener(_ref) {
  var dispatch = _ref.dispatch,
      isActive = _ref.isActive;
  return function () {
    var onMove = function onMove(e) {
      e.preventDefault();
      e.stopPropagation();
      dispatch({
        clientX: e.clientX,
        clientY: e.clientY,
        type: 'MOVE'
      });
    };

    var onStop = function onStop() {
      return dispatch({
        type: 'STOP'
      });
    };

    if (isActive) {
      addEventToBody('mousemove', onMove);
      addEventToBody('mouseup', onStop);
      return function () {
        removeEventFromBody('mousemove', onMove);
        removeEventFromBody('mouseup', onStop);
      };
    }
  };
};

var onStart = function onStart(state, action, callbacks) {
  var center = getClientCenter(state);
  var mouseAngle = calculateMouseAngle(_objectSpread({}, center, action));
  var position = calculatePositionFromMouseAngle(_objectSpread({
    previousMouseAngle: null,
    previousPercentage: null
  }, state, action, {
    mouseAngle: mouseAngle
  }));
  var value = getValueFromPercentage(_objectSpread({}, state, position));
  callbacks.onInteractiveChange(value);

  if (state.tracking) {
    callbacks.onChange(value);
  }

  return _objectSpread({}, state, {
    isActive: true
  }, position, center);
};

var onMove = function onMove(state, action, callbacks) {
  var mouseAngle = calculateMouseAngle(_objectSpread({}, state, action));
  var position = calculatePositionFromMouseAngle(_objectSpread({
    previousMouseAngle: state.mouseAngle,
    previousPercentage: state.percentage
  }, state, action, {
    mouseAngle: mouseAngle
  }));
  var value = getValueFromPercentage(_objectSpread({}, state, position));
  callbacks.onInteractiveChange(value);

  if (state.tracking) {
    callbacks.onChange(value);
  }

  return _objectSpread({}, state, position, {
    value: value
  });
};

var onChangeByStep = function onChangeByStep(state, action, callbacks) {
  var value = clamp(state.min, state.max, state.value + 1 * action.direction);
  callbacks.onChange(value);
  return _objectSpread({}, state, {
    value: value,
    percentage: getPercentageFromValue(_objectSpread({}, state, {
      value: value
    }))
  });
};

var reducer = function reducer(callbacks) {
  return function (state, action) {
    switch (action.type) {
      case 'START':
        callbacks.onMouseDown();
        return onStart(state, action, callbacks);

      case 'MOVE':
        return onMove(state, action, callbacks);

      case 'STOP':
        if (!state.tracking) {
          callbacks.onChange(state.value);
        }

        callbacks.onMouseUp();
        return _objectSpread({}, state, {
          isActive: false,
          value: state.value
        });

      case 'STEPS':
        return onChangeByStep(state, action, callbacks);

      default:
        return _objectSpread({}, state, {
          isActive: false,
          value: state.value
        });
    }
  };
};

var useUpdate = (function (_ref) {
  var min = _ref.min,
      max = _ref.max,
      multiRotation = _ref.multiRotation,
      initialValue = _ref.initialValue,
      _ref$angleOffset = _ref.angleOffset,
      angleOffset = _ref$angleOffset === void 0 ? 0 : _ref$angleOffset,
      _ref$angleRange = _ref.angleRange,
      angleRange = _ref$angleRange === void 0 ? 360 : _ref$angleRange,
      size = _ref.size,
      steps = _ref.steps,
      onChange = _ref.onChange,
      onInteractiveChange = _ref.onInteractiveChange,
      onMouseDown = _ref.onMouseDown,
      onMouseUp = _ref.onMouseUp,
      readOnly = _ref.readOnly,
      tracking = _ref.tracking,
      useMouseWheel = _ref.useMouseWheel;
  var svg = React.useRef();
  var container = React.useRef();

  var _useReducer = React.useReducer(reducer({
    onChange: onChange,
    onInteractiveChange: onInteractiveChange,
    onMouseDown: onMouseDown,
    onMouseUp: onMouseUp
  }), {
    isActive: false,
    min: min,
    max: max,
    multiRotation: multiRotation,
    angleOffset: angleOffset,
    angleRange: angleRange,
    mouseAngle: null,
    percentage: initialValue ? (initialValue - min) / (max - min) : 0,
    value: initialValue || 0,
    svg: svg,
    tracking: tracking,
    container: container,
    size: size
  }),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      _useReducer2$ = _useReducer2[0],
      percentage = _useReducer2$.percentage,
      value = _useReducer2$.value,
      angle = _useReducer2$.angle,
      isActive = _useReducer2$.isActive,
      dispatch = _useReducer2[1];

  if (!readOnly) {
    React.useEffect(function () {
      var div = container.current;
      var onStart = onMouseMoveStart(dispatch);
      var onWheel = useMouseWheel ? onScroll(dispatch) : null;
      div.addEventListener("mousedown", onStart);

      if (onWheel) {
        div.addEventListener("wheel", onWheel);
      }

      return function () {
        div.removeEventListener("mousedown", onStart);

        if (onWheel) {
          div.removeEventListener("wheel", onWheel);
        }
      };
    }, [useMouseWheel]);
  }

  React.useEffect(handleEventListener({
    dispatch: dispatch,
    isActive: isActive
  }), [isActive]);
  return {
    svg: svg,
    container: container,
    percentage: steps ? findClosest(steps, percentage) : percentage,
    value: value,
    angle: angle,
    onKeyDown: onKeyDown(dispatch)
  };
});

var pointOnCircle = function pointOnCircle(center, radius, angle) {
  return {
    x: center + radius * Math.cos(angle),
    y: center + radius * Math.sin(angle)
  };
};

var degTorad = function degTorad(deg) {
  return Math.PI * deg / 180;
};

var calcPath = function calcPath(_ref) {
  var percentage = _ref.percentage,
      angleOffset = _ref.angleOffset,
      angleRange = _ref.angleRange,
      arcWidth = _ref.arcWidth,
      outerRadius = _ref.radius,
      center = _ref.center;
  var angle = angleRange * percentage;
  var startAngle = angleOffset - 90;
  var innerRadius = outerRadius - arcWidth;
  var startAngleRad = degTorad(startAngle);
  var endAngleRad = degTorad(startAngle + angle);
  var largeArcFlag = angle < 180 ? 0 : 1;
  var p1 = pointOnCircle(center, outerRadius, endAngleRad);
  var p2 = pointOnCircle(center, outerRadius, startAngleRad);
  var p3 = pointOnCircle(center, innerRadius, startAngleRad);
  var p4 = pointOnCircle(center, innerRadius, endAngleRad);
  return "M".concat(p1.x, ",").concat(p1.y, " A").concat(outerRadius, ",").concat(outerRadius, " 0 ").concat(largeArcFlag, " 0 ").concat(p2.x, ",").concat(p2.y, "L").concat(p3.x, ",").concat(p3.y, " A").concat(innerRadius, ",").concat(innerRadius, " 0 ").concat(largeArcFlag, " 1 ").concat(p4.x, ",").concat(p4.y, " L").concat(p1.x, ",").concat(p1.y);
};

var Arc = function Arc(_ref2) {
  var color = _ref2.color,
      background = _ref2.background,
      props = _objectWithoutProperties(_ref2, ["color", "background"]);

  return React__default.createElement("g", null, background && React__default.createElement("path", {
    d: calcPath(_objectSpread({}, props, {
      percentage: 1
    })),
    style: {
      fill: background
    }
  }), React__default.createElement("path", {
    d: calcPath(props),
    style: {
      fill: color
    }
  }));
};

var Pointer = function Pointer(_ref) {
  var children = _ref.children,
      width = _ref.width,
      _ref$height = _ref.height,
      height = _ref$height === void 0 ? width : _ref$height,
      angleOffset = _ref.angleOffset,
      angleRange = _ref.angleRange,
      percentage = _ref.percentage,
      radius = _ref.radius,
      center = _ref.center,
      type = _ref.type,
      color = _ref.color,
      className = _ref.className;
  return React__default.createElement("g", {
    transform: "\n        rotate(".concat(angleOffset + angleRange * percentage, " ").concat(center, " ").concat(center, ")\n        translate( ").concat(center, " ").concat(center - radius - height, ")\n        ")
  }, children && React__default.Children.map(children, function (child) {
    return React__default.cloneElement(child, {
      width: width,
      height: height,
      percentage: percentage
    });
  }), type === 'rect' && React__default.createElement("rect", {
    x: -width * 0.5,
    width: width,
    height: height,
    fill: color,
    className: className
  }), type === 'circle' && React__default.createElement("circle", {
    r: width,
    fill: color,
    className: className
  }));
};

var renderCircle = function renderCircle(_ref) {
  var tickWidth = _ref.tickWidth,
      translateX = _ref.translateX,
      translateY = _ref.translateY,
      angleOffset = _ref.angleOffset,
      stepSize = _ref.stepSize,
      center = _ref.center,
      color = _ref.color,
      active = _ref.active,
      activeColor = _ref.activeColor,
      activeClassName = _ref.activeClassName,
      className = _ref.className;
  return function (_, i) {
    return React__default.createElement("circle", {
      r: tickWidth,
      key: i,
      className: i === active ? activeClassName : className,
      fill: i === active ? activeColor : color,
      stroke: "none",
      transform: "\n        rotate(".concat(angleOffset + stepSize * i, " ").concat(center, " ").concat(center, ") \n        translate(").concat(translateX, " ").concat(translateY, ")\n        ")
    });
  };
};

var renderRect = function renderRect(_ref2) {
  var tickWidth = _ref2.tickWidth,
      tickHeight = _ref2.tickHeight,
      translateX = _ref2.translateX,
      translateY = _ref2.translateY,
      angleOffset = _ref2.angleOffset,
      stepSize = _ref2.stepSize,
      center = _ref2.center,
      color = _ref2.color,
      active = _ref2.active,
      activeColor = _ref2.activeColor,
      activeClassName = _ref2.activeClassName,
      className = _ref2.className;
  return function (_, i) {
    return React__default.createElement("rect", {
      className: i === active ? activeClassName : className,
      fill: i === active ? activeColor : color,
      stroke: "none",
      width: tickWidth,
      height: tickHeight,
      key: i,
      transform: "\n        rotate(".concat(angleOffset + stepSize * i, " ").concat(center, " ").concat(center, ") \n        translate(").concat(translateX, " ").concat(translateY, ")\n        ")
    });
  };
};

var renderCustom = function renderCustom(_ref3) {
  var fn = _ref3.fn,
      props = _objectWithoutProperties(_ref3, ["fn"]);

  return function (_, i) {
    return fn(_objectSpread({}, props, {
      i: i
    }));
  };
};

var Scale = function Scale(_ref4) {
  var angleRange = _ref4.angleRange,
      steps = _ref4.steps,
      _ref4$type = _ref4.type,
      type = _ref4$type === void 0 ? 'rect' : _ref4$type,
      radius = _ref4.radius,
      tickWidth = _ref4.tickWidth,
      tickHeight = _ref4.tickHeight,
      angleOffset = _ref4.angleOffset,
      center = _ref4.center,
      color = _ref4.color,
      _ref4$activeColor = _ref4.activeColor,
      activeColor = _ref4$activeColor === void 0 ? color : _ref4$activeColor,
      className = _ref4.className,
      _ref4$activeClassName = _ref4.activeClassName,
      activeClassName = _ref4$activeClassName === void 0 ? className : _ref4$activeClassName,
      fn = _ref4.fn,
      percentage = _ref4.percentage;
  var stepSize = angleRange / steps;
  var length = steps + (angleRange === 360 ? 0 : 1);
  var translateX = center - tickWidth / 2;
  var translateY = center - radius;
  var active = Math.round((length - 1) * percentage);
  var renderFn = type === 'circle' ? renderCircle({
    tickWidth: tickWidth,
    translateX: translateX,
    translateY: translateY,
    center: center,
    angleOffset: angleOffset,
    stepSize: stepSize,
    color: color,
    active: active,
    activeColor: activeColor,
    className: className,
    activeClassName: activeClassName
  }) : type === 'rect' && !fn ? renderRect({
    tickWidth: tickWidth,
    tickHeight: tickHeight,
    translateX: translateX,
    translateY: translateY,
    angleOffset: angleOffset,
    stepSize: stepSize,
    center: center,
    color: color,
    active: active,
    activeColor: activeColor,
    className: className,
    activeClassName: activeClassName
  }) : renderCustom({
    fn: fn,
    tickWidth: tickWidth,
    tickHeight: tickHeight,
    translateX: translateX,
    translateY: translateY,
    angleOffset: angleOffset,
    stepSize: stepSize,
    center: center,
    color: color,
    active: active,
    activeColor: activeColor,
    className: className,
    activeClassName: activeClassName
  });
  return React__default.createElement("g", null, Array.from({
    length: length
  }, renderFn));
};

var Value = function Value(_ref) {
  var value = _ref.value,
      size = _ref.size,
      _ref$decimalPlace = _ref.decimalPlace,
      decimalPlace = _ref$decimalPlace === void 0 ? 0 : _ref$decimalPlace,
      className = _ref.className,
      _ref$marginBottom = _ref.marginBottom,
      marginBottom = _ref$marginBottom === void 0 ? 0 : _ref$marginBottom;
  return value == null ? null : React__default.createElement("text", {
    style: {
      userSelect: 'none'
    },
    x: "50%",
    textAnchor: "middle",
    className: className,
    y: size - marginBottom
  }, value.toFixed(decimalPlace));
};

var pointOnCircle$1 = function pointOnCircle(center, radius, angle) {
  return {
    x: center + radius * Math.cos(angle),
    y: center + radius * Math.sin(angle)
  };
};

var degTorad$1 = function degTorad(deg) {
  return Math.PI * deg / 180;
};

function ordered(v1, v2) {
  if (v1 <= v2) {
    return [v1, v2];
  } else {
    return [v2, v1];
  }
}

var calcPath$1 = function calcPath(_ref) {
  var percentageFrom = _ref.percentageFrom,
      percentageTo = _ref.percentageTo,
      angleOffset = _ref.angleOffset,
      angleRange = _ref.angleRange,
      arcWidth = _ref.arcWidth,
      outerRadius = _ref.radius,
      center = _ref.center;

  var _ordered = ordered(percentageFrom, percentageTo),
      _ordered2 = _slicedToArray(_ordered, 2),
      percentageMin = _ordered2[0],
      percentageMax = _ordered2[1];

  var angle = angleRange * (percentageMax - percentageMin);
  var startAngle = angleOffset - 90 + angleRange * percentageMin;
  var innerRadius = outerRadius - arcWidth;
  var startAngleRad = degTorad$1(startAngle);
  var endAngleRad = degTorad$1(startAngle + angle);
  var largeArcFlag = angle < 180 ? 0 : 1;
  var p1 = pointOnCircle$1(center, outerRadius, endAngleRad);
  var p2 = pointOnCircle$1(center, outerRadius, startAngleRad);
  var p3 = pointOnCircle$1(center, innerRadius, startAngleRad);
  var p4 = pointOnCircle$1(center, innerRadius, endAngleRad);
  return "M".concat(p1.x, ",").concat(p1.y, " A").concat(outerRadius, ",").concat(outerRadius, " 0 ").concat(largeArcFlag, " 0 ").concat(p2.x, ",").concat(p2.y, "L").concat(p3.x, ",").concat(p3.y, " A").concat(innerRadius, ",").concat(innerRadius, " 0 ").concat(largeArcFlag, " 1 ").concat(p4.x, ",").concat(p4.y, " L").concat(p1.x, ",").concat(p1.y);
};

var Range = function Range(_ref2) {
  var color = _ref2.color,
      _ref2$percentage = _ref2.percentage,
      percentage = _ref2$percentage === void 0 ? null : _ref2$percentage,
      _ref2$percentageFrom = _ref2.percentageFrom,
      percentageFrom = _ref2$percentageFrom === void 0 ? null : _ref2$percentageFrom,
      _ref2$percentageTo = _ref2.percentageTo,
      percentageTo = _ref2$percentageTo === void 0 ? null : _ref2$percentageTo,
      props = _objectWithoutProperties(_ref2, ["color", "percentage", "percentageFrom", "percentageTo"]);

  var pfrom, pto;

  if (percentageFrom !== null && percentageTo !== null) {
    pfrom = percentageFrom;
    pto = percentageTo;
  } else if (percentageFrom !== null) {
    pfrom = percentageFrom;
    pto = percentage;
  } else if (percentageTo !== null) {
    pfrom = percentage;
    pto = percentageTo;
  } else {
    pfrom = 0;
    pto = percentage;
  } // Clamp


  if (Math.abs(pto - pfrom) > 1) {
    pto = pfrom + 1;
  }

  var d = calcPath$1(_objectSpread({
    percentageFrom: pfrom,
    percentageTo: pto
  }, props));
  return React__default.createElement("g", null, React__default.createElement("path", {
    d: d,
    style: {
      fill: color
    }
  }));
};

var pointOnCircle$2 = function pointOnCircle(center, radius, angle) {
  return {
    x: center + radius * Math.cos(angle),
    y: center + radius * Math.sin(angle)
  };
};

var degTorad$2 = function degTorad(deg) {
  return Math.PI * deg / 180;
};

function ordered$1(v1, p1, v2, p2) {
  if (v1 <= v2) {
    return [v1, p1, v2, p2];
  } else {
    return [v2, p2, v1, p1];
  }
}

var calcPath$2 = function calcPath(_ref) {
  var percentageFrom = _ref.percentageFrom,
      percentageTo = _ref.percentageTo,
      angleOffset = _ref.angleOffset,
      angleRange = _ref.angleRange,
      arcWidth = _ref.arcWidth,
      outerRadiusFrom = _ref.outerRadiusFrom,
      outerRadiusTo = _ref.outerRadiusTo,
      center = _ref.center;

  var _ordered = ordered$1(percentageFrom, outerRadiusFrom, percentageTo, outerRadiusTo),
      _ordered2 = _slicedToArray(_ordered, 4),
      percentageMin = _ordered2[0],
      outerRadiusMin = _ordered2[1],
      percentageMax = _ordered2[2],
      outerRadiusMax = _ordered2[3];

  var angle = angleRange * (percentageMax - percentageMin);
  var startAngle = angleOffset - 90 + angleRange * percentageMin;
  var startAngleRad = degTorad$2(startAngle);
  var endAngleRad = degTorad$2(startAngle + angle);
  var nb = Math.ceil(percentageMax - percentageMin) * 4;
  var forth = "";
  var start = "";
  var back = "";
  var link = "";

  for (var i = 0; i <= nb; i++) {
    var coef = i / nb;
    var outerRadius = outerRadiusMin + (outerRadiusMax - outerRadiusMin) * coef;
    var innerRadius = outerRadius - arcWidth;
    var angleRad = startAngleRad + (endAngleRad - startAngleRad) * coef;
    var angleDeg = angleRad * 180 / Math.PI * coef;
    var po = pointOnCircle$2(center, outerRadius, angleRad);
    var pi = pointOnCircle$2(center, innerRadius, angleRad);

    if (i === 0) {
      start = "".concat(po.x, ",").concat(po.y, " ");
    } else {
      forth += "".concat(outerRadius, ",").concat(outerRadius, " ").concat(angleDeg, " 0 1 ").concat(po.x, ",").concat(po.y, " ");
    }

    if (i === nb) {
      link = "".concat(pi.x, ",").concat(pi.y, " ");
    } else {
      back = "".concat(innerRadius, ",").concat(innerRadius, " ").concat(angleDeg, " 0 0 ").concat(pi.x, ",").concat(pi.y, " ") + back;
    }
  }

  return "M ".concat(start, "A ").concat(forth, "L ").concat(link, "A ").concat(back, "z");
};

var Spiral = function Spiral(_ref2) {
  var color = _ref2.color,
      _ref2$percentage = _ref2.percentage,
      percentage = _ref2$percentage === void 0 ? null : _ref2$percentage,
      _ref2$percentageFrom = _ref2.percentageFrom,
      percentageFrom = _ref2$percentageFrom === void 0 ? null : _ref2$percentageFrom,
      _ref2$radiusFrom = _ref2.radiusFrom,
      radiusFrom = _ref2$radiusFrom === void 0 ? null : _ref2$radiusFrom,
      _ref2$percentageTo = _ref2.percentageTo,
      percentageTo = _ref2$percentageTo === void 0 ? null : _ref2$percentageTo,
      _ref2$radiusTo = _ref2.radiusTo,
      radiusTo = _ref2$radiusTo === void 0 ? null : _ref2$radiusTo,
      props = _objectWithoutProperties(_ref2, ["color", "percentage", "percentageFrom", "radiusFrom", "percentageTo", "radiusTo"]);

  var pfrom, pto;

  if (percentageFrom !== null && percentageTo !== null) {
    pfrom = percentageFrom;
    pto = percentageTo;
  } else if (percentageFrom !== null) {
    pfrom = percentageFrom;
    pto = percentage;
  } else if (percentageTo !== null) {
    pfrom = percentage;
    pto = percentageTo;
  } else {
    pfrom = 0;
    pto = percentage;
  }

  var d = calcPath$2(_objectSpread({
    percentageFrom: pfrom,
    percentageTo: pto,
    outerRadiusFrom: radiusFrom,
    outerRadiusTo: radiusTo
  }, props));
  return React__default.createElement("g", null, React__default.createElement("path", {
    d: d,
    style: {
      fill: color
    }
  }));
};

var stepsToSnapTo = function stepsToSnapTo(steps, snap) {
  return steps && snap ? Array.from({
    length: steps + 1
  }, function (_, i) {
    return 1 / steps * i;
  }) : undefined;
};

var isInternalComponent = function isInternalComponent(_ref) {
  var type = _ref.type;
  return type === Arc || type === Pointer || type === Scale || type === Value || type === Range || type === Spiral;
};

var Knob = function Knob(_ref2) {
  var min = _ref2.min,
      max = _ref2.max,
      initialValue = _ref2.value,
      _ref2$multiRotation = _ref2.multiRotation,
      multiRotation = _ref2$multiRotation === void 0 ? false : _ref2$multiRotation,
      _ref2$angleOffset = _ref2.angleOffset,
      angleOffset = _ref2$angleOffset === void 0 ? 0 : _ref2$angleOffset,
      _ref2$angleRange = _ref2.angleRange,
      angleRange = _ref2$angleRange === void 0 ? 360 : _ref2$angleRange,
      size = _ref2.size,
      _ref2$onChange = _ref2.onChange,
      onChange = _ref2$onChange === void 0 ? function () {} : _ref2$onChange,
      _ref2$onInteractiveCh = _ref2.onInteractiveChange,
      onInteractiveChange = _ref2$onInteractiveCh === void 0 ? function () {} : _ref2$onInteractiveCh,
      _ref2$onMouseDown = _ref2.onMouseDown,
      onMouseDown = _ref2$onMouseDown === void 0 ? function () {} : _ref2$onMouseDown,
      _ref2$onMouseUp = _ref2.onMouseUp,
      onMouseUp = _ref2$onMouseUp === void 0 ? function () {} : _ref2$onMouseUp,
      children = _ref2.children,
      steps = _ref2.steps,
      _ref2$snap = _ref2.snap,
      snap = _ref2$snap === void 0 ? false : _ref2$snap,
      _ref2$tracking = _ref2.tracking,
      tracking = _ref2$tracking === void 0 ? true : _ref2$tracking,
      _ref2$readOnly = _ref2.readOnly,
      readOnly = _ref2$readOnly === void 0 ? false : _ref2$readOnly,
      _ref2$useMouseWheel = _ref2.useMouseWheel,
      useMouseWheel = _ref2$useMouseWheel === void 0 ? true : _ref2$useMouseWheel,
      ariaValueText = _ref2.ariaValueText,
      ariaLabelledBy = _ref2.ariaLabelledBy,
      className = _ref2.className;

  var _useUpdate = useUpdate({
    min: min,
    max: max,
    multiRotation: multiRotation,
    initialValue: initialValue,
    angleOffset: angleOffset,
    angleRange: angleRange,
    size: size,
    steps: stepsToSnapTo(steps, snap),
    onChange: onChange,
    onInteractiveChange: onInteractiveChange,
    useMouseWheel: useMouseWheel,
    readOnly: readOnly,
    tracking: tracking,
    onMouseDown: onMouseDown,
    onMouseUp: onMouseUp
  }),
      percentage = _useUpdate.percentage,
      value = _useUpdate.value,
      svg = _useUpdate.svg,
      container = _useUpdate.container,
      onKeyDown = _useUpdate.onKeyDown;

  return React__default.createElement("div", {
    ref: container,
    tabIndex: "0",
    style: {
      outline: 'none',
      width: size,
      height: size
    },
    "aria-valuemax": max,
    "aria-valuemin": min,
    "aria-valuenow": value,
    "aria-valuetext": ariaValueText,
    "aria-labelledby": ariaLabelledBy,
    onKeyDown: readOnly ? null : onKeyDown,
    className: className
  }, React__default.createElement("svg", {
    width: size,
    height: size,
    ref: svg
  }, React__default.Children.map(children, function (child) {
    return isInternalComponent(child) ? React__default.cloneElement(child, _objectSpread({
      percentage: percentage,
      size: size,
      value: value,
      angleOffset: angleOffset,
      angleRange: angleRange,
      radius: size / 2,
      center: size / 2,
      steps: steps
    }, child.props)) : child;
  })));
};

exports.Knob = Knob;
exports.Arc = Arc;
exports.Scale = Scale;
exports.Pointer = Pointer;
exports.Value = Value;
exports.Range = Range;
exports.Spiral = Spiral;
