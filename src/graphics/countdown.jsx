import React from 'react';
import {render} from 'react-dom';
import bgUrl from 'url:./img/bg.png';
import logoUrl from 'url:./img/trylogia_logo.png';
import styled from 'styled-components';
import * as style from './css/styles.css';
import { useReplicant } from 'use-nodecg';
import Marquee from 'react-fast-marquee';

const BGImg = styled.img`
    width: 100%;
    margin-top: 45px;
    z-index: -1;`

const GSPSLogo = styled.img`
    position: absolute;
    top: 60px;
    left: 680px;
    width: 29%;`

const CountdownDiv = styled.div`
    position: absolute;
    width: 338px;
    height: 180px;
    left: 791px;
    top: 616px;`
    
const CountdownTimerDiv = styled.div`
    margin-top: 20.4px !important;
    margin-left: 15px;
    margin-right: 15px;
    font-size: 125px;
    color: white !important;
    font-weight: bold;
    margin-bottom: -5px;
    text-shadow: 2px 2px 8px black;`

const CountdownTitle = styled.p`
    position: absolute;
    margin: auto;
    font-size: 28.8px;
    font-weight: bold;
    height: 36px;
    color: white;
    width: 100%;
    text-align: center;`   
    
const Container = styled.div`
    background-color: #41228e`

const MusicDiv = styled.div`
    position: absolute;
    width: 600px;
    height: 57.6px;
    left: 660px;
    top: 902px;`

const MusicTitle = styled.p`
    position: absolute;
    margin: auto;
    font-size: 24px;
    font-weight: bold;
    height: 30px;
    color: white;
    width: 100%;
    text-align: center;
    bottom: 55px;`
    
const MusicSong = styled.span`
    margin-top: 2px;
    position: relative;
    font-size: 26.4px;
    color: white;
    margin-left: 12px;
    text-shadow: 2px 2px 8px #000000;`

const Countdown = () => {
    const [countdown] = useReplicant('countdown', [], {persistent: false});
    const [song] = useReplicant('nowPlaying');
    return(
        <>
            <Container> 
                <BGImg src={bgUrl}/>
                <GSPSLogo src={logoUrl}/>
                <CountdownDiv>
                    <CountdownTitle>ZACZYNAMY ZA</CountdownTitle>
                    <CountdownTimerDiv>{countdown.formatted}</CountdownTimerDiv>
                </CountdownDiv>
                <MusicDiv>
                    <MusicTitle>OBECNA PIOSENKA</MusicTitle>
                    <Marquee gradient={false}>
                        <MusicSong>{song}</MusicSong>
                    </Marquee>
                </MusicDiv>      
            </Container>
        </>


    )
}


render(
    <Countdown/>,
    document.getElementById("container")
)