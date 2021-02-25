import React from 'react';
// import click from './click.wav';
// import money from './money.mp3';
// import bell from './bell.mp3';
// import tic from './tic.mp3';
// import clack from './clack.mp3';
import fireworks from './fireworks.mp3';
import Sound from "./Sound";

const Playlist = () => {
    return (
        <div>
            {/*<Sound param={{id: 'click', effect: click}}/>*/}
            {/*<Sound param={{id: 'clack', effect: clack}}/>*/}
            {/*<Sound param={{id: 'money', effect: money}}/>*/}
            {/*<Sound param={{id: 'bell', effect: bell}}/>*/}
            {/*<Sound param={{id: 'tic', effect: tic}}/>*/}
            <Sound param={{id: 'fireworks', effect: fireworks}}/>
        </div>
    );
};

export default Playlist;
