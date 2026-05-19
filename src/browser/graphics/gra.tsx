import { useReplicant } from 'use-nodecg';
import { render } from '../render';
import gameLayoutBg from './_misc/img/game-layout.png';
import styled from 'styled-components';
import { Timer as TimerType } from '../../types/generated';
import { GlobalStyle } from '../global-theme';
import DonationBar from './components/donation-bar';
import { Carousel } from './components/carousel';
import { PlayerInfo } from './components/player-info';
import { GameInfo } from './components/game-info';

const GameLayoutContainer = styled.div`
  background-image: url(${gameLayoutBg});
  width: 1920px;
  height: 1030px;
  margin: 0;
  padding: 0;
`;

const Info = styled.div`
  width: 603px;
  height: 630px;
  position: fixed;
  top: 396px;
  text-align: center;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
`;

const Timer = styled.div`
  color: white;
  font-size: 72px;
  font-family: 'Bebas Neue';
  width: 100%;
  height: 80px;
`;

const Donations = styled.div`
  position: fixed;
  width: 1313px;
  height: 44px;
  bottom: 0px;
  left: 607px;
`;

const App = () => {
  const [timer] = useReplicant<TimerType | undefined>('timer', undefined);
  return (
    <>
      <GlobalStyle />
      <GameLayoutContainer>
        <Info>
          <PlayerInfo/>
          <GameInfo/>
          <Timer className="shadow">{timer && <span>{timer.time}</span>}</Timer>
          <Carousel/>
        </Info>
        <Donations><DonationBar /></Donations>
      </GameLayoutContainer>
    </>
  );
};

render(<App />);
