import React from 'react'
import imgPerson from '../../images/person x1F 1 1.png'

const Step1 = () => {
    return (
        <div className="step step1">
            <img className='step-img' src={imgPerson} alt='person'/>
            <div className='step-content'>
                <ul className='list-lines'>
                    <li className="list-lines__item" />
                    <li className="list-lines__item" />
                    <li className="list-lines__item" />
                    <li className="list-lines__item" />
                </ul>
                <h3 className='step-content__title'>График</h3>
                <p className='step-content__content'>На графике вы можете наблюдать<br/> изменения цены BTC</p>
                <ul className="step-nav">
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

export default Step1
