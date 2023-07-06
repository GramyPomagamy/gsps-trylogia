import { useReplicant } from 'use-nodecg';
import { DashboardThemeProvider } from './components/DashboardThemeProvider';
import { createRoot } from 'react-dom/client';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';

const App = () => {
  const [currentPlayer, setCurrentPlayer] = useReplicant<string>(
    'currentPlayer',
    'PokerFacowaty'
  );

  const players = [
    'Mr. Mary',
    'Zaborski',
    'pitpo',
    'zola',
    'Kappajog',
    'Fl1tch',
    'zibson',
    'PokerFacowaty',
  ];

  const handlePlayerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPlayer((event.target as HTMLInputElement).value);
  };

  return (
    <DashboardThemeProvider>
      <FormControl>
        <FormLabel>
          Obecny gracz: <b>{currentPlayer}</b>
        </FormLabel>
        <RadioGroup value={currentPlayer} onChange={handlePlayerChange}>
          {players.map((player) => {
            return <FormControlLabel value={player} control={<Radio />} label={player} />;
          })}
        </RadioGroup>
      </FormControl>
    </DashboardThemeProvider>
  );
};

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);
