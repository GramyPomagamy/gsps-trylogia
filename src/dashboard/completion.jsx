import React from 'react';
import { render } from 'react-dom';
import { useReplicant } from 'use-nodecg';
import { Container, createTheme, ThemeProvider, Typography } from '@material-ui/core';



const Completion = () => {
    const darkTheme = createTheme({
        palette: {
            type: 'dark'
        }
    })

    const [completion] = useReplicant('completion');
    const [currentSplit] = useReplicant('currentSplit');

    return(
        <ThemeProvider theme={darkTheme}>
            <Container>
                <Typography align="center" variant="h6">Obecny procent ukończenia {currentSplit}:</Typography>
                <Typography align="center" variant="h4"><b>{completion}%</b></Typography>
            </Container>
        </ThemeProvider>
    )
}

render(<Completion/>, document.getElementById('root'));