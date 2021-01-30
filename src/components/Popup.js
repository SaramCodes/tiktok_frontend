import React from 'react';
import {FaTimes} from 'react-icons/fa';
import {TiTick} from 'react-icons/ti';

const Popup = ({message, close}) => {
    return(
        <div className="popup-overlay" onClick={close}>
            <div className="popup">
                <div className="popup-top">
                    <span onClick={close}><FaTimes/></span>
                </div>
                <div className="popup-main">
                    <h3>{message}</h3>
                    <span><TiTick /></span>
                </div>
            </div>
        </div>
    )
}

export default Popup;