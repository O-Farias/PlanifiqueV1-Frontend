import React, { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
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
  const [openDialog, setOpenDialog] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState<string | null>(
    null
  );

  const handleOpenDialog = (id: string) => {
    setTransactionToDelete(id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setTransactionToDelete(null);
  };

  const handleConfirmDelete = () => {
    if (transactionToDelete) {
      onDeleteTransaction(transactionToDelete);
      handleCloseDialog();
    }
  };

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
                    <EditIcon sx={{ color: "#1976d2" }} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Excluir">
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleOpenDialog(transaction.id)}
                  >
                    <DeleteIcon sx={{ color: "#d32f2f" }} />
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
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirmar exclusão"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Tem certeza que deseja remover esta transação?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleConfirmDelete} autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TransactionList;
