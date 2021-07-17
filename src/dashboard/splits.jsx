import { Button, Typography, Table, TableContainer, TableBody, TableRow, TableCell, ThemeProvider, TableHead } from '@material-ui/core';
import React from 'react';
import { render } from 'react-dom';
import { useReplicant } from 'use-nodecg';
import { createTheme } from '@material-ui/core/styles';

const Splits = () => {
    const [splits] = useReplicant('splits', []);
    const [currentSplit] = useReplicant('currentSplit');
    const [SCTimer] = useReplicant('timer', '', {namespace: 'nodecg-speedcontrol'});

    const darkTheme = createTheme({
        palette: {
            type: 'dark'
        }
    })

    const splitList = splits.map((split, uuid) => (
        <TableRow key={uuid}>
            <TableCell component="th" scope="row">
                {split.name}
            </TableCell>
            <TableCell align="right">{split.formattedDelta}</TableCell>
            <TableCell align="right">{split.formattedOriginalTime}</TableCell>
        </TableRow>
    ));

    return(
        <ThemeProvider theme={darkTheme}>
            <div style={{textAlign: 'text-center', width: '100%'}}>
                <Typography variant="h5"><b>Obecna gra: </b>{currentSplit}</Typography>
            </div>
            <br/>
            <TableContainer>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Gra</TableCell>
                            <TableCell align="right">+/-</TableCell>
                            <TableCell align="right">Split Time</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {splitList}
                    </TableBody>
                </Table>
            </TableContainer>
            <br/>
            <Button disabled={SCTimer.state != 'running'} variant="contained" color="primary" onClick={() => {nodecg.sendMessage('split')}}>{currentSplit === "GTA: San Andreas" ? <>Zakończ timer</> : <>Następna gra</>}</Button>
            <br/>
            <br/>
            <Button variant="contained" color="primary" onClick={() => {nodecg.sendMessage('resetSplits')}}>Zresetuj wszystkie splity</Button>
        </ThemeProvider>
    )
}

render(<Splits/>, document.getElementById("root"))