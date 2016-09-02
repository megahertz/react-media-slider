import ReactDOM from 'react-dom';

import Player from './player';

ReactDOM.render(
  <Player
    src="audio/jahzzar-siesta.mp3"
    author="Jahzzar"
    title="Siesta"
    authorUrl="http://freemusicarchive.org/music/Jahzzar/"
    titleUrl="http://freemusicarchive.org/music/Jahzzar/Travellers_Guide/Siesta"
    cover="audio/jahzzar-siesta.jpg"
  />,
  document.getElementById('app')
);