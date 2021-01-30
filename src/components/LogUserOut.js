import Popup from './Popup';
import {GlobalStateContext} from '../App';
import {useContext} from 'react';

const LogUserOut = () => {
    const globalState = useContext(GlobalStateContext);

    return (
        <>
            {globalState.logUserOut ? <Popup message={"You were logged out due to inactivity"} close={() => globalState.setLogUserOut(false)} /> : null}
        </>
    )
}