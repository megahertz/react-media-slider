import { Component, PropTypes } from 'react';

// noinspection NpmUsedModulesInstalled
import { ProgressSlider, VolumeSlider } from 'react-media-slider';

export default class Player extends Component {
  // noinspection JSUnusedGlobalSymbols
  static propTypes = {
    src:       PropTypes.string.isRequired,
    title:     PropTypes.string.isRequired,
    authorUrl: PropTypes.string.isRequired,
    titleUrl:  PropTypes.string.isRequired,
    cover:     PropTypes.string.isRequired
  };

  constructor() {
    super();
    this.state = {
      paused: true
    };

    this.onEnded = this.onEnded.bind(this);
  }

  componentDidMount() {
    const { audio, progressSlider, volumeSlider } = this.refs;
    progressSlider.setMedia(audio);
    volumeSlider.setMedia(audio);

    audio.addEventListener('ended', this.onEnded, false);
  }

  componentWillUnmount() {
    const { audio } = this.refs;
    audio.removeEventListener('ended', this.onEnded, false);
  }

  onEnded() {
    this.setState({ paused: true });
  }

  onPlayClick() {
    const { audio } = this.refs;
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
    const paused = audio.paused;
    this.setState({ paused });
  }

  render() {
    const { src, author, title, authorUrl, titleUrl, cover } = this.props;
    const { paused } = this.state;

    return (
      <div className="player">
        <audio id="audio" ref="audio">
          <source src={src}/>
        </audio>

        <img src={cover} width="60" height="60" alt="Cover" />
        <div className="body">
          <div className="info">
            <a
              className={ 'btn-play ' + (!paused ? 'playing' : '') }
              onClick={::this.onPlayClick}
            />
            <a href={authorUrl}>{author}</a>
            &nbsp;–&nbsp;
            <a href={titleUrl}>{title}</a>
          </div>
          <div className="controls">
            <ProgressSlider ref="progressSlider" />
            <div className="lbl-volume">🔊</div>
            <VolumeSlider ref="volumeSlider" />
          </div>
        </div>
      </div>
    );
  }
}