import React from "react";
import { Box, List, ListItem, ListItemText } from "@mui/material";

interface Transaction {
  id: string;
  description: string;
  category: string;
  amount: number;
  date: Date;
}

interface TransactionListProps {
  transactions: Transaction[];
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  return (
    <Box>
      <List>
        {transactions.map((transaction) => (
          <ListItem key={transaction.id}>
            <ListItemText
              primary={transaction.description}
              secondary={`Categoria: ${
                transaction.category
              } | Valor: R$${transaction.amount.toFixed(2)} | Data: ${new Date(
                transaction.date
              ).toLocaleDateString()}`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default TransactionList;
