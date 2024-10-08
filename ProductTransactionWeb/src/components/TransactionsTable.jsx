import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box,
  Stack,
  Chip,
  TableContainer,
  Paper,
} from "@mui/material";
const TransactionsTable = () => {
  const [month, setMonth] = useState("March");
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const serverurl = "http://localhost:3000";

  const fetchTransactions = async () => {
    const response = await axios.get(`${serverurl}/api/transactions`, {
      params: {
        month,
        search: searchTerm,
        page,
        perPage: 10,
      },
    });
    setTransactions(response.data.transactions);
    setTotalPages(response.data.totalPages);
  };

  useEffect(() => {
    fetchTransactions();
  }, [month, searchTerm, page]);

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <Stack direction="row" spacing={6} sx={{ mb: 2, px: 2 }}>
        <TextField
          fullWidth
          size="small"
          label="Search Transaction"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <FormControl size="small" sx={{ width: "25ch" }}>
          <InputLabel>Select Month</InputLabel>
          <Select value={month} onChange={handleMonthChange}>
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
      <TableContainer component={Paper} sx={{ maxWidth: "100%", marginTop: 4 }}>
        <Table sx={{ p: 4 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#1976d2" }}>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                Count
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                Title
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                Description
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                Price
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                Date of Sale
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                Sold
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                Image
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction, index) => (
              <TableRow
                key={transaction.id}
                sx={{
                  "&:hover": { backgroundColor: "#f0f0f0" },
                  backgroundColor: index % 2 === 0 ? "#ffffff" : "#f9f9f9",
                }}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{transaction.title}</TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>{transaction.price}</TableCell>
                <TableCell>{transaction.dateOfSale}</TableCell>
                <TableCell>{transaction.sold ? "Yes" : "No"}</TableCell>
                <TableCell>
                  <img
                    src={transaction.image}
                    alt={transaction.title}
                    height="100"
                    width="100"
                    style={{ borderRadius: "5px" }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Chip label={"Page No: " + page} variant="outlined" />
        <Box>
          <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
            Previous
          </Button>
          <Button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </Button>
        </Box>
        <Chip label={"Total Pages: " + totalPages} variant="outlined" />
      </Box>
    </>
  );
};

export default TransactionsTable;
