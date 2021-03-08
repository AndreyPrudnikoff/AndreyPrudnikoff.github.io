import React from 'react';
import imgPerson from '../../images/person x5F 2 1.png';
import {switchStep} from '../../redux/actions/index';
import {switchView} from "../../redux/actions";
import {playClick} from '../../redux/actions/music';
import {connect} from 'react-redux';
import {EN} from '../../languages/en'
import {RU} from '../../languages/ru'

const Step2 = ({switchStep, playClick, currentLang, switchView, widthMode}) => {
    const LANG = currentLang === 'en' ? EN : RU;
    const isDesktop = widthMode === "desktop";
    if (!isDesktop) {
        switchView(false)
    }
    return (
        <div className="step step2">
            <div className='step-content'>
                <ul className='list-lines'>
                    <li className="list-lines__item" />
                    <li className="list-lines__item" />
                    <li className="list-lines__item" />
                    <li className="list-lines__item" />
                    <li className="list-lines__item" />
                </ul>
                <h3 className='step-content__title'>{LANG.Intro.Step2.title}</h3>
                <p className='step-content__content'>{LANG.Intro.Step2.content}</p>
                <ul className="step-nav">
                    <li className='step-nav__item' onClick={() => {
                        switchStep(1);
                        playClick()
                    }}>
                        <span>{LANG.Intro.btnIntro.prev}</span>
                    </li>
                    <li className='step-nav__item step-nav_btnSkip' onClick={() => {
                        switchStep(0);
                        playClick()
                    }}>
                        <span>{LANG.Intro.btnIntro.skip}</span>
                    </li>
                    <li className='step-nav__item' onClick={() => {
                        switchStep(3);
                        playClick()
                    }}>
                        <span>{LANG.Intro.btnIntro.next}</span>
                    </li>
                </ul>
            </div>
            <img className='step-img' src={imgPerson} alt='person'/>
        </div>
            
    )
}
const mapStateToProps = state => {
    return {
        currentLang: state.switchOptions.lang,
        widthMode: state.switchOptions.widthMode
    }
}
const mapDispatchToProps = {
    switchStep,
    playClick,
    switchView
}
export default connect(mapStateToProps, mapDispatchToProps)(Step2)
