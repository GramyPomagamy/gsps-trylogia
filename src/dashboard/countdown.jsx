import React from 'react';
import { render } from 'react-dom';
import { useReplicant } from 'use-nodecg';
import { Button, TextField, ThemeProvider, Typography } from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles';

const Countdown = () => {
    const [countdown] = useReplicant('countdown', [], {persistent: false});
    const [running] = useReplicant('countdownRunning', false, {persistent: false});

    const darkTheme = createTheme({
        palette: {
            type: 'dark'
        }
    })

    return(
        <ThemeProvider theme={darkTheme}>
            <Typography variant="h5"><b>Obecne odliczanie: </b>{countdown.formatted}</Typography>
            <br/>
            <TextField id="time" variant="filled" label="Długość odliczania" defaultValue="10:00" disabled={running}/>
            <br/>
            <br/>
            <Button variant="contained" color="primary" disabled={running} onClick={() => {nodecg.sendMessage('startCountdown', time.value)}}>Rozpocznij odliczanie</Button>
            <br/>
            <br/>
            <Button variant="contained" color="primary" disabled={!running} onClick={() => {nodecg.sendMessage('stopCountdown')}}>Zatrzymaj odliczanie</Button>
        </ThemeProvider>
    )
}

render(<Countdown/>, document.getElementById("root"))