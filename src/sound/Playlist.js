import React from 'react';
// import click from './click.wav';
// import money from './money.mp3';
// import bell from './bell.mp3';
// import tic from './tic.mp3';
// import clack from './clack.mp3';
import timer from './gameTimer.ogg'
import transition from './transition.ogg';
import start_win from './start_win.mp3'
import success from './success.mp3';
import click from './click.mp3';
import timer2 from './betTimer.ogg';
import add_to_wallet from './add_to_wallet.mp3';
import you_lose from './you_lose.mp3';
import up_down from './up_down.mp3';
import fireworks from './fireworks.mp3';
import Sound from "./Sound";
import {connect} from "react-redux";

const Playlist = ({betTimer, gameTimer}) => {
    return (
        <div>
            {/*<Sound param={{id: 'click', effect: click}}/>*/}
            {/*<Sound param={{id: 'clack', effect: clack}}/>*/}
            {/*<Sound param={{id: 'money', effect: money}}/>*/}
            {/*<Sound param={{id: 'bell', effect: bell}}/>*/}
            {betTimer ? <Sound param={{id: 'timer2', effect: timer2}}/> : null}
            <Sound param={{id: 'transition', effect: transition}}/>
            <Sound param={{id: 'start_win', effect: start_win}}/>
            <Sound param={{id: 'success', effect: success}}/>
            <Sound param={{id: 'click', effect: click}}/>
            {gameTimer ? <Sound param={{id: 'timer', effect: timer}}/> : null}
            <Sound param={{id: 'add_to_wallet', effect: add_to_wallet}}/>
            <Sound param={{id: 'you_lose', effect: you_lose}}/>
            <Sound param={{id: 'up_down', effect: up_down}}/>
            <Sound param={{id: 'fireworks', effect: fireworks}}/>
        </div>
    );
};
const mapStateToProps = state => {
    return {
        betTimer: state.soundReducer.bet,
        gameTimer: state.soundReducer.game,
    }
}
const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);
