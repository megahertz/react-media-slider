import Slider from './slider';

export default class PlaybackSlider extends Slider {
  constructor() {
    super();
    this.state.progress = [];
    this.onTimeUpdate = this.onTimeUpdate.bind(this);
    this.onEnded      = this.onEnded.bind(this);
    this.onProgress   = this.onProgress.bind(this);
  }

  setValue(value, applyToMedia = false) {
    const { media } = this.state;
    if (!media) {
      return;
    }
    super.setValue(value);
    if (applyToMedia) {
      media.currentTime = media.duration * value;
    }
  }

  setMedia(media) {
    this.setValue(0, false);
    super.setMedia(media);

    media.addEventListener('ended', this.onEnded, false);
    media.addEventListener('progress', this.onProgress, false);
    media.addEventListener('timeupdate', this.onTimeUpdate, false);
  }

  reset() {
    const { media } = this.state;

    super.reset();
    this.state.progress = [];

    if (!media) {
      return;
    }

    media.removeEventListener('ended', this.onEnded, false);
    media.removeEventListener('progress', this.onProgress, false);
    media.removeEventListener('timeupdate', this.onTimeUpdate, false);
  }

  onTimeUpdate(event) {
    if (this.state.isSliding) {
      return;
    }
    const media = event.currentTarget;
    this.setValue(media.currentTime / media.duration, false);
  }

  onEnded() {
    this.setValue(0);
  }

  onProgress(event) {
    const media = event.currentTarget;
    const progress = [];
    const duration = media.duration;

    if (!media.buffered) {
      return;
    }

    for (let i = 0; i < media.buffered.length; i++) {
      let start = media.buffered.start(i) / duration;
      let end   = media.buffered.end(i) / duration;
      progress.push({
        left:  start * 100 + '%',
        width: (end - start) * 100 + '%'
      });
    }

    this.setState({ progress });
  }

  formatValue(value) {
    const { media } = this.state;
    if (!media) {
      return '';
    }

    const seconds = Math.floor(value * media.duration);
    if (!(seconds > -1)) {
      return '';
    }

    return new Date(seconds  * 1000)
      .toISOString()
      .substr(10, 9)
      .replace('T00:', '')
      .replace('T0', '')
      .replace('T', '');
  }

  onMouseUp() {
    if (!this.state.isSliding) {
      return;
    }
    super.onMouseUp();
    this.setValue(this.state.value, true);
  }

  renderInternal() {
    const { progress, style } = this.state;

    return (
      <div style={style.bufferedContainer}>
        {progress.map((buffer, i) => {
          return (
            <span key={i} style={{
              ...style.bufferedFragment,
              marginLeft: buffer.left,
              width: buffer.width }} />
          );
        })}
      </div>
    );
  }
}