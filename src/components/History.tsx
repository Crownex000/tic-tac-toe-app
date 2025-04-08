import React, { useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TablePagination,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useLoadHistory from "../hooks/useLoadHistory";

const History = () => {
  const { history, isLoading, error } = useLoadHistory();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">Failed to load history</Typography>;
  }

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h4">Game History</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {history?.length ? (
            <>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>Players</strong></TableCell>
                      <TableCell><strong>Winner</strong></TableCell>
                      <TableCell><strong>Description</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {history
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((record: any, index: number) => (
                        <TableRow key={index}>
                          <TableCell>{record.player1} vs {record.player2}</TableCell>
                          <TableCell>{record.winner}</TableCell>
                          <TableCell>{record.description}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                component="div"
                count={history.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[]}
              />
            </>
          ) : (
            <Typography>No game history available.</Typography>
          )}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default History;