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
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const Barchart = () => {
  const [monthB, setMonthB] = useState("March");
  const [barChartData, setBarChartData] = useState([]);
  const [scale, setScale] = useState(0);
  const [stepSize, setStepSize] = useState(1);
  const serverurl = "http://localhost:3000";

  const fetchBarChartData = async () => {
    const response = await axios.get(`${serverurl}/api/bar-chart/${monthB}`);
    const data = response.data.barChartData;
    let bardata = { count: [], range: [] };
    for (let i in data) {
      bardata.count.push(data[i].count);
      bardata.range.push(data[i].range);
    }
    const size = Math.max(...bardata.count);
    setScale(size + 2);
    setStepSize(Math.ceil(size / 5));
    setBarChartData(bardata);
  };

  useEffect(() => {
    fetchBarChartData();
  }, [monthB]);

  const handleMonthBChange = (event) => {
    setMonthB(event.target.value);
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
          Transactions Bar Chart
        </Typography>
        <FormControl size="small">
          <InputLabel>Select Month</InputLabel>
          <Select
            value={monthB}
            onChange={handleMonthBChange}
            sx={{ width: "25ch" }}
          >
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

      <Box sx={{ mt: 2, height: 300 }}>
        <Bar
          data={{
            labels: barChartData.range,
            datasets: [
              {
                label: "Number of Items",
                data: barChartData.count,
                backgroundColor: "rgba(75,192,192,1)",
                borderColor: "rgba(75,192,192,1)",
                borderWidth: 1,
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                min: 0,
                max: scale,
                ticks: {
                  stepSize: stepSize,
                },
              },
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default Barchart;
