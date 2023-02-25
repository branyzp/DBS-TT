import React from 'react'
import '../css/Popup.css';
import BasicForm from './BasicForm';

function Popup({trigger}) {
    if(trigger){
        return (
            <div className='popup'>
              <div className='popup-inner'>
                <BasicForm/>
              </div>
            </div>
          )
    }else{
        return(
            <div></div>
        )
    }

}

export default Popup
