# react-media-slider
# WARNING: it's not ready for production yet

## Description

React Slider for HTML5 audio and video


## Installation

Install with [npm](https://npmjs.org/package/react-media-slider):

    npm install react-media-slider

## Usage

```jsx
import { PlaybackSlider, VolumeSlider } from 'react-media-slider';

… 

render() {
  // Get HTMLAudioElement
  const { audio } = this.state;
  return (
    … 
    <PlaybackSlider media={audio} />
    … 
    <VolumeSlider media={audio} />
    … 
  }
}

```
    
## License

Licensed under MIT.