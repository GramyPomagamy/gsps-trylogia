import { useReplicant } from 'use-nodecg';
import { DashboardThemeProvider } from './components/DashboardThemeProvider';
import { createRoot } from 'react-dom/client';
import { CurrentSplit, Splits, Timer } from '../../types/generated';
import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

const App = () => {
  const [splits] = useReplicant<Splits>('splits', []);
  const [timer] = useReplicant<Timer | undefined>('timer', undefined);
  const [currentSplit] = useReplicant<CurrentSplit>('currentSplit', 'GTA III');

  return (
    <DashboardThemeProvider>
      <Typography variant="h4" textAlign="center" gutterBottom>
        Obecna gra: <b>{currentSplit}</b>
      </Typography>
      <TableContainer style={{ marginBottom: '15px' }} component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Gra</b>
              </TableCell>
              <TableCell>
                <b>+/-</b>
              </TableCell>
              <TableCell>
                <b>Czas splita</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {splits.map((split) => (
              <TableRow key={split.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {split.name}
                </TableCell>
                <TableCell>{split.formattedDelta}</TableCell>
                <TableCell>{split.formattedOriginalTime}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {timer && (
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Button
              variant="contained"
              onClick={() => {
                nodecg.sendMessage('split');
              }}
              disabled={timer.phase != 'running'}>
              {currentSplit === 'GTA: San Andreas' ? 'Zakończ timer' : 'Następna gra'}
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              onClick={() => {
                nodecg.sendMessage('resetSplits');
              }}>
              Zresetuj splity
            </Button>
          </Grid>
        </Grid>
      )}
    </DashboardThemeProvider>
  );
};
const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);
