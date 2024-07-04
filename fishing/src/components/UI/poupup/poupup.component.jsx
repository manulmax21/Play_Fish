import React from 'react';
import cl from './poupup.module.css'

const PoupupComponent = ({children, show, hideShow}) => {
    if(show) {return (
        <div
            onClick={() => {
                hideShow()
            }}
            className={cl.dialog}
        >
            <div
                onClick={e => {
                    e.stopPropagation()
                }}
                className={cl.dialog__content}
            >
                {children}
            </div>
        </div>
    );}
};

export default PoupupComponent;