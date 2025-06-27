import { render } from "../render";
import styled from "styled-components";
import { StrictMode, useEffect, useRef, useState } from "react";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import { GlobalStyle } from "../global-theme";
import Total from "./components/total";

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

export const App = () => {
  const CTAs = [
    'Dołącz do naszej społeczności na Discordzie na <b class="highlight">gsps.pl/discord</b>!',
    'Jako grupa speedrunnerów GTA, próbujemy właśnie razem ukończyć <b class="highlight">GTA III, Vice City i San Andreas</b> na 100% w jednym podejściu!',
    'Więcej o GSPS (polskim charytatywnym wydarzeniu speedrunningowym) znajdziesz na <b class="highlight">gsps.pl</b>!',
  ];
  let currentCTAIndex = 0;
  const [CTA, setCTA] = useState(CTAs[currentCTAIndex]);
  const CTARef = useRef(null);

  const setNextCTA = () => {
    currentCTAIndex++;
    if (currentCTAIndex >= CTAs.length) {
      currentCTAIndex = 0;
    }
    setCTA(CTAs[currentCTAIndex]);
  };

  useEffect(() => {
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
          <CSSTransition
            key={CTA}
            nodeRef={CTARef}
            appear
            in
            timeout={1000}
            classNames="fade"
          >
            <CTADiv ref={CTARef} dangerouslySetInnerHTML={{ __html: CTA! }} />
          </CSSTransition>
        </SwitchTransition>
        <Total />
      </OmnibarContainer>
    </StrictMode>
  );
};

render(<App />);
