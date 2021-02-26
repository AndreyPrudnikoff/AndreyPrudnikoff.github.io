import React from 'react'
import { Link } from 'react-router-dom'
import imgPerson from '../../images/person x5F 3 1.png'

const Step3 = () => {
    return (
        <div className="step step3">
            <img className='step-img' src={imgPerson} alt='person'/>


            <div className='step-content'>
                <ul className='list-lines'>
                    <li className="list-lines__item" />
                    <li className="list-lines__item" />
                    <li className="list-lines__item" />
                    <li className="list-lines__item" />
                </ul>
                <h3 className='step-content__title'>Ваша ставка</h3>
                <p className='step-content__content'>Здесь вы можете сделать ставку<br/> и установить количество BTC</p>
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

export default Step3