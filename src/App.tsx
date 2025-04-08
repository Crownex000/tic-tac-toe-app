import { Box } from "@mui/material";
import { StyleProps } from "./types";
import Home from "./views/Home";

const styles: StyleProps = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
};

function App(props: any) {
  return (
    <Box sx={styles.container}>
      <Home {...props} />
    </Box>
  );
}

export default App;
