import React, { useState, useEffect } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  CssBaseline,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useSidebar } from "../contexts/SidebarContext";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import UserAvatar from "../components/UserAvatar";
import TransactionForm from "../components/Transacoes/TransactionForm";
import TransactionList from "../components/Transacoes/TransactionList";

const drawerWidth = 240;
const primaryColor = "#008000";

interface Transaction {
  id: string;
  description: string;
  category: string;
  amount: number;
  date: Date;
}

const Transacoes: React.FC = () => {
  const { isOpen, toggleSidebar } = useSidebar();
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null);

  useEffect(() => {
    const storedTransactions = localStorage.getItem("transactions");
    if (storedTransactions) {
      setTransactions(JSON.parse(storedTransactions));
    }
  }, []);

  const updateLocalStorage = (updatedTransactions: Transaction[]) => {
    localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
  };

  const handleAddTransaction = (transaction: Transaction) => {
    const updatedTransactions = [...transactions, transaction];
    setTransactions(updatedTransactions);
    updateLocalStorage(updatedTransactions);
  };

  const handleUpdateTransaction = (updatedTransaction: Transaction) => {
    const updatedTransactions = transactions.map((t) =>
      t.id === updatedTransaction.id ? updatedTransaction : t
    );
    setTransactions(updatedTransactions);
    updateLocalStorage(updatedTransactions);
    setEditingTransaction(null);
  };

  const handleEditTransaction = (transaction: Transaction) => {
    setEditingTransaction(transaction);
  };

  const handleDeleteTransaction = (id: string) => {
    const updatedTransactions = transactions.filter((t) => t.id !== id);
    setTransactions(updatedTransactions);
    updateLocalStorage(updatedTransactions);
  };

  const handleLogout = async () => {
    navigate("/login");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: primaryColor,
          zIndex: (theme) => theme.zIndex.drawer + 1,
          transition: (theme) =>
            theme.transitions.create(["width", "margin"], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          ...(isOpen && {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: (theme) =>
              theme.transitions.create(["width", "margin"], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
          }),
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleSidebar}
            edge="start"
            sx={{
              marginRight: 5,
              ...(isOpen && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Transações
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "flex-end",
              marginRight: 5,
            }}
          >
            <UserAvatar onLogout={handleLogout} size={50} />
          </Box>
        </Toolbar>
      </AppBar>

      <Sidebar drawerWidth={drawerWidth} onLogout={handleLogout} />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <TransactionForm
          onAddTransaction={handleAddTransaction}
          onUpdateTransaction={handleUpdateTransaction}
          editingTransaction={editingTransaction}
        />
        <TransactionList
          transactions={transactions}
          onEditTransaction={handleEditTransaction}
          onDeleteTransaction={handleDeleteTransaction}
        />
      </Box>
    </Box>
  );
};

export default Transacoes;
