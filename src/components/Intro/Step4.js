import React from 'react'
import { Link } from 'react-router-dom'
import imgPerson from '../../images/person x4F 4 1.png'

const Step4 = () => {
    return (
        <div className="step step4">
            <img className='step-img' src={imgPerson} alt='person'/>


            <div className='step-content'>
                <ul className='list-lines'>
                    <li className="list-lines__item" />
                    <li className="list-lines__item" />
                    <li className="list-lines__item" />
                    <li className="list-lines__item" />
                </ul>
                <h3 className='step-content__title'>Кошелек</h3>
                <p className='step-content__content'>Здесь вы можете следить за своим балансом, менять кошелек с демо на настоящий, приглашать друзей, вносить и выводить BTC</p>
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

export default Step4