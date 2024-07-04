import React from 'react';
import PoupupComponent from "../UI/poupup/poupup.component.jsx";
import {Button} from "antd";

const SettingComponent = ({show, hideShow}) => {
    const clearCash = () => {

    }

    return (
        <div>
            <PoupupComponent show={show}>
                <div>
                    <Button onClick={clearCash}>Сбросить прогресс</Button><br/>
                    <Button onClick={hideShow}>Вернутся в игру</Button>
                </div>
            </PoupupComponent>
        </div>
    );
};

export default SettingComponent;