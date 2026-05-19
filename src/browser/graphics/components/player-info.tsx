import styled from "styled-components";
import { useReplicant } from 'use-nodecg';

const Main = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const Player = styled.div`
  background-color: #5f3ac2;
  color: white;
  font-size: 28px;
  padding: 5px 0 5px 0;
  width: 100%;
`;

const Guide = styled.div`
  background-color: #b4b4b4;
  color: white;
  font-size: 24px;
  padding: 5px 0 5px 0;
  width: 100%;
`;

export const PlayerInfo = () => {
  const [currentPlayer] = useReplicant<string>("currentPlayer", "");
  const [currentGuide] = useReplicant<string>("currentGuide", "");
  return (
    <Main>
      <Player>
        <span style={{ alignSelf: "center" }}>{currentPlayer}</span>
      </Player>
      <Guide>
        <span style={{ alignSelf: "center" }}>{currentGuide}</span>
      </Guide>
    </Main>
  );
};