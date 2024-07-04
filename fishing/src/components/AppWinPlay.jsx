import React, {useContext, useEffect, useMemo, useState} from 'react';
import cl from './winPlay.module.css'
import Layout, {Content, Footer, Header} from "antd/es/layout/layout.js";
import {Button} from "antd";
import SliderProgress from "./UI/slider.progress.jsx";
import ContentComponent from "./content/content.component.jsx";
import SlotFishComponent from "./slotFish/slotFish.component.jsx";
import {useAppContext} from "../context/AppContextProvider.jsx";
import SlotBasket from "./basket/slotBasket.jsx";
import SettingComponent from "./setting/setting.component.jsx";

const headerStyle = {
    textAlign: 'center',
    color: '#fff',
    height: 64,
    paddingInline: 48,
    lineHeight: '64px',
    background: 'none',
};

const contentStyle = {
    textAlign: 'center',
    minHeight: 120,
    lineHeight: '40rem',
    color: '#fff',
    background: 'none',
};

const footerStyle = {
    textAlign: 'center',
    color: '#fff',
    background: 'none',
};

const layoutStyle = {
    overflow: 'hidden',
    width: '100%',
    background: 'none',
};

const AppWinPlay = () => {
    const [cordS, setCordS] = useState(100)
    const [cordP, setCordP] = useState(100)
    const [show, setShow] = useState(false)
    const [showBas, setShowBas] = useState(false)
    const [showSetting, setShowSetting] = useState(false)
    const [newFish, setNewFish] = useState({})
    const [flagBtn, setFlagBtn] = useState(false)
    const [flagBtnAwait, setFlagAwait] = useState(false)
    const [flagStart, setFlagStart] = useState(false)
    const [flagPause, setFlagPause] = useState(false)

    const context = useAppContext();
    function randomInteger(min, max, def=1) {
        let rand = min + Math.random() * (max + 1 - min);
        if (rand == 0) rand = def;
        return Math.floor(rand);
    }
    function randomFloat(min, max) {
        let rand = min + Math.random() * (max + 1 - min);

        rand = rand.toFixed(3)
        return rand;
    }
    const hideShow = () => {
      setShow(!show)
    }
    const hideShowBas = () => {
        setShowBas(!showBas)
    }
    const hideShowSetting = () => {
        context.clearCash()
        setShowSetting(!showSetting)
    }
    const randFish = () => {
        let r = +(randomInteger(1, context.fish.length, 1))
        if (r === 0) r = 1;
        let myFish = context.fish[r-1]
        myFish.wed = +(randomFloat(myFish.min_wed, myFish.max_wed))
        myFish.price = Math.floor(myFish.price * myFish.wed)

        setNewFish(myFish)
    }
    const loseUdach = () => {
        setFlagAwait(false)
        setCordS(0)
        setCordP(100)
    }
    const startPlay = async () => {
        setFlagAwait(true)
        setCordS(50)
        setCordP(8)
        randFish()
        setTimeout(() => {
            if (!flagBtnAwait){
                setFlagAwait(false)
                setFlagStart(true)
            }
        }, +(randomInteger(5000, 10000, 5000)))
    }
    useMemo(() => {
        if (localStorage.getItem('price') || localStorage.getItem('sadok')){
            try {
                context.seterPrice(JSON.parse(localStorage.getItem('price')))
                //context.seterAllSadok(JSON.parse(localStorage.getItem('sadok')))
            }catch (e) {
                localStorage.getItem('price')
                localStorage.getItem('sadok')
            }
        }
    }, [])
    useEffect(() => {
        if (!flagBtn && flagStart) {
            if (cordS < 0){
                setFlagStart(false)
                setCordS(0)
                setCordP(100)
            }else {
                setCordS(p => p - ((newFish.wed / 10) * 2))
                if (cordP > 0){
                    setCordP( p => p - .02)
                }
            }
        }
        if (flagBtn && flagStart){
            if (cordS > 100){
                setFlagStart(false)
                setCordS(100)
                setCordP(100)
                setFlagBtn(false)
            }
            else {
                setCordS(p => p + ((newFish.wed / 10)))
                if (cordP < 110){
                    setCordP(p => p + .04)
                    if (cordP > 100) {
                        setFlagPause(true)
                        setFlagStart(false)
                        setShow(true)
                        setCordP(100)
                        setCordS(0)
                        setFlagBtn(false)
                    }
                }
            }
        }
    }, [cordS, flagBtn, flagStart])

    return (
        <div className={'container mt-5'}>
            <div className={cl.main_fon}>
                <Layout style={layoutStyle}>
                    <SlotFishComponent
                        nFish={newFish}
                        show={show}
                        hideShow={hideShow}
                    />
                    <SlotBasket
                        show={showBas}
                        hideShow={hideShowBas}
                    />
                    <SettingComponent
                        show={showSetting}
                        hideShow={hideShowSetting}
                    />
                    <Header style={headerStyle}>
                        <SliderProgress cord={cordS}/>
                    </Header>
                    <Content style={contentStyle}>
                        <ContentComponent
                            cordP={cordP}
                            cordSt={cordS}
                        />
                    </Content>
                    <Footer style={footerStyle}>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center'
                            }}
                        >
                            {(flagStart && !show && !flagBtnAwait) &&
                                <Button
                                    onMouseUp={() => {
                                        setFlagBtn(false)
                                    }}
                                    onMouseDown={() => {
                                        setFlagBtn(true)
                                    }}
                                    onMouseLeave={() => {
                                        setFlagBtn(false)
                                    }}
                                    size="large">
                                    тянуть
                                </Button>
                            }
                            {(flagBtnAwait) &&
                                <Button
                                    onClick={() => {
                                        loseUdach()
                                    }
                                    }
                                    size="large">
                                    вытащить
                                </Button>
                            }
                            {(!flagStart && !show && !flagBtnAwait) &&
                                <Button
                                    onClick={startPlay}
                                    size="large">
                                    закинуть
                                </Button>
                            }
                        </div>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}>
                            <Button
                                onClick={hideShowBas}
                            >Садок {context.sadok.length}</Button>
                            <div>
                                <Button>Магазин ${context.price}</Button>
                                <Button onClick={hideShowSetting}>Настройки</Button>
                            </div>

                        </div>
                    </Footer>
                </Layout>
            </div>
        </div>
    );
};

export default AppWinPlay;