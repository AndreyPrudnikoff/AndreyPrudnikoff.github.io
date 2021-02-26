import React from 'react'
import { Link } from 'react-router-dom'
import imgPerson from '../../images/person x5F 1 1.png'

const Step5 = () => {
    return (
        <div className="step step5">
            <img className='step-img' src={imgPerson} alt='person'/>


            <div className='step-content'>
                <ul className='list-lines'>
                    <li className="list-lines__item" />
                    <li className="list-lines__item" />
                    <li className="list-lines__item" />
                    <li className="list-lines__item" />
                    <li className="list-lines__item" />
                </ul>
                <h3 className='step-content__title'>Приглашение друзей</h3>
                <p className='step-content__content'>Здесь вы можете пригласить своих друзей, чтобы повеселиться и заработать больше BTC</p>
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
        </div>
            
    )
}

export default Step5