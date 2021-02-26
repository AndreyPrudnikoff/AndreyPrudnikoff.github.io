import React from 'react'
import { Link } from 'react-router-dom'
import imgPerson from '../../images/person x5F 2 1.png'

const Step2 = () => {
    return (
        <div className="step step2">
            <div className='step-content'>
                <ul className='list-lines'>
                    <li className="list-lines__item" />
                    <li className="list-lines__item" />
                    <li className="list-lines__item" />
                    <li className="list-lines__item" />
                </ul>
                <h3 className='step-content__title'>Банк</h3>
                <p className='step-content__content'>Здесь вы можете увидеть, сколько игроков делают ставки и сколько стоит банк</p>
                <ul className="step-nav">
                    <li className='step-nav__item'>
                        <span>Prev</span>
                    </li>
                    <li className='step-nav__item step-nav_btnSkip'>
                        <span>Skip intro</span>
                    </li>
                    <li className='step-nav__item'>
                        <span>Finish</span>
                    </li>
                </ul>
            </div>
            <img className='step-img' src={imgPerson} alt='person'/>
        </div>
            
    )
}

export default Step2