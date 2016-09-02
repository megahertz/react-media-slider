import { Component, PropTypes } from 'react';
import defaultStyles from './style.css';

export default class Slider extends Component {
  static propTypes = {
    style:       PropTypes.object,
    media:       PropTypes.object,
    disableHint: PropTypes.bool
  };

  constructor() {
    super();

    this.state = {
      isHovered: false,
      isSliding: false,
      value: 0,
      media: null
    };

    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp   = this.onMouseUp.bind(this);
  }

  componentWillReceiveProps(props) {
    this.applyStyle();
    if (props.media) {
      this.reset();
      this.setMedia(props.media);
    }
  }

  componentWillMount() {
    this.applyStyle();

    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);

    if (this.props.media && !this.state.media) {
      this.setMedia(this.props.media);
    }

    if (this.props.disableHint || !isPointerEventsSupported()) {
      this.setState({ disableHint: true });
    }
  }

  componentWillUnmount() {
    this.reset();
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  }

  reset() {
    this.setState({
      isHovered: false,
      isSliding: false,
      value: 0,
      media: null
    });
  }

  setMedia(media) {
    this.reset();
    this.setState({ media });
  }

  setValue(value) {
    this.setState({ value });
  }

  formatValue(value) {
    return Math.round(value * 100) / 100;
  }

  onMouseEnter(event) {
    if (!event.buttons) {
      this.setState({ isHovered: true });
    }
  }

  onMouseLeave() {
    this.setState({ isHovered: false });
  }

  onMouseDown(event) {
    event.preventDefault();
    this.setState({ isSliding: true });
    this.onMouseMove(event, true);
  }

  onMouseMove(event, force = false) {
    const { isHovered, isSliding } = this.state;

    if (!isHovered && !isSliding && !force) {
      return;
    }

    const { sliderBody } = this.refs;
    let internalPosition = Math.max(event.clientX - offsetLeft(sliderBody), 0);
    internalPosition = Math.min(internalPosition, sliderBody.offsetWidth);

    const cursorValue = internalPosition / sliderBody.offsetWidth;
    this.setState({ cursorValue });
    if (isSliding || force) {
      this.setValue(cursorValue);
    }
  }

  onMouseUp() {
    const { isSliding } = this.state;
    if (!isSliding) {
      return;
    }
    this.state.isSliding = false;
  }

  render() {
    const { isHovered, isSliding, value, style } = this.state;
    const showHandle = isHovered || isSliding;

    const progressStyle = {
      ...style.progress,
      width: Math.floor(value * 100) + '%'
    };

    return (
      <div style={style.container}
           onMouseDown={::this.onMouseDown}
           onMouseEnter={::this.onMouseEnter}
           onMouseLeave={::this.onMouseLeave}>
        {this.renderHint()}
        <div style={style.body} ref="sliderBody">
          {this.renderInternal()}
          <div style={progressStyle}>
            <a style={ showHandle ? style.handleHovered : style.handle } />
          </div>
        </div>
      </div>
    );
  }

  renderHint() {
    const { isHovered, isSliding, style, cursorValue, disableHint } = this.state;
    if (disableHint) {
      return null;
    }

    const showHandle = isHovered || isSliding;

    const hintStyle = {
      ...(showHandle ? style.hintHovered : style.hint),
      left: Math.floor(cursorValue * 100) + '%'
    };

    return (
      <div style={hintStyle}>{this.formatValue(cursorValue)}
        <div style={style.hintArrow}></div>
      </div>
    );
  }

  renderInternal() {
    return null;
  }

  applyStyle() {
    const style = this.props.style || {};
    const def = defaultStyles;
    this.state.style = Object.keys(def).reduce((result, key) => {
      result[key] = capitalizeVendorPrefix({ ...def[key], ...style[key] });
      return result;
    }, {});
  }
}

/**
 * Return element left offset on a page
 * @param {HTMLElement} element
 * @returns {number}
 */
function offsetLeft(element) {
  return element ? element.offsetLeft + offsetLeft(element.offsetParent) : 0;
}

function isPointerEventsSupported() {
  // We cannot check pointer-events support in IE9 and 10 by another way
  return !(document.documentMode < 11);
}

/**
 * Capitalize the first char of vendor prefix
 * @param {Object} styleObject
 * @returns {Object}
 */
function capitalizeVendorPrefix(styleObject) {
  return Object.keys(styleObject).reduce((result, key) => {
    let newKey = key;
    if (key.startsWith('webkit') || key.startsWith('moz') || key.startsWith('ms')) {
      newKey = newKey.charAt(0).toUpperCase() + newKey.substring(1);
    }
    result[newKey] = styleObject[key];
    return result;
  }, {});
}