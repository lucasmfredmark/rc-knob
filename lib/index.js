'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);

    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }

    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

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

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
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
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
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

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var clamp = function clamp(min, max, value) {
  return Math.max(min, Math.min(max, value));
};
var calculatePercentageFromMouseAngle = function calculatePercentageFromMouseAngle(_ref) {
  var mouseAngle = _ref.mouseAngle,
      angleOffset = _ref.angleOffset,
      angleRange = _ref.angleRange;
  var rangle = (mouseAngle - (angleOffset + angleRange * 0.5) + 900) % 360 - 180;
  var percentage = 0.5 + rangle / angleRange;
  return clamp(0, 1, percentage);
};
var calculatePositionFromMouseAngle = function calculatePositionFromMouseAngle(_ref2) {
  var mouseAngle = _ref2.mouseAngle,
      multiRotation = _ref2.multiRotation,
      angleOffset = _ref2.angleOffset,
      angleRange = _ref2.angleRange,
      percentage = _ref2.percentage,
      previousPercentage = _ref2.previousPercentage,
      previousMouseAngle = _ref2.previousMouseAngle;

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
      var theoricalMouseAngle = newPercentage < 0 ? angleOffset : (angleOffset + angleRange + 720) % 360;
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
var snapPosition = function snapPosition(position, state, steps) {
  if (!position.updated || !steps) {
    return position;
  }

  var percentage = snapPercentage(position.percentage, steps);
  var mouseAngle = (state.angleOffset + state.angleRange * percentage) % 360;
  return _objectSpread2(_objectSpread2({}, position), {}, {
    percentage: percentage,
    mouseAngle: mouseAngle < 0 ? mouseAngle + 360 : mouseAngle
  });
};
var snapPercentage = function snapPercentage(percentage, nbIntervals) {
  if (percentage === 0) return 0;
  var sign = Math.sign(percentage);
  var p = Math.abs(percentage);
  var stepSize = 1 / nbIntervals;
  var extra = (p + stepSize * 0.5) % stepSize;
  return sign * (p - stepSize * 0.5) + sign * (stepSize - extra);
};
var getValueFromPercentage = function getValueFromPercentage(_ref3) {
  var min = _ref3.min,
      max = _ref3.max,
      percentage = _ref3.percentage;
  return min + (max - min) * percentage;
};
var getPercentageFromValue = function getPercentageFromValue(_ref4) {
  var min = _ref4.min,
      max = _ref4.max,
      value = _ref4.value;
  return (value - min) / (max - min);
};

var DIRECTIONS = {
  37: -1,
  38: 1,
  39: 1,
  40: -1
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

var getClientCenter = function getClientCenter(elem) {
  var rect = elem.getBoundingClientRect();
  return {
    centerX: rect.x + elem.clientWidth / 2,
    centerY: rect.y + elem.clientHeight / 2
  };
};
/**
 * Compute mouse position relative to the elem center
 * and a polar position with angle in degree and radius
 */


var getMousePosition = function getMousePosition(elem, e) {
  var _getClientCenter = getClientCenter(elem),
      centerX = _getClientCenter.centerX,
      centerY = _getClientCenter.centerY;

  var mouseX = e.clientX - centerX;
  var mouseY = e.clientY - centerY;
  var degree = Math.atan2(mouseY, mouseX) * 180 / Math.PI + 90;
  var mouseAngle = degree < 0 ? degree + 360 : degree;
  var mouseRadius = Math.sqrt(mouseX * mouseX + mouseY * mouseY);
  return {
    mouseX: mouseX,
    mouseY: mouseY,
    mouseRadius: mouseRadius,
    mouseAngle: mouseAngle
  };
};

var handleEventListener = function handleEventListener(_ref) {
  var container = _ref.container,
      dispatch = _ref.dispatch,
      readOnly = _ref.readOnly,
      useMouseWheel = _ref.useMouseWheel,
      interactiveHook = _ref.interactiveHook;
  return function () {
    if (readOnly) {
      return;
    }

    var div = container.current;
    var events = Object();

    var getInteractiveConfig = function getInteractiveConfig(mousePosition, e) {
      var userConfig = {};

      if (interactiveHook) {
        var event = _objectSpread2({
          ctrlKey: e.ctrlKey,
          altKey: e.altKey,
          metaKey: e.metaKey,
          shiftKey: e.shiftKey
        }, mousePosition);

        userConfig = interactiveHook(event);
      }

      return userConfig;
    };

    var onStart = function onStart(e) {
      if (e.pointerType === "mouse" && e.button !== 0) {
        return;
      }

      var mousePosition = getMousePosition(div, e);
      var userConfig = getInteractiveConfig(mousePosition, e);

      if (userConfig.readOnly) {
        return;
      }

      e.preventDefault();
      e.stopPropagation();

      if (window.PointerEvent) {
        events.capturedPointerId = e.pointerId;
        div.setPointerCapture(events.capturedPointerId);
        div.addEventListener('pointermove', onMove);
        div.addEventListener('pointerup', onStop);
        div.addEventListener('pointercancel', onCancel);
      } else {
        // fallback with mouse event
        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseup', onStop);
        events.capturedWindow = true;
      }

      div.addEventListener('contextmenu', onContextMenu);
      events.capturedContextMenu = true;
      dispatch(_objectSpread2(_objectSpread2({
        type: 'START'
      }, mousePosition), userConfig));
    };

    var clearCapture = function clearCapture() {
      if (events.capturedPointerId !== undefined) {
        div.releasePointerCapture(events.capturedPointerId);
        div.removeEventListener('pointermove', onMove);
        div.removeEventListener('pointerup', onStop);
        div.removeEventListener('pointercancel', onCancel);
        events.capturedPointerId = undefined;
      }

      if (events.capturedWindow) {
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('mouseup', onStop);
        events.capturedWindow = false;
      }

      if (events.capturedContextMenu) {
        div.removeEventListener('contextmenu', onContextMenu);
        events.capturedContextMenu = false;
      }
    };

    var onMove = function onMove(e) {
      e.preventDefault();
      e.stopPropagation();
      var mousePosition = getMousePosition(div, e);
      var userConfig = getInteractiveConfig(mousePosition, e);

      if (userConfig.readOnly) {
        return;
      }

      dispatch(_objectSpread2(_objectSpread2({
        type: 'MOVE'
      }, mousePosition), userConfig));
    };

    var onStop = function onStop() {
      clearCapture();
      dispatch({
        type: 'STOP'
      });
    };

    var onCancel = function onCancel() {
      clearCapture();
      dispatch({
        type: 'CANCEL'
      });
    };

    var onContextMenu = function onContextMenu(e) {
      e.preventDefault();
      e.stopPropagation();
      clearCapture();
      dispatch({
        type: 'CANCEL'
      });
      return false;
    };

    var onWheel = useMouseWheel ? onScroll(dispatch) : null;
    var eventdown = window.PointerEvent ? "pointerdown" : "mousedown";
    div.addEventListener(eventdown, onStart);

    if (onWheel) {
      div.addEventListener("wheel", onWheel);
    }

    return function () {
      clearCapture();
      div.removeEventListener(eventdown, onStart);

      if (onWheel) {
        div.removeEventListener("wheel", onWheel);
      }
    };
  };
};

var reduceOnStart = function reduceOnStart(state, action, callbacks) {
  var position = calculatePositionFromMouseAngle(_objectSpread2(_objectSpread2({
    previousMouseAngle: null,
    previousPercentage: null
  }, state), action));
  var steps = action.steps || state.steps;
  var position2 = snapPosition(position, state, steps);
  var value = getValueFromPercentage(_objectSpread2(_objectSpread2({}, state), position2));
  callbacks.onStart();
  callbacks.onInteractiveChange(value);

  if (state.tracking) {
    callbacks.onChange(value);
  }

  return _objectSpread2(_objectSpread2(_objectSpread2({}, state), {}, {
    isActive: true
  }, position2), {}, {
    startPercentage: state.percentage,
    startValue: state.value,
    value: value
  });
};

var reduceOnMove = function reduceOnMove(state, action, callbacks) {
  var position = calculatePositionFromMouseAngle(_objectSpread2(_objectSpread2({
    previousMouseAngle: state.mouseAngle,
    previousPercentage: state.percentage
  }, state), action));
  var steps = action.steps || state.steps;
  var position2 = snapPosition(position, state, steps);
  var value = getValueFromPercentage(_objectSpread2(_objectSpread2({}, state), position2));
  callbacks.onInteractiveChange(value);

  if (state.tracking) {
    callbacks.onChange(value);
  }

  return _objectSpread2(_objectSpread2(_objectSpread2({}, state), position2), {}, {
    value: value
  });
};

var reduceOnStop = function reduceOnStop(state, action, callbacks) {
  if (!state.tracking) {
    callbacks.onChange(state.value);
  }

  callbacks.onEnd();
  return _objectSpread2(_objectSpread2({}, state), {}, {
    isActive: false,
    value: state.value,
    percentage: state.percentage,
    startPercentage: undefined,
    startValue: undefined
  });
};

var reduceOnCancel = function reduceOnCancel(state, action, callbacks) {
  var percentage = state.startPercentage;
  var value = state.startValue;
  callbacks.onEnd();

  if (state.tracking) {
    callbacks.onChange(value);
  }

  return _objectSpread2(_objectSpread2({}, state), {}, {
    isActive: false,
    value: value,
    percentage: percentage,
    startPercentage: undefined,
    startValue: undefined
  });
};

var reduceOnSteps = function reduceOnSteps(state, action, callbacks) {
  var value = clamp(state.min, state.max, state.value + 1 * action.direction);
  callbacks.onChange(value);
  return _objectSpread2(_objectSpread2({}, state), {}, {
    value: value,
    percentage: getPercentageFromValue(_objectSpread2(_objectSpread2({}, state), {}, {
      value: value
    }))
  });
};

var reducer = function reducer(callbacks) {
  return function (state, action) {
    switch (action.type) {
      case 'START':
        return reduceOnStart(state, action, callbacks);

      case 'MOVE':
        return reduceOnMove(state, action, callbacks);

      case 'STOP':
        return reduceOnStop(state, action, callbacks);

      case 'CANCEL':
        return reduceOnCancel(state, action, callbacks);

      case 'STEPS':
        return reduceOnSteps(state, action, callbacks);

      default:
        return _objectSpread2(_objectSpread2({}, state), {}, {
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
      _ref$initialValue = _ref.initialValue,
      initialValue = _ref$initialValue === void 0 ? 0 : _ref$initialValue,
      _ref$angleOffset = _ref.angleOffset,
      angleOffset = _ref$angleOffset === void 0 ? 0 : _ref$angleOffset,
      _ref$angleRange = _ref.angleRange,
      angleRange = _ref$angleRange === void 0 ? 360 : _ref$angleRange,
      size = _ref.size,
      steps = _ref.steps,
      onChange = _ref.onChange,
      onInteractiveChange = _ref.onInteractiveChange,
      interactiveHook = _ref.interactiveHook,
      onStart = _ref.onStart,
      onEnd = _ref.onEnd,
      readOnly = _ref.readOnly,
      tracking = _ref.tracking,
      useMouseWheel = _ref.useMouseWheel;
  var svg = React.useRef();
  var container = React.useRef();
  var callbacks = {
    onChange: onChange,
    onInteractiveChange: onInteractiveChange,
    onStart: onStart,
    onEnd: onEnd
  };

  var _useReducer = React.useReducer(reducer(callbacks), {
    isActive: false,
    min: min,
    max: max,
    multiRotation: multiRotation,
    angleOffset: angleOffset,
    angleRange: angleRange,
    mouseAngle: null,
    percentage: (initialValue - min) / (max - min),
    value: initialValue,
    svg: svg,
    tracking: tracking,
    container: container,
    size: size,
    steps: steps
  }),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      _useReducer2$ = _useReducer2[0],
      percentage = _useReducer2$.percentage,
      value = _useReducer2$.value,
      dispatch = _useReducer2[1];

  React.useEffect(handleEventListener({
    container: container,
    dispatch: dispatch,
    readOnly: readOnly,
    useMouseWheel: useMouseWheel,
    interactiveHook: interactiveHook
  }), [useMouseWheel, readOnly]);
  return {
    svg: svg,
    container: container,
    percentage: percentage,
    value: value,
    onKeyDown: onKeyDown(dispatch)
  };
});

var _excluded = ["color", "percentage", "percentageFrom", "percentageTo"];

var pointOnCircle = function pointOnCircle(center, radius, angle) {
  return {
    x: center + radius * Math.cos(angle),
    y: center + radius * Math.sin(angle)
  };
};

var degTorad = function degTorad(deg) {
  return Math.PI * deg / 180;
};

var clampDeg = function clampDeg(deg) {
  return deg >= 360 ? 359.999 : deg <= -360 ? -359.999 : deg;
};

var calcPath = function calcPath(_ref) {
  var percentageFrom = _ref.percentageFrom,
      percentageTo = _ref.percentageTo,
      angleOffset = _ref.angleOffset,
      angleRange = _ref.angleRange,
      arcWidth = _ref.arcWidth,
      outerRadius = _ref.radius,
      center = _ref.center;
  var angle = angleRange * (percentageTo - percentageFrom);
  var clampedAngle = clampDeg(angle);
  var angleFrom = angleOffset - 90 + angleRange * percentageFrom;
  var innerRadius = outerRadius - arcWidth;
  var angleFromRad = degTorad(angleFrom);
  var angleToRad = degTorad(angleFrom + clampedAngle);
  var largeArcFlag = Math.abs(clampedAngle) < 180 ? 0 : 1;
  var direction = clampedAngle >= 0 ? 1 : 0;
  var p1 = pointOnCircle(center, outerRadius, angleFromRad);
  var p2 = pointOnCircle(center, outerRadius, angleToRad);
  var p3 = pointOnCircle(center, innerRadius, angleToRad);
  var p4 = pointOnCircle(center, innerRadius, angleFromRad);
  return "M".concat(p1.x, ",").concat(p1.y, " A").concat(outerRadius, ",").concat(outerRadius, " 0 ").concat(largeArcFlag, " ").concat(direction, " ").concat(p2.x, ",").concat(p2.y, "L").concat(p3.x, ",").concat(p3.y, " A").concat(innerRadius, ",").concat(innerRadius, " 0 ").concat(largeArcFlag, " ").concat(1 - direction, " ").concat(p4.x, ",").concat(p4.y, " L").concat(p1.x, ",").concat(p1.y);
};

var Range = function Range(_ref2) {
  var color = _ref2.color,
      _ref2$percentage = _ref2.percentage,
      percentage = _ref2$percentage === void 0 ? null : _ref2$percentage,
      _ref2$percentageFrom = _ref2.percentageFrom,
      percentageFrom = _ref2$percentageFrom === void 0 ? null : _ref2$percentageFrom,
      _ref2$percentageTo = _ref2.percentageTo,
      percentageTo = _ref2$percentageTo === void 0 ? null : _ref2$percentageTo,
      props = _objectWithoutProperties(_ref2, _excluded);

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

  var d = calcPath(_objectSpread2({
    percentageFrom: pfrom,
    percentageTo: pto
  }, props));
  return /*#__PURE__*/React__default.createElement("g", null, /*#__PURE__*/React__default.createElement("path", {
    d: d,
    style: {
      fill: color
    }
  }));
};

var _excluded$1 = ["percentage", "color", "background"];
var Arc = function Arc(_ref) {
  var percentage = _ref.percentage,
      color = _ref.color,
      background = _ref.background,
      props = _objectWithoutProperties(_ref, _excluded$1);

  return /*#__PURE__*/React__default.createElement("g", null, background && /*#__PURE__*/React__default.createElement(Range, _extends({
    percentageFrom: percentage,
    percentageTo: 1,
    color: background
  }, props)), /*#__PURE__*/React__default.createElement(Range, _extends({
    percentageFrom: 0,
    percentageTo: percentage,
    color: color
  }, props)));
};

var PointerShape = function PointerShape(_ref) {
  var type = _ref.type,
      width = _ref.width,
      height = _ref.height,
      color = _ref.color,
      className = _ref.className;

  switch (type) {
    case 'rect':
      return /*#__PURE__*/React__default.createElement("rect", {
        x: -width * 0.5,
        width: width,
        height: height,
        fill: color,
        className: className
      });

    case 'circle':
      return /*#__PURE__*/React__default.createElement("circle", {
        r: width,
        fill: color,
        className: className
      });

    case 'triangle':
      var d = "M 0,0 L ".concat(width / 2, ",").concat(height, " L ").concat(-width / 2, ",").concat(height, " z");
      return /*#__PURE__*/React__default.createElement("path", {
        d: d,
        fill: color,
        className: className
      });
  }
};

var Pointer = function Pointer(_ref2) {
  var children = _ref2.children,
      width = _ref2.width,
      _ref2$height = _ref2.height,
      height = _ref2$height === void 0 ? width : _ref2$height,
      angleOffset = _ref2.angleOffset,
      angleRange = _ref2.angleRange,
      percentage = _ref2.percentage,
      _ref2$useRotation = _ref2.useRotation,
      useRotation = _ref2$useRotation === void 0 ? true : _ref2$useRotation,
      radius = _ref2.radius,
      center = _ref2.center,
      type = _ref2.type,
      color = _ref2.color,
      className = _ref2.className;
  var transform;

  if (useRotation) {
    transform = "rotate(".concat(angleOffset + angleRange * percentage, " ").concat(center, " ").concat(center, ")\n\t\t\t\t\ttranslate( ").concat(center, " ").concat(center - radius - height, ")");
  } else {
    var angle = (angleOffset + angleRange * percentage - 90) * Math.PI / 180;
    var x = center + radius * Math.cos(angle);
    var y = center + radius * Math.sin(angle);
    transform = "translate(".concat(x, " ").concat(y, ")");
  }

  return /*#__PURE__*/React__default.createElement("g", {
    transform: transform
  }, children && React__default.Children.map(children, function (child) {
    return /*#__PURE__*/React__default.cloneElement(child, {
      width: width || 0,
      height: height || 0,
      percentage: percentage
    });
  }), type && /*#__PURE__*/React__default.createElement(PointerShape, {
    type: type,
    width: width,
    height: height,
    color: color,
    className: className
  }));
};

var _excluded$2 = ["fn"];

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
    return /*#__PURE__*/React__default.createElement("circle", {
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
    return /*#__PURE__*/React__default.createElement("rect", {
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
      props = _objectWithoutProperties(_ref3, _excluded$2);

  return function (_, i) {
    return fn(_objectSpread2(_objectSpread2({}, props), {}, {
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
    activeClassName: activeClassName,
    steps: steps,
    percentage: percentage
  });
  return /*#__PURE__*/React__default.createElement("g", null, Array.from({
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

  if (value === null || value === undefined) {
    return null;
  }

  var label = value.toFixed(decimalPlace); // make sure no negative zero is displayed

  if (label.startsWith("-") && label == 0) {
    label = label.slice(1);
  }

  return /*#__PURE__*/React__default.createElement("text", {
    style: {
      userSelect: 'none'
    },
    x: "50%",
    textAnchor: "middle",
    className: className,
    y: size - marginBottom
  }, label);
};

var _excluded$3 = ["color", "percentage", "percentageFrom", "radiusFrom", "percentageTo", "radiusTo"];

var pointOnCircle$1 = function pointOnCircle(center, radius, angle) {
  return {
    x: center + radius * Math.cos(angle),
    y: center + radius * Math.sin(angle)
  };
};

var degTorad$1 = function degTorad(deg) {
  return Math.PI * deg / 180;
};

function ordered(v1, p1, v2, p2) {
  if (v1 <= v2) {
    return [v1, p1, v2, p2];
  } else {
    return [v2, p2, v1, p1];
  }
}

var calcPath$1 = function calcPath(_ref) {
  var percentageFrom = _ref.percentageFrom,
      percentageTo = _ref.percentageTo,
      angleOffset = _ref.angleOffset,
      angleRange = _ref.angleRange,
      arcWidth = _ref.arcWidth,
      outerRadiusFrom = _ref.outerRadiusFrom,
      outerRadiusTo = _ref.outerRadiusTo,
      center = _ref.center;

  var _ordered = ordered(percentageFrom, outerRadiusFrom, percentageTo, outerRadiusTo),
      _ordered2 = _slicedToArray(_ordered, 4),
      percentageMin = _ordered2[0],
      outerRadiusMin = _ordered2[1],
      percentageMax = _ordered2[2],
      outerRadiusMax = _ordered2[3];

  var angle = angleRange * (percentageMax - percentageMin);
  var startAngle = angleOffset - 90 + angleRange * percentageMin;
  var startAngleRad = degTorad$1(startAngle);
  var endAngleRad = degTorad$1(startAngle + angle);
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
    var po = pointOnCircle$1(center, outerRadius, angleRad);
    var pi = pointOnCircle$1(center, innerRadius, angleRad);

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
      props = _objectWithoutProperties(_ref2, _excluded$3);

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

  var d = calcPath$1(_objectSpread2({
    percentageFrom: pfrom,
    percentageTo: pto,
    outerRadiusFrom: radiusFrom,
    outerRadiusTo: radiusTo
  }, props));
  return /*#__PURE__*/React__default.createElement("g", null, /*#__PURE__*/React__default.createElement("path", {
    d: d,
    style: {
      fill: color
    }
  }));
};

var pointOnCircle$2 = function pointOnCircle(center, radius, angle) {
  var rad = angle * Math.PI / 180;
  return {
    x: center + radius * Math.cos(rad),
    y: center + radius * Math.sin(rad)
  };
};

var Label = function Label(_ref) {
  var label = _ref.label,
      angleRange = _ref.angleRange,
      angleOffset = _ref.angleOffset,
      percentage = _ref.percentage,
      center = _ref.center,
      _ref$radius = _ref.radius,
      radius = _ref$radius === void 0 ? 0 : _ref$radius,
      className = _ref.className,
      _ref$style = _ref.style,
      style = _ref$style === void 0 ? {} : _ref$style,
      _ref$userSelect = _ref.userSelect,
      userSelect = _ref$userSelect === void 0 ? "none" : _ref$userSelect;

  if (!label) {
    return null;
  }

  var angle = angleOffset + 90 + angleRange * percentage;
  var p = pointOnCircle$2(center, radius, angle);
  return /*#__PURE__*/React__default.createElement("g", {
    transform: "translate( ".concat(center - p.x, " ").concat(center - p.y, ")")
  }, /*#__PURE__*/React__default.createElement("text", _defineProperty({
    style: _objectSpread2({
      userSelect: userSelect
    }, style),
    x: "50%",
    y: "50%",
    textAnchor: "middle",
    className: className,
    dominantBaseline: "middle"
  }, "textAnchor", "middle"), label));
};

var isInternalComponent = function isInternalComponent(_ref) {
  var type = _ref.type;
  return type === Arc || type === Pointer || type === Scale || type === Value || type === Range || type === Spiral || type === Label;
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
      _ref2$interactiveHook = _ref2.interactiveHook,
      interactiveHook = _ref2$interactiveHook === void 0 ? undefined : _ref2$interactiveHook,
      _ref2$onStart = _ref2.onStart,
      onStart = _ref2$onStart === void 0 ? function () {} : _ref2$onStart,
      _ref2$onEnd = _ref2.onEnd,
      onEnd = _ref2$onEnd === void 0 ? function () {} : _ref2$onEnd,
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
    steps: snap ? steps : undefined,
    onChange: onChange,
    onInteractiveChange: onInteractiveChange,
    interactiveHook: interactiveHook,
    useMouseWheel: useMouseWheel,
    readOnly: readOnly,
    tracking: tracking,
    onStart: onStart,
    onEnd: onEnd
  }),
      percentage = _useUpdate.percentage,
      value = _useUpdate.value,
      svg = _useUpdate.svg,
      container = _useUpdate.container,
      onKeyDown = _useUpdate.onKeyDown;

  return /*#__PURE__*/React__default.createElement("div", {
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
  }, /*#__PURE__*/React__default.createElement("svg", {
    width: size,
    height: size,
    ref: svg
  }, React__default.Children.map(children, function (child) {
    return isInternalComponent(child) ? /*#__PURE__*/React__default.cloneElement(child, _objectSpread2({
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
exports.Label = Label;
