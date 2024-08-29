import React, { useState } from "react";
import { Box, TextField, Button, MenuItem, Typography } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ptBR } from "date-fns/locale";

interface Transaction {
  id: string;
  description: string;
  category: string;
  amount: number;
  date: Date;
}

const categories = ["Aluguel", "Alimentação", "Transporte", "Lazer", "Outros"];

const TransactionForm: React.FC<{
  onAddTransaction: (transaction: Transaction) => void;
}> = ({ onAddTransaction }) => {
  const [transaction, setTransaction] = useState<Transaction>({
    id: "",
    description: "",
    category: "",
    amount: 0,
    date: new Date(),
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "amount") {
      // Permite campo vazio ou valores positivos
      const numValue = value === "" ? 0 : parseFloat(value);
      if (value === "" || numValue > 0) {
        setTransaction((prev) => ({ ...prev, [name]: numValue }));
      }
    } else {
      setTransaction((prev) => ({ ...prev, [name]: value }));
    }
  };
  const handleDateChange = (date: Date) => {
    setTransaction((prev) => ({ ...prev, date }));
  };

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    if (event.target.value === "0") {
      setTransaction((prev) => ({ ...prev, amount: 0 }));
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (event.target.value === "") {
      setTransaction((prev) => ({ ...prev, amount: 0 }));
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (transaction.amount <= 0) {
      alert("O valor da transação deve ser maior que zero.");
      return;
    }
    const newTransaction = {
      ...transaction,
      id: Date.now().toString(),
      amount: Number(transaction.amount),
    };
    onAddTransaction(newTransaction);
    // Limpar o formulário após o envio
    setTransaction({
      id: "",
      description: "",
      category: "",
      amount: 0,
      date: new Date(),
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Typography variant="h5" gutterBottom>
        Adicionar Nova Transação
      </Typography>
      <TextField
        fullWidth
        label="Descrição"
        name="description"
        value={transaction.description}
        onChange={handleChange}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        select
        label="Categoria"
        name="category"
        value={transaction.category}
        onChange={handleChange}
        margin="normal"
        required
      >
        {categories.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        fullWidth
        label="Valor"
        name="amount"
        type="number"
        value={transaction.amount === 0 ? "" : transaction.amount}
        onChange={handleChange}
        margin="normal"
        required
        InputProps={{
          startAdornment: <Typography>R$</Typography>,
          inputProps: {
            min: "0.01",
            step: "0.01",
          },
        }}
        sx={{
          "& input[type=number]": {
            MozAppearance: "textfield",
          },
          "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button":
            {
              WebkitAppearance: "none",
              margin: 0,
            },
        }}
      />
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
        <DatePicker
          label="Data"
          value={transaction.date}
          onChange={(newDate) => handleDateChange(newDate || new Date())}
          slotProps={{
            textField: {
              fullWidth: true,
              margin: "normal",
              required: true,
            },
          }}
        />
      </LocalizationProvider>
      <Button
        type="submit"
        variant="contained"
        sx={{
          backgroundColor: "green",
          color: "#fff",
          mt: 2,
          "&:hover": {
            backgroundColor: "darkgreen",
          },
        }}
      >
        Adicionar Transação
      </Button>
    </Box>
  );
};

export default TransactionForm;
