import React from 'react'
import imgPerson from '../../images/person x1F 1 1.png'
import {switchStep} from '../../redux/actions/index'
import {playClick} from '../../redux/actions/music'
import {EN} from '../../languages/en'
import {RU} from '../../languages/ru'
import {connect} from 'react-redux'

const Step1 = ({switchStep, playClick, currentLang, widthMode}) => {
    const LANG = currentLang === 'en' ? EN : RU;
    const isDesktop = widthMode === "desktop" ? true : false;
    console.log(isDesktop)
    if(isDesktop) {
        return (
            <div className="step step1">
                <img className='step-img' src={imgPerson} alt='person'/>
                <div className='step-content'>
                    <ul className='list-lines'>
                        <li className="list-lines__item" />
                        <li className="list-lines__item" />
                        <li className="list-lines__item" />
                        <li className="list-lines__item" />
                        <li className="list-lines__item" />
                    </ul>
                    <h3 className='step-content__title'>{LANG.Intro.Step1.title}</h3>
                    <p className='step-content__content'>{LANG.Intro.Step1.content}</p>
                    <ul className="step-nav">
                        <li className='step-nav__item step-nav_btnSkip' onClick={() => {
                            switchStep(0);
                            playClick()
                        }}>
                            <span>{LANG.Intro.btnIntro.skip}</span>
                        </li>
                        <li className='step-nav__item' onClick={()=>{
                            switchStep(2);
                            playClick()
                        }}>
                            <span>{LANG.Intro.btnIntro.next}</span>
                        </li>
                    </ul>
                </div>
            </div>       
        )    
    } else {
        return (
            <div className="step step1">
                <div className='top-content'>
                    <img className='step-img' src={imgPerson} alt='person'/>
                        <ul className='list-lines'>
                            <li className="list-lines__item" />
                            <li className="list-lines__item" />
                            <li className="list-lines__item" />
                            <li className="list-lines__item" />
                            <li className="list-lines__item" />
                        </ul>
                </div>
                <div className='step-content'>
                    <h3 className='step-content__title'>{LANG.Intro.Step1.title}</h3>
                    <p className='step-content__content'>{LANG.Intro.Step1.content}</p>
                    <ul className="step-nav">
                        <li className='step-nav__item step-nav_btnSkip' onClick={() => {
                            switchStep(0);
                            playClick()
                        }}>
                            <span>{LANG.Intro.btnIntro.skip}</span>
                        </li>
                        <li className='step-nav__item' onClick={()=>{
                            switchStep(2);
                            playClick()
                        }}>
                            <span>{LANG.Intro.btnIntro.next}</span>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
    
}

const mapStateToProps = state => {
    return {
        currentLang: state.switchOptions.lang,
        widthMode: state.switchOptions.widthMode
    } 
}
const mapDispatchToProps = {
    switchStep,
    playClick
}

export default connect(mapStateToProps, mapDispatchToProps)(Step1)
