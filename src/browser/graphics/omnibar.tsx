import { render } from '../render';
import styled from 'styled-components';
import { StrictMode, useEffect, useRef, useState } from 'react';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import { GlobalStyle } from '../global-theme';

const OmnibarContainer = styled.div`
  width: 100%;
  height: 50px;
  background-color: #e6e6e6;
  color: rgb(60, 60, 60);
  justify-content: space-between;
  align-content: space-between;
  align-items: center;
  display: flex;
  flex-direction: row;
`;

const CTADiv = styled.div`
  padding-left: 10px;
  font-size: 24px;
`;

const ClockDiv = styled.div`
  font-size: 34px;
  align-self: flex-end;
  padding-left: 10px;
  padding-right: 10px;
  margin-top: auto;
  margin-bottom: auto;
  text-align: right;
`;

export const App = () => {
  const CTAs = [
    'Dołącz do naszej społeczności na Discordzie na <b class="highlight">gsps.pl/discord</b>!',
    'Jako grupa speedrunnerów GTA, próbujemy właśnie razem ukończyć <b class="highlight">GTA III, Vice City i San Andreas</b> na 100% w jednym podejściu!',
    'Więcej o GSPS (polskim charytatywnym wydarzeniu speedrunningowym) znajdziesz na <b class="highlight">gsps.pl</b>!',
  ];
  let currentCTAIndex = 0;
  const [CTA, setCTA] = useState(CTAs[currentCTAIndex]);
  const CTARef = useRef(null);

  const getClockHTML = () => {
    const date_ob = new Date();
    const hours = ('0' + date_ob.getHours()).slice(-2);
    const minutes = ('0' + date_ob.getMinutes()).slice(-2);
    return `${hours}:${minutes}`;
  };

  const [clock, setClock] = useState(getClockHTML());

  const setNextCTA = () => {
    currentCTAIndex++;
    if (currentCTAIndex >= CTAs.length) {
      currentCTAIndex = 0;
    }
    setCTA(CTAs[currentCTAIndex]);
  };

  useEffect(() => {
    // update clock every half a second
    setInterval(() => {
      setClock(getClockHTML());
    }, 500);

    // update CTA every 10 seconds
    setInterval(() => {
      setNextCTA();
    }, 10000);
  }, []);

  return (
    <StrictMode>
      <GlobalStyle />
      <OmnibarContainer>
        <SwitchTransition mode="out-in">
          <CSSTransition key={CTA} nodeRef={CTARef} appear in timeout={1000} classNames="fade">
            <CTADiv ref={CTARef} dangerouslySetInnerHTML={{ __html: CTA! }} />
          </CSSTransition>
        </SwitchTransition>
        <ClockDiv dangerouslySetInnerHTML={{ __html: clock }} />
      </OmnibarContainer>
    </StrictMode>
  );
};

render(<App />);
