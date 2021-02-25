import React, {useRef, useEffect} from 'react';
import {connect} from "react-redux";
import {stop} from '../redux/actions/music';

const Sound = ({play, param, stop, mute}) => {
    const audRef = useRef(null);
    const handlePlay = () => {
        audRef.current.play();
    }
    const muted = () => {
        audRef.current.muted = !mute;
    }
    useEffect(() => {
        if (param.id === play) {
            audRef.current.id === 'fireworks' ? audRef.current.volume = 0.3 : audRef.current.volume = 0.7;
            audRef.current.id === 'timer' ? audRef.current.playbackRate = 1.17 : audRef.current.playbackRate = 1.0;
            handlePlay();
        }
        stop();
    }, [param.id, play, handlePlay]);
    useEffect(() => {
        muted();
    }, [muted]);
    return (
        <div className="sound">
            <audio ref={audRef} id={param.id} src={param.effect}/>
        </div>
    );
};
const mapStateToProps = state => {
    return {
        play: state.soundReducer.play,
        mute: state.soundReducer.mute
    }
}
const mapDispatchToProps = {
    stop
}

export default connect(mapStateToProps, mapDispatchToProps)(Sound);
