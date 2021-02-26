import React from 'react'
import { Link } from 'react-router-dom'
import imgPerson from '../../images/person x4F 4 1.png'
import {switchStep} from '../../redux/actions/index';
import {playClick} from '../../redux/actions/music';
import {connect} from 'react-redux';
import {EN} from '../../languages/en'
import {RU} from '../../languages/ru'

const Step4 = ({playClick, switchStep, currentLang}) => {
    const LANG = currentLang === 'en' ? EN : RU;
    return (
        <div className="step step4">
            <img className='step-img' src={imgPerson} alt='person'/>


            <div className='step-content'>
                <ul className='list-lines'>
                    <li className="list-lines__item" />
                    <li className="list-lines__item" />
                    <li className="list-lines__item" />
                    <li className="list-lines__item" />
                    <li className="list-lines__item" />
                </ul>
                <h3 className='step-content__title'>{LANG.Intro.Step4.title}</h3>
                <p className='step-content__content'>{LANG.Intro.Step4.content}</p>
                <ul className="step-nav">
                    <li className='step-nav__item' onClick={() => {
                        switchStep(3);
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
                        switchStep(5);
                        playClick()
                    }}>
                        <span>{LANG.Intro.btnIntro.next}</span>
                    </li>
                </ul>
            </div>
        </div>
            
    )
}

const mapStateToProps = state => {
    return {
        currentLang: state.switchOptions.lang
    } 
}

const mapDispatchToProps = {
    switchStep,
    playClick
}

export default connect(mapStateToProps, mapDispatchToProps)(Step4)