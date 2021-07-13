import React from 'react';
import {render} from 'react-dom';
import {useReplicant} from 'use-nodecg';
import { makeStyles, createTheme } from '@material-ui/core/styles';
import { FormControl, InputLabel, MenuItem, NativeSelect, Select, ThemeProvider, Typography } from '@material-ui/core';


const darkTheme = createTheme({
    palette: {
        type: 'dark'
    }
})

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(0),
      minWidth: '70%',
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

export default function Player() {
    const classes = useStyles();
    const [player, setPlayer] = useReplicant('player');

    const handleSelect = (event) => {
        setPlayer(event.target.value);
    };

    return (
        <>
            <ThemeProvider theme={darkTheme}>
                <Typography style={{marginLeft: '2px'}} variant="h5"><b>Obecny gracz:</b> {player}</Typography>
            </ThemeProvider>
            <br/>
            <ThemeProvider theme={darkTheme}>
                <FormControl variant="filled" className={classes.formControl}>
                    <InputLabel htmlFor="player-select">Gracz</InputLabel>
                    <Select
                        native
                        id="player-select"
                        value={player}
                        onChange={handleSelect}
                        defaultValue={"PokerFacowaty"}
                    >
                        <option value={"PokerFacowaty"}>PokerFacowaty</option>
                        <option value={"dexterw"}>dexterw</option>
                        <option value={"zola"}>zola</option>
                        <option value={"pitpo"}>pitpo</option>
                        <option value={"Zaborski"}>Zaborski</option>
                    </Select>    
                </FormControl>
            </ThemeProvider>
        </>
    )
}

render(
    <Player/>,
    document.getElementById("root")
)

