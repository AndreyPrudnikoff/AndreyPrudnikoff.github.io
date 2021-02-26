import React from 'react'
import imgPerson from '../../images/person x5F 1 1.png'

const Step5 = () => {
    return (
        <div className="step5">
            <img src={imgPerson} alt='person'/>


            <div className='step-content'>
                <ul className='list-lines'>
                    <li className="list-lines__item"/>
                    <li className="list-lines__item"/>
                    <li className="list-lines__item"/>
                    <li className="list-lines__item"/>
                    <li className="list-lines__item"/>
                </ul>
                <h3>Приглашение друзей</h3>
                <p>Здесь вы можете пригласить своих друзей, чтобы повеселиться и заработать больше BTC</p>
                <ul className="step-nav">
                    <li className='step-nav__item'>
                        <button>Prev</button>
                    </li>
                    <li className='step-nav__item btnSkip'>
                        <button>Skip intro</button>
                    </li>
                    <li className='step-nav__item'>
                        <button>Finish</button>
                    </li>
                </ul>
            </div>
        </div>

    )
}

export default Step5
