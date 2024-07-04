import React, {useMemo, useState} from 'react';
import cl from './content.module.css'

const ContentComponent = ({cordSt, cordP}) => {
    const [rot, setRot] = useState(0)
    const [posPop, setPosPop] = useState({
        top: '225px',
        left: '480px'
    })
    useMemo(() => {
        setPosPop({left: '480px', top: `${(cordP * 3) + 225}px`})
        setRot(cordSt/2)
    }, [cordSt])

    return (
        <div className={cl.main}>
            <div className={cl.playZone}>
                {cordP}
                {cordP < 99 &&
                    <div
                        style={posPop}
                        className={cl.pop}
                    />
                }
                <div
                    style={{transform: `rotate(${rot}deg)`}}
                    className={cl.udach}
                />
            </div>
        </div>
    );
};

export default ContentComponent;