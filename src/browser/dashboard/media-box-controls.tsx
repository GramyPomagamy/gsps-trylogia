import { DashboardThemeProvider } from './components/DashboardThemeProvider';
import { render } from '../render';
import {
  Paper,
  Container,
  Typography,
  Stack,
  Box,
  TextField,
  Button,
  Grid,
} from '@mui/material';
import { useReplicant } from 'use-nodecg';
import { Asset, LogoCycle } from 'src/types/custom';
import { useEffect, useState } from 'react';

export const App = () => {
  return (
    <DashboardThemeProvider>
      <Container>
        <AssetTimeouts />
      </Container>
    </DashboardThemeProvider>
  );
};

const AssetTimeouts = () => {
  const [mediaBoxAssets] = useReplicant<Asset[]>('assets:media-box', []);
  const [logoCycles, setLogoCycles] = useReplicant<LogoCycle[]>('logoCycles', []);
  const [splitsTimer, setSplitsTimer] = useReplicant<number>('splitsTimer', 0);
  const [mediaTimer, setMediaTimer] = useReplicant<number>('mediaTimer', 0)

  const [localLogoCycles, setLocalLogoCycles] = useState<LogoCycle[]>([]);
  const [localSplitsTimer, setLocalSplitsTimer] = useState<number>(20);
  const [localMediaTimer, setLocalMediaTimer] = useState<number>(5);
  

  useEffect(() => {
    if (typeof logoCycles === 'undefined') return;

    setLocalLogoCycles(logoCycles);
  }, [logoCycles]);

  useEffect(() => {
    if (typeof splitsTimer === 'undefined') return;
    
    setLocalSplitsTimer(splitsTimer);
  }, [splitsTimer])

  useEffect(() => {
    if (typeof mediaTimer === 'undefined') return;
    
    setLocalMediaTimer(mediaTimer);
  }, [mediaTimer])

  function updateCycle(name: string, newCycle: string) {
    const index = localLogoCycles.findIndex((cycle) => cycle.name === name);
    const newCycles = [...localLogoCycles];
    if (index > -1) {
      const updatedCycle = { ...localLogoCycles[index], cycle: parseInt(newCycle), name: name };
      newCycles[index] = updatedCycle;
    } else {
      newCycles.push({ name: name, cycle: parseInt(newCycle) });
    }
    setLocalLogoCycles(newCycles);
  }

  return (
    <Paper>
      <Stack useFlexGap spacing={4} sx={{ textAlign: 'center' }}>
        <Typography variant="h5" sx={{ marginTop: '10px' }}>
          <b>Cykle obrazów na mediaboxie</b>
        </Typography>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }}>
          </Box>
          <div id="main-tab" style={{ padding: '5px' }}>
            <Stack spacing={2}>
              <Button
                variant="contained"
                disabled={localLogoCycles == logoCycles && localSplitsTimer == splitsTimer && localMediaTimer == mediaTimer}
                onClick={() => {
                  setLogoCycles(localLogoCycles);
                  setSplitsTimer(localSplitsTimer);
                  setMediaTimer(localMediaTimer);
                }}>
                Zapisz zmiany
              </Button>
              <Grid container sx={{justifyContent: 'center', alignItems: 'center'}}>
                  <TextField 
                    label="Długość pokazywania splitów w sekundach"
                    onChange={(event) => {
                      const nr = parseInt(event.target.value)
                      if(!Number.isNaN(nr)) {
                        setLocalSplitsTimer(nr)
                      }
                    }}
                    style={{width: '500px'}}
                  />
                  <p style={{width: '200px'}}>Obecny cykl: {splitsTimer} sek.</p>
              </Grid>
              <Grid container sx={{justifyContent: 'center', alignItems: 'center'}}>
                  <TextField 
                    label="Długość pokazywania media boxa w sekundach"
                    onChange={(event) => {
                      const nr = parseInt(event.target.value)
                      if(!Number.isNaN(nr)) {
                        setLocalMediaTimer(nr)
                      }
                    }}
                    style={{width: '500px'}}
                  />
                  <p style={{width: '200px'}}>Obecny cykl: {mediaTimer} sek.</p>
              </Grid>
              {mediaBoxAssets.map((asset) => {
                return (
                  <Paper elevation={3} key={asset.name}>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '2px',
                        lineHeight: '0px',
                        marginTop: '5px',
                        marginBottom: '5px',
                        width: '100%',
                      }}>
                      <img src={asset.url} width="15%" />
                      <p>{asset.name}</p>
                      <p>
                        Obecny cykl: <span> </span>
                        {logoCycles.find((cycle) => cycle.name === asset.name)?.cycle || 10} sek.
                      </p>
                      <TextField
                        label="Długość cyklu w sekundach"
                        onChange={(event) => {
                          updateCycle(asset.name, event.target.value);
                        }}
                        inputProps={{pattern: "\d+"}}
                      />
                    </div>
                  </Paper>
                );
              })}
            </Stack>
          </div>
        </Box>
      </Stack>
    </Paper>
  );
};

render(<App />);
