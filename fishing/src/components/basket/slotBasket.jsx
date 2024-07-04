import React, {useState} from 'react';
import cl from './slotBasket.module.css'
import {useAppContext} from "../../context/AppContextProvider.jsx";
import PoupupComponent from "../UI/poupup/poupup.component.jsx";
import CardComponent from "../card/card.component.jsx";
import Card from 'react-bootstrap/Card';
import {Button} from "antd";

const SlotBasket = ({show, hideShow}) => {
    const context = useAppContext()
   const hideIsShow = () => {
       hideShow(show)
   }
    const sole = (el) => {
        context.seterPrice(context.price + el.price)
        context.delElSadok(el.id)
    }
    return (
        <PoupupComponent show={show}>
            <Button
                onClick={hideIsShow}
            >Закрыть</Button>
            <div className={cl.cont}>
                <Card style={{ width: '18rem', background: 'none' }}>
                    <Card.Body>
                        {context.sadok.length && context.sadok.map(el =>
                            <div>
                                <Card.Img variant="top" src={`../../../public/${el.img}`} />
                                <CardComponent nFish={el}/>
                                <Button
                                    onClick={() => sole(el)}
                                >Продать</Button>
                            </div>
                        )}
                    </Card.Body>
                </Card>
                {!context.sadok.length &&
                    <p>В садке нет рыбы</p>
                }
            </div>
        </PoupupComponent>
    );
};

export default SlotBasket;