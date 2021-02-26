import React from 'react'
import { Link } from 'react-router-dom'
import imgPerson from '../../images/person x5F 1 1.png'

const Step5 = () => {
    console.log(imgPerson)
    return (
        <div className="step5">
            <img src={imgPerson} alt='person'/>


            <div className='step-content'>
                <ul className='list-lines'>
                    <li className="list-lines__item"></li>
                    <li className="list-lines__item"></li>
                    <li className="list-lines__item"></li>
                    <li className="list-lines__item"></li>
                    <li className="list-lines__item"></li>
                </ul>
                <h3>Приглашение друзей</h3>
                <p>Здесь вы можете пригласить своих друзей, чтобы повеселиться и заработать больше BTC</p>
                <ul className="step-nav">
                    <li className='step-nav__item'>
                        <Link>Prev</Link>
                    </li>
                    <li className='step-nav__item btnSkip'>
                        <Link>Skip intro</Link>
                    </li>
                    <li className='step-nav__item'>
                        <Link>Finish</Link>
                    </li>
                </ul>
            </div>
        </div>
            
    )
}

export default Step5