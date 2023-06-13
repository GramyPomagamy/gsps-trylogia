import { createRoot } from 'react-dom/client';
import trylogiaLogo from './_misc/img/trylogia_logo.png';
import mainBg from './_misc/img/main-background.png';
import { useReplicant } from 'use-nodecg';
import './_misc/style.css';
import { Countdown, CountdownRunning } from '../../types/generated';
import styled from 'styled-components';
import { IoIosMusicalNotes } from 'react-icons/io';
import { IconContext } from 'react-icons';

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
`;

const Logo = styled.img`
  height: 100%;
`;

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

const App = () => {
  const [countdown] = useReplicant<Countdown | undefined>('countdown', undefined);
  const [countdownRunning] = useReplicant<CountdownRunning>('countdownRunning', false);

  return (
    <LayoutContainer>
      <LogoDiv>
        <Logo src={trylogiaLogo} />
      </LogoDiv>
      <CountdownDiv>
        {countdownRunning && countdown && <span className="shadow">{countdown.formatted}</span>}
      </CountdownDiv>
      <IconContext.Provider value={{ size: '1.5em' }}>
        {' '}
        <SongDiv>
          <IoIosMusicalNotes />
        </SongDiv>
      </IconContext.Provider>
    </LayoutContainer>
  );
};

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);
