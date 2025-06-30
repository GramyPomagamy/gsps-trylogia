import { render } from '../render';
import trylogiaLogo from './_misc/img/trylogia_logo.png';
import mainBg from './_misc/img/main-background.png';
import { useReplicant } from 'use-nodecg';
import { Countdown, CountdownRunning } from '../../types/generated';
import styled, { keyframes } from 'styled-components';
import { IoIosMusicalNotes } from 'react-icons/io';
import { IconContext } from 'react-icons';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import { StrictMode, useRef } from 'react';
import { GlobalStyle } from '../global-theme';

const LayoutContainer = styled.div`
  width: 1920px;
  height: 1030px;
  background-image: url(${mainBg});
  margin: 0;
  padding: 0;
`;

const LogoDiv = styled.div`
  position: fixed;
  top: 180px;
  width: 1920px;
  height: 500px;
  text-align: center;
`;

const CountdownDiv = styled.div`
  font-size: 96px;
  width: 100%;
  text-align: center;
  position: fixed;
  top: 750px;
  font-variant-numeric: tabular-nums;
`;

const Logo = styled.img`
  height: 100%;
`;

const songBackgroundSize = '576px';

const SongDiv = styled.div`
  display: flex;
  position: fixed;
  top: 80px;
  background: #e6e6e6;
  height: 32px;
  color: rgb(60, 60, 60);
  width: 25%;
  flex-direction: row;
  gap: 8px;
  font-size: 20px;
  border-radius: 0px 7px 7px 0px;
  align-content: space-between;
  justify-content: space-between;
`;

const scrollLeftAnimation = keyframes`
    0% {
      -moz-transform: translateX(100%);
      -webkit-transform: translateX(100%);
      transform: translateX(${songBackgroundSize});
    }
    100% {
      -moz-transform: translateX(-100%);
      -webkit-transform: translateX(-100%);
      transform: translateX(-100%);
    }
`;

const SongScroller = styled.div`
  position: absolute;
  height: 100%;
  width: max-content;
  line-height: 50px;
  text-align: center;
  transform: translateX(100%);
  animation: ${scrollLeftAnimation} 18s linear infinite
`;

const SongName = styled.div`
  width: 100%;
  margin-top: -10px;
`;

export const App = () => {
  const [countdown] = useReplicant<Countdown | undefined>('countdown', undefined);
  const [countdownRunning] = useReplicant<CountdownRunning>('countdownRunning', false);
  const [song] = useReplicant<string>('nowPlaying', '');
  const songRef = useRef(null);
  const countdownRef = useRef(null);

  return (
    <StrictMode>
      <GlobalStyle />
      <LayoutContainer>
        <LogoDiv>
          <Logo src={trylogiaLogo} />
        </LogoDiv>
        <CountdownDiv ref={countdownRef}>
          {countdown && countdownRunning && <span className="shadow">{countdown.formatted}</span>}
        </CountdownDiv>

        <IconContext.Provider value={{ size: '1.5em' }}>
          {' '}
          <SongDiv>
            <IoIosMusicalNotes />
            <SwitchTransition mode="out-in">
              <CSSTransition
                key={song}
                nodeRef={songRef}
                appear
                in={true}
                timeout={1000}
                classNames="fade">
                <SongName ref={songRef} className="marquee">
                  <SongScroller>{song}</SongScroller>
                </SongName>
              </CSSTransition>
            </SwitchTransition>
          </SongDiv>
        </IconContext.Provider>
      </LayoutContainer>
    </StrictMode>
  );
};

render(<App />);
