import {
  Box,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { StyleProps } from "../types";
import { Person as PersonIcon } from "@mui/icons-material";

const styles: StyleProps = {
  container: {
    m: 2,
    p: 2,
    backgroundColor:"rgb(255,255,255)",
    color: "rgb(0,0,0)",
  },
};

interface PlayersProps {
  setPlayers: Dispatch<SetStateAction<any>>;
  inputErrors?: any;
}

const Players = (props: PlayersProps) => {
  const { setPlayers, inputErrors } = props;

  const handlePLayerInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    const { name, value } = target;

    setPlayers((prev: any) => ({
      ...prev,
      [name]: {
        ...prev[name],
        name: value,
      },
    }));
  };

  return (
    <Box sx={styles.container}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        rowSpacing={2}
      >
        <Grid size={{ xs: 12 }}>
          <Typography variant="body1">Players:</Typography>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label="Player 1"
            name="player1"
            placeholder="Enter your name..."
            onChange={handlePLayerInput}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              },
            }}
            error={!!inputErrors?.player1}
            helperText={inputErrors?.player1}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label="Player 2"
            name="player2"
            placeholder="Enter your name..."
            onChange={handlePLayerInput}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              },
            }}
            error={!!inputErrors?.player2}
            helperText={inputErrors?.player2}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Players;
