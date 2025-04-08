import { Dispatch, SetStateAction } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { StyleProps } from "../types";
import useCheckState from "../hooks/useCheckState";
import MoveLogs from "./MoveLogs";
import useGameMessages from "../hooks/useGameMessages";
import useSaveGame from "../hooks/useSaveGame";
import { Close, RadioButtonUnchecked } from '@mui/icons-material';

const styles: StyleProps = {
  container: {
    p: 2,
  },
  board: {
    width: 300,
    display: "flex",
    flexWrap: "wrap",
    backgroundColor: "rgb(255,255,255)",
    color: "rgb(0, 0, 0)",
  },
  blocks: {
    width: "33.33%",
    height: 100,
    border: "2px solid rgb(255,255,255)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    fontSize: "24px",
    fontWeight: "bold",
    boxSizing: "border-box",
  },
  current: {
    fontWeight: "bold",
  },
  icon: {
    fontSize: {xs: 12, md: 60 },
    color: 'rgb(255,255,255)'
  },
  dialogContent: {
    textAlign: "center",
  },
};

interface BoardProps {
  players: any;
  defaultValues: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setOpenBoard: Dispatch<SetStateAction<boolean>>
  setPlayers: Dispatch<SetStateAction<any>>;
}

const Board = (props: BoardProps) => {
  const { players, defaultValues,  setOpen, setOpenBoard, setPlayers } = props;
  const [board, setBoard] = useState<string[]>(Array(9).fill(""));
  const [isNext, setIsNext] = useState(true);
  const [currentPlayer, setCurrentPLayer] = useState<any>(
    players?.player1?.name
  );
  const { moves, setMoves, handleGameMoves, handleGameDescription } =
    useGameMessages();
  const { winner, isDraw, evaluateGameState } = useCheckState();
  const { saveGame } = useSaveGame();

  const handleClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    const currentPlayer = isNext ? players.player1 : players.player2;
    newBoard[index] = currentPlayer.sign;

    setBoard(newBoard);
    setIsNext(!isNext);
    setCurrentPLayer(currentPlayer.name);

    handleGameMoves(currentPlayer.name, currentPlayer.sign, index);
  };

  const handleClear = () => {
    setBoard(Array(9).fill(""));
    setMoves([]);
  };

  const handleSave = () => {
    const gameSummary = handleGameDescription({
      player1: players.player1.name,
      player2: players.player2.name,
    });
    try {
      saveGame({
        player1: players.player1.name,
        player2: players.player2.name,
        description: gameSummary,
        winner: winner || "Draw",
        data: board,
      });
    } finally {
      handleClear();
      setOpen(false);
      setOpenBoard(false);
      setPlayers(defaultValues)
    }
  };

  const handleIcon = (block: string) => {
    if (block === 'X') {
      return <Close sx={styles.icon}/>;
    } else if (block === 'O') {
      return <RadioButtonUnchecked sx={styles.icon}/>;
    } else {
      return block;
    }
  };

  const handleBlockBG = (block: string) => {
    if (block === 'X') {
      return 'rgb(42, 136, 200)';
    } else {
      return 'rgb(59, 200, 243)';
    }
  };

  useEffect(() => {
    evaluateGameState(board, players);

    if (winner) {
      const gameSummary = handleGameDescription({
        player1: players.player1.name,
        player2: players.player2.name,
      });
      console.log(gameSummary);
    }
  }, [board, evaluateGameState, players, winner, handleGameDescription]);

  return (
    <Box sx={styles.container}>
      <Typography
        variant="body1"
        sx={styles.current}
      >{`Current turn: ${currentPlayer}`}</Typography>
      <Box sx={styles.board}>
        {board.map((block, index) => (
          <Box
            key={index}
            sx={{ ...styles.blocks, backgroundColor: handleBlockBG(block)}}
            onClick={() => handleClick(index)}
          >
            <Typography>{handleIcon(block)}</Typography>
          </Box>
        ))}
      </Box>
      <MoveLogs moves={moves} />
      <Dialog open={winner || isDraw ? true : false}>
        <DialogTitle sx={styles.current} textAlign="center">Result</DialogTitle>
        <DialogContent sx={styles.dialogContent}>
          {winner && <Typography>{winner} wins!</Typography>}
          {isDraw && !winner && <Typography>It's a draw!</Typography>}
        </DialogContent>
        <DialogActions>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            textAlign="center"
            spacing={2}
          >
            <Grid size={{ xs: 12, md: 6 }}>
              <Button fullWidth variant="contained" onClick={handleClear}>
                Continue
              </Button>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Button fullWidth variant="contained" onClick={handleSave} color="error">
                Stop
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Board;
