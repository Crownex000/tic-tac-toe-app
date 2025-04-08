import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { StyleProps } from "../types";

const styles: StyleProps = {
  container: {
    p: 2,
    border: "1px solid #ccc",
    borderRadius: "4px",
    maxHeight: 200,
    overflowY: "auto",
  },
};

interface MoveLogsProps {
  moves?: string[];
}

const MoveLogs = (props: MoveLogsProps) => {
  const { moves } = props;

  return (
    <Accordion defaultExpanded={moves?.length ? true : false}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6">Move Logs</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={styles.container}>
          {moves?.length
            ? moves?.map((move, index) => (
                <Typography key={index} variant="caption" display="block">
                  {move}
                </Typography>
              ))
            : "No moves yet."}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default MoveLogs;
