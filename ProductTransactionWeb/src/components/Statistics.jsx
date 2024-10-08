import { useEffect, useState } from "react";
import axios from "axios";
import {
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box,
  Stack,
  Typography,
} from "@mui/material";

const Statistics = () => {
  const [monthS, setMonthS] = useState("March");
  const [statistics, setStatistics] = useState({});

  const serverurl = "http://localhost:3000";

  const fetchStatistics = async () => {
    const response = await axios.get(`${serverurl}/api/statistics/${monthS}`);
    setStatistics(response.data.statistics);
  };

  useEffect(() => {
    fetchStatistics();
  }, [monthS]);

  const handleMonthSChange = (event) => {
    setMonthS(event.target.value);
  };

  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
        borderRadius: "8px",
        padding: 3,
        boxShadow: 2,
        mt: 4,
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" color="#1976d2" fontWeight="bold">
          Transactions Statistics
        </Typography>
        <FormControl size="small" sx={{ width: "25ch" }}>
          <InputLabel>Select Month</InputLabel>
          <Select value={monthS} onChange={handleMonthSChange}>
            {[
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ].map((m) => (
              <MenuItem key={m} value={m}>
                {m}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
      <Box sx={{ marginTop: 2 }}>
        <Typography variant="h6">
          Total Sales: ${statistics.totalSales}
        </Typography>
        <Typography variant="h6">
          Total Sold Items: {statistics.totalSoldItems}
        </Typography>
        <Typography variant="h6">
          Total Not Sold Items: {statistics.totalNotSoldItems}
        </Typography>
      </Box>
    </Box>
  );
};

export default Statistics;
