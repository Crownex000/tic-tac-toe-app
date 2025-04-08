import { Box, Button, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { motion } from "motion/react";
import { StyleProps } from "../types";
import Players from "../components/Players";
import Board from "../components/Board";
import History from "../components/History";
import { Cancel, Start } from "@mui/icons-material";
import playerInputSchema from "../validations/player-input";

const styles: StyleProps = {
  container: {
    p: 3,
    backgroundColor: "white",
    width: { xs: 300, md: 500 },
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 50px 50px",
  },
  title: {
    typography: { xs: "h4", md: "h2" },
  },
  author: {
    mb: { xs: 2, md: 3 },
  },
  titleContainer: {
    backgroundColor: "rgb(42, 136, 200)",
    color: "rgb(255,255,255)",
  },
};

const defaultPlayerValues = {
  player1: {
    name: null,
    sign: "X",
  },
  player2: {
    name: null,
    sign: "O",
  },
};

const Home = (props: any) => {
  const [players, setPlayers] = useState<any>(defaultPlayerValues);
  const [open, setOpen] = useState<boolean>(false);
  const [openBoard, setOpenBoard] = useState<boolean>(false);
  const [inputErrors, setInputErrors] = useState<any>(null);

  const handleCancel = () => {
    setInputErrors(null);
    setOpen(false);
  };

  const handleBoard = () => {
    console.log(players, props.defaultValues);
    const { error } = playerInputSchema.validate(
      {
        player1: players.player1.name,
        player2: players.player2.name,
      },
      { abortEarly: false }
    );

    if (error) {
      const errors: any = {};
      error.details.forEach((detail) => {
        const fieldName = detail.path[0];
        errors[fieldName] = detail.message;
      });
      return setInputErrors(errors);
    }

    handleCancel();
    setOpenBoard(true);
  };

  return (
    <Box sx={styles.container}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        spacing={3}
      >
        <Grid size={{ xs: 12 }} sx={styles.titleContainer}>
          <motion.div
            animate={{
              scale: [1, 1.02, 1],
              opacity: [1, 0.8, 1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Typography sx={styles.title}>Tic-Tac-Toe Game</Typography>
          </motion.div>
          <Typography variant="caption">By: Jefferson Gutierrez</Typography>
        </Grid>
        {openBoard ? (
          <Board
            {...props}
            players={players}
            setOpen={setOpen}
            setOpenBoard={setOpenBoard}
            setPlayers={setPlayers}
            defaultValues={defaultPlayerValues}
          />
        ) : null}
        {!open ? (
          !openBoard ? (
            <>
              <Grid size={{ xs: 12 }}>
                <History />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => setOpen(true)}
                  sx={styles.button}
                >
                  Enter
                </Button>
              </Grid>
            </>
          ) : null
        ) : (
          <>
            {/** Player Form*/}
            <Players
              {...props}
              setPlayers={setPlayers}
              inputErrors={inputErrors}
            />

            <Grid size={{ xs: 6 }}>
              <Button
                fullWidth
                variant="contained"
                onClick={handleCancel}
                color="error"
                startIcon={<Cancel />}
              >
                Cancel
              </Button>
            </Grid>
            <Grid size={{ xs: 6 }}>
              <Button
                fullWidth
                variant="contained"
                onClick={handleBoard}
                endIcon={<Start />}
              >
                Start Game
              </Button>
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
};

export default Home;
