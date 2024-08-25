import React, { useState } from 'react';
import { Box, TextField, Button, MenuItem, Typography } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

interface Transaction {
    description: string;
    category: string;
    amount: number;
    date: Date | null;
}

const categories = ['Aluguel', 'Alimentação', 'Transporte', 'Lazer', 'Outros'];

const TransactionForm: React.FC = () => {
    const [transaction, setTransaction] = useState<Transaction>({
        description: '',
        category: '',
        amount: 0,
        date: null,
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setTransaction(prev => ({ ...prev, [name]: value }));
    };

    const handleDateChange = (date: Date | null) => {
        setTransaction(prev => ({ ...prev, date }));
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // lógica para salvar a transação
        console.log('Transação submetida:', transaction);
        // Limpar o formulário após o envio
        setTransaction({ description: '', category: '', amount: 0, date: null });
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
                value={transaction.amount}
                onChange={handleChange}
                margin="normal"
                required
                InputProps={{
                    startAdornment: <Typography>R$</Typography>,
                }}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    label="Data"
                    value={transaction.date}
                    onChange={handleDateChange}
                    slotProps={{
                        textField: {
                            fullWidth: true,
                            margin: "normal",
                            required: true,
                        },
                    }}
                />
            </LocalizationProvider>
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                Adicionar Transação
            </Button>
        </Box>
    );
};

export default TransactionForm;