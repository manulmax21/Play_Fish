import React, {useState} from 'react';
import cl from './slotFish.module.css';

import Card from 'react-bootstrap/Card';
import PoupupComponent from "../UI/poupup/poupup.component.jsx";
import {Button} from "antd";
import {useAppContext} from "../../context/AppContextProvider.jsx";
import CardComponent from "../card/card.component.jsx";

const SlotFishComponent = ({show, hideShow, nFish}) => {
    const [isShow, setIsShow] = useState(show)
    const context = useAppContext()
    const savePrice = () => {
        //setParsed(JSON.stringify(price))
        let parsed = JSON.stringify(context.price)
        localStorage.setItem('price', parsed)
    }
    const saveSadok = () => {
        //setParsed(JSON.stringify(sadok))
        let parsed = JSON.stringify(context.sadok)
        localStorage.setItem('sadok', parsed)
    }
    const hideIsShow = () => {
        setIsShow(p => !p)
        hideShow(show)
    }
    const basket = () => {
        console.log(context)
        context.seterSadok({...nFish, id: Date.now()})
        saveSadok()
    }
    const lose = () => {
        console.log(context)
        context.seterPrice(context.price + nFish.price)
        savePrice()
    }
    
    return (
        <PoupupComponent show={show}>
            <Card style={{ width: '18rem', background: 'none' }}>
                <Card.Img variant="top" src={`../../../public/${nFish.img}`} />
                <Card.Body>
                    <CardComponent nFish={nFish}/>
                    <Button
                        onClick={() => {
                            basket()
                            hideIsShow()
                        }}
                    >В садок</Button>
                    <Button
                        onClick={() => {
                            lose()
                            hideIsShow()
                        }}
                    >Продать</Button>
                </Card.Body>
            </Card>
        </PoupupComponent>
    );
};

export default SlotFishComponent;