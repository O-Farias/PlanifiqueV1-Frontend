import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface Transaction {
  id: string;
  description: string;
  category: string;
  amount: number;
  date: Date;
}

interface TransactionListProps {
  transactions: Transaction[];
  onEditTransaction: (transaction: Transaction) => void;
  onDeleteTransaction: (id: string) => void;
}

const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  onEditTransaction,
  onDeleteTransaction,
}) => {
  return (
    <Box>
      <List>
        {transactions.map((transaction) => (
          <ListItem
            key={transaction.id}
            secondaryAction={
              <>
                <Tooltip title="Editar">
                  <IconButton
                    edge="end"
                    aria-label="edit"
                    onClick={() => onEditTransaction(transaction)}
                  >
                    <EditIcon sx={{ color: "#1976d2" }} />{" "}
                  </IconButton>
                </Tooltip>
                <Tooltip title="Excluir">
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => onDeleteTransaction(transaction.id)}
                  >
                    <DeleteIcon sx={{ color: "#d32f2f" }} />{" "}
                  </IconButton>
                </Tooltip>
              </>
            }
          >
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
