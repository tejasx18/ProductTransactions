import Statistics from "./components/Statistics";
import { Box, Typography } from "@mui/material";
import ProductTransaction from "./components/TransactionsTable";
import Barchart from "./components/Barchart";

const App = () => { 
  return (
    <Box padding={3}>
      <Typography variant="h3" sx={{fontWeight: "bold",color: "#1976d2",textAlign: "center",mb: 4}}>
        Transactions Dashboard
      </Typography>
      <ProductTransaction/>
      <Statistics/>
      <Barchart/>
    </Box>
  );
};

export default App;

