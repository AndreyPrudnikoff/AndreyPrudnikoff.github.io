import React from 'react'
import imgPerson from '../../images/person x5F 3 1.png'
import imgArrowRight from '../../images/arrow-right.png';
import imgArrowLeft from '../../images/arrow-left.png';
import {switchStep} from '../../redux/actions/index';
import {switchView} from "../../redux/actions";
import {playClick} from '../../redux/actions/music';
import {connect} from 'react-redux';
import {EN} from '../../languages/en'
import {RU} from '../../languages/ru'

const Step3 = ({playClick, switchStep, currentLang, widthMode, switchView}) => {
    const LANG = currentLang === 'en' ? EN : RU;
    const isDesktop = widthMode === "desktop";
    if (!isDesktop) {
        switchView(false)
    }
    return (
        <div className="step step3">
            <img className='step-img' src={imgPerson} alt='person'/>


            <div className='step-content'>
                <ul className='list-lines'>
                    <li className="list-lines__item" />
                    <li className="list-lines__item" />
                    <li className="list-lines__item" />
                    <li className="list-lines__item" />
                    <li className="list-lines__item" />
                </ul>
                <h3 className='step-content__title'>{LANG.Intro.Step3.title}</h3>
                <p className='step-content__content'>{LANG.Intro.Step3.content}</p>
                <ul className="step-nav">
                    <li className='step-nav__item' onClick={() => {
                        switchStep(2);
                        playClick()
                    }}>
                        <span>{isDesktop ? LANG.Intro.btnIntro.prev : <img src={imgArrowLeft} alt='arrow-left'/>}</span>
                    </li>
                    <li className='step-nav__item step-nav_btnSkip' onClick={() => {
                        switchStep(0);
                        playClick()
                    }}>
                        <span>{LANG.Intro.btnIntro.skip}</span>
                    </li>
                    <li className='step-nav__item' onClick={() => {
                        switchStep(4);
                        playClick();
                    }}>
                        <span>{isDesktop ? LANG.Intro.btnIntro.next : <img src={imgArrowRight} alt='arrow-right'/>}</span>
                    </li>
                </ul>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Step3)
