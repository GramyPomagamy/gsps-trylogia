import { useReplicant } from 'use-nodecg';
import { render } from '../render';
import gameLayoutBg from './_misc/img/game-layout.png';
import styled from 'styled-components';
import { CurrentSplit, Splits as SplitsType, Timer as TimerType } from '../../types/generated';
import './_misc/flex.css';
import './_misc/style.css';
import { MdGamepad } from 'react-icons/md';
import { IconContext } from 'react-icons';

const GameLayoutContainer = styled.div`
  background-image: url(${gameLayoutBg});
  width: 1920px;
  height: 1030px;
  margin: 0;
  padding: 0;
`;

const GameInfo = styled.div`
  width: 543px;
  height: 688px;
  position: fixed;
  top: 338px;
  text-align: center;
  justify-content: space-between;
  margin: 0;
  display: flex;
  flex-direction: column;
`;

const Player = styled.div`
  background-color: #e6e6e6;
  color: rgb(60, 60, 60);
  font-size: 28px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 5px;
  width: 100%;
`;

const PlayerIcon = styled.span`
  position: absolute;
  left: 5px;
  top: 1.5px;
`;

const Game = styled.div`
  padding: 5px;
  margin: 0;
  flex: 0 0 auto;
  min-height: 0;
  max-height: 350px;
  flex-direction: column;
  width: 100%;
`;

const Timer = styled.div`
  background-color: #e6e6e6;
  color: rgb(60, 60, 60);
  padding: 5px;
  font-size: 72px;
  font-family: 'Oswald';
  width: 100%;
`;

const Splits = styled.div`
  min-height: 0;
  gap: 5px;
  flex-direction: column;
  width: 100%;
  margin-top: 75px;
`;

const Split = styled.span`
  display: flex;
  flex-direction: row;
  text-align: center;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

const App = () => {
  const [timer] = useReplicant<TimerType | undefined>('timer', undefined);
  const [splits] = useReplicant<SplitsType>('splits', []);
  const [currentSplit] = useReplicant<CurrentSplit>('currentSplit', 'GTA III');
  const [currentPlayer] = useReplicant<string>('currentPlayer', '');
  const [gameCompletion] = useReplicant<string>('completion', '');

  return (
    <GameLayoutContainer>
      <GameInfo className="Flex">
        <Player>
          <PlayerIcon>
            <IconContext.Provider value={{ size: '1.4em' }}>
              <MdGamepad />
            </IconContext.Provider>
          </PlayerIcon>
          <span style={{ alignSelf: 'center' }}>{currentPlayer}</span>
        </Player>
        <Game className="Flex">
          <p style={{ fontSize: '30px', fontWeight: '600' }}>OBECNA GRA</p>
          <p
            style={{
              fontSize: currentSplit === 'GTA: San Andreas' ? '48px' : '64px',
              fontWeight: '700',
              margin: '0',
            }}
            className="shadow">
            {currentSplit}
          </p>
          <p style={{ fontSize: '30px' }}>
            <span style={{ fontWeight: '600' }}>POSTĘP UKOŃCZENIA GRY: </span>
            <span style={{ fontWeight: '700' }}>{gameCompletion}%</span>
          </p>
        </Game>
        <Timer>{timer && <span>{timer.time}</span>}</Timer>
        <Splits className="Flex">
          <p style={{ fontSize: '30px', fontWeight: '600' }}>CZASY UKOŃCZENIA GIER</p>
          <div style={{ marginBottom: '20px' }}>
            {splits.map((split) => (
              <Split key={split.name}>
                <span
                  className="shadow"
                  style={{
                    fontSize: split.name != 'GTA III' && split.delta != 0 ? '32px' : '40px',
                  }}>
                  {split.name}
                </span>
                {split.delta != 0 && (
                  <span style={{ fontSize: '24px' }}>
                    - {split.formattedOriginalTime} ({split.formattedDelta})
                  </span>
                )}
              </Split>
            ))}
          </div>
        </Splits>
      </GameInfo>
    </GameLayoutContainer>
  );
};

render(<App />);
