import Slider from './slider';

export default class VolumeSlider extends Slider {
  constructor() {
    super();
    this.onVolumeChange = this.onVolumeChange.bind(this);
  }

  setValue(value, applyToMedia = true) {
    super.setValue(value);
    const { media } = this.state;
    if (!media) {
      return;
    }
    if (applyToMedia) {
      media.volume = value;
    }
  }

  formatValue(value) {
    if (undefined === value) {
      return '';
    }
    return Math.floor(value * 100) + '%';
  }

  setMedia(media) {
    super.setMedia(media);
    this.setValue(media.volume, false);
    media.addEventListener('volumechange', this.onVolumeChange, false);
  }

  reset() {
    super.reset();
    const { media } = this.state;

    if (!media) {
      return;
    }
    media.removeEventListener('volumechange', this.onVolumeChange, false);
  }

  onVolumeChange(event) {
    this.setValue(event.currentTarget.volume, false);
  }
}