import React from 'react'
import '../css/Popup.css';
import BasicForm from './BasicForm';
import BasicFormEdit from './BasicFormEdit';

function Popup({trigger, popupType,userInEdit}) {
    if(trigger){
        if(popupType === "create"){
            return (
                <div className='popup'>
                  <div className='popup-inner'>
                    <BasicForm userInEdit={userInEdit}/>
                  </div>
                </div>
              )
        }
        else{
            return(
                <div className='popup'>
                  <div className='popup-inner'>
                    <BasicFormEdit />
                  </div>
                </div>
            )
        }

    }else{
        return(
            <div></div>
        )
    }

}

export default Popup
