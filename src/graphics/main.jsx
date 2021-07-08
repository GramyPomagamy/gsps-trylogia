import React, { useEffect } from 'react';
import {render} from 'react-dom';
import style from './css/styles.css';
import layoutUrl from 'url:./img/mainLayout.png';
import omnibarBgUrl from 'url:./img/omnibar_bg.png';
import logoUrl from 'url:./img/gspsLogo.png';
import {useReplicant} from 'use-nodecg';
import styled from 'styled-components';
import gsap from 'gsap';

const Nameplate = styled.div`
    top: 492px;
    width: 567px;
    height: 36px;
    background-color: #3A008B;
    text-align: center;
    align-items: center;
    position: absolute;
    font-weight: bold;
    color: white;
    font-size: 26px;`

const Omnibar = styled.div`
    width: 100%;
    height: 66px;
    position: absolute;
    top: 1015px;`

const OmnibarLogoDiv = styled.div`
    width: 160px;
    height: 66px;
    background-color: #3A008B;
    z-index: 15;
    position: absolute;`    

const OmnibarLogo = styled.img`
    margin-top: -12px;
    margin-left: -11px;
    width: 115%;`    

const ClockDiv = styled.div`
    position:absolute;
    left: 1759px;
    top:0px;
    height: 66px;
    width: 161px;
    background-color: #3A008B;
    z-index: 10;
    text-align: center;
    display: flex;
    justify-content: center;
    align-content: center;
    z-index: 15;`

const Clock = styled.span`
    position: relative;
    color: white;
    top: 1px;
    font-size: 40px; 
    font-weight: bold;`
    
const CurrentGameDiv = styled.div`
    width: 567px;
    position: absolute;
    top: 536px;
    text-align: center;
    text-shadow: 2px 2px 8px black;`

const CurrentGameTitle = styled.span`
    color: white;
    margin-top: 15px;
    font-size: 24px;
    font-weight: bold;`

const CurrentGameText = styled.span`
    color: white;
    margin-top: 15px;
    font-size: 48px;
    font-weight: bold;`
    
const SplitsDiv = styled.div`
    width: 567px;
    position: absolute;
    top: 640px;
    text-align: center;
    text-shadow: 2px 2px 8px black;
    color: white;`

const SplitsTitle = styled.span`
    color: white;
    margin-top: 15px;
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px` 
    
const SplitsGame = styled.div`
    margin-bottom: 5px;
    width: 100%;
    font-size: 32px`

const OmnibarCompletion = styled.div`
    position: absolute;
    top: 5px;
    left: 170px;
    font-size: 20px;
    color: white;
    text-shadow: 2px 2px 8px black;`
    
const OmnibarCTA = styled.div`
    position: absolute;
    top: 27px;
    left: -1025px;
    font-size: 20px;
    color: white;`

const Main = () => {
    const [runner] = useReplicant('player');
    const [currentSplit] = useReplicant('currentSplit');
    const [timer] = useReplicant('timer', [], {namespace: 'nodecg-speedcontrol'});
    const [clock] = useReplicant('clock');
    const [splits] = useReplicant('splits', []);
    const [completion] = useReplicant('completion');

    const timerColors = {
        running: 'white',
        finished: '#ffbd16',
        stopped: '#a5a3a3',
        paused: '#a5a3a3'
    }

    const CTAs = [
        "Dołącz do naszej społeczności na Discordzie na <b>discord.gsps.pl!</b>",
        "Jako grupa speedrunnerów GTA, próbujemy właśnie razem ukończyć <b>GTA III, Vice City i San Andreas</b> na 100% w jednym podejściu!",
        "Więcej o GSPS (polskim charytatywnym wydarzeniu speedrunningowym) znajdziesz na <b>gsps.pl!</b>"
    ]

    const Timer = styled.span`
        color: ${timerColors[timer.state]};
        width: 567px;
        text-align: center;
        font-size: 96px;
        font-weight: bold;
        text-shadow: 2px 2px 8px black;
        position: absolute;
        top: 850px;
        left: 0px;`

    const CTAElements = CTAs.map((CTA, id) => {
        return (
            <OmnibarCTA key={id} id={"cta-"+id} dangerouslySetInnerHTML={{__html: CTA}}/>
        )
    });

    useEffect(() => {
        const tl = gsap.timeline({repeat: -1});
        CTAs.map((CTA, id) => {
            tl.to(`#cta-${id}`, {left: '170px', duration: 2, ease: "power2.out"});
            tl.to(`#cta-${id}`, {left: '-1025px', duration: 2, ease: "power2.in"}, ">6");
        });
    }, [])

    return(
        <>
            <img src={layoutUrl}></img>
            <Nameplate>{runner}</Nameplate>
            <CurrentGameDiv>
                <CurrentGameTitle>OBECNA GRA</CurrentGameTitle>
                <br/>
                <CurrentGameText>{currentSplit}</CurrentGameText>
            </CurrentGameDiv>
            <SplitsDiv>
                <SplitsTitle>CZASY UKOŃCZENIA GIER</SplitsTitle>
                {splits.map((split, uuid) => {
                    if (split.delta != 0) {
                        return(
                            <SplitsGame key={uuid}><b>{split.name}</b> - {split.formattedOriginalTime} ({split.formattedDelta})</SplitsGame>
                        )   
                    }
                    else {
                        return(
                            <SplitsGame key={uuid}><b>{split.name}</b></SplitsGame>
                        )
                    }
                })}
            </SplitsDiv>
            <Timer>{timer.time}</Timer> 
            <Omnibar>
                <OmnibarLogoDiv>
                    <OmnibarLogo src={logoUrl}/>
                </OmnibarLogoDiv>
                <OmnibarCompletion><b>Postęp ukończenia obecnej gry:</b> {completion}%</OmnibarCompletion>
                {CTAElements}
                <img src={omnibarBgUrl}></img>
                <ClockDiv>
                    <Clock>{clock}</Clock>
                </ClockDiv>
            </Omnibar>
        </>
    )
}


render(
    <Main/>, document.getElementById("container")
)