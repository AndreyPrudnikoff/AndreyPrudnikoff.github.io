import React from 'react';
import "./auth.scss";
import {playClick} from "../../redux/actions/music";
import {connect} from 'react-redux'
import {EN} from "../../languages/en";
import {RU} from "../../languages/ru";

const styles = {
    backgroundColor: 'inherit',
    border: '1px solid #FFFFFF',
    borderRadius: '8px',
    height: '40px',
    padding: '10px',
}
const arrow = {
    position: 'absolute',
    fontSize: '24px',
    top: '8px',
    left: '30px',
    cursor: 'pointer'
}
const label = {
    marginRight: 'auto',
    marginBottom: '5px',
    opacity: 0.8
}
const Support = ({history, currentLang, playClick}) => {

    const LANG = currentLang === "en" ? EN : RU;
    return (
        <div className="blur">
            <form style={{width: '40%'}} className="round-dark win">
                <span onClick={() => {history.goBack(); playClick()}} style={arrow} className="back restore-arrow">&larr;</span>
                <div className="win-btn">
                    <h2 className={currentLang}>{LANG.Auth.Support.title}</h2>
                    <span className={currentLang} style={label}>{LANG.Auth.Support.writeQuestion}</span>
                    <input style={styles} type="text"/>
                    <button onClick={() => {
                        history.push('/');
                        playClick();
                        }} style={{width: '200px', margin: '30px auto'}} className={currentLang + " btn btn-primary"}>
                        {LANG.Auth.Support.send}
                    </button>
                </div>
            </form>
        </div>
    );
};


const mapStateToProps = state => {
    return {
        currentLang: state.switchOptions.lang
    }
}

const mapDispatchToProps = {
    playClick
}

export default connect(mapStateToProps, mapDispatchToProps)(Support);
