import React, { useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  CssBaseline,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Snackbar,
  Alert,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { useSidebar } from "../contexts/SidebarContext";
import UserAvatar from "../components/UserAvatar";

const drawerWidth = 240;
const primaryColor = "#FF0000";

const Categorias: React.FC = () => {
  const { isOpen, toggleSidebar } = useSidebar();
  const navigate = useNavigate();

  const [categories, setCategories] = useState<string[]>([
    "Aluguel",
    "Alimentação",
    "Transporte",
    "Lazer",
    "Outros",
  ]);
  const [newCategory, setNewCategory] = useState<string>("");
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleLogout = async () => {
    // lógica para limpar o estado de autenticação
    navigate("/login");
  };

  const handleAddCategory = () => {
    if (newCategory.trim() === "") {
      setSnackbarMessage("Por favor, insira um nome para a categoria.");
      setOpenSnackbar(true);
      return;
    }

    if (editIndex !== null) {
      const updatedCategories = [...categories];
      updatedCategories[editIndex] = newCategory;
      setCategories(updatedCategories);
      setEditIndex(null);
      setSnackbarMessage("Categoria editada com sucesso!");
    } else {
      setCategories([...categories, newCategory]);
      setSnackbarMessage("Nova categoria adicionada com sucesso!");
    }
    setNewCategory("");
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleEditCategory = (index: number) => {
    setNewCategory(categories[index]);
    setEditIndex(index);
  };

  const handleDeleteCategory = (index: number) => {
    const deletedCategory = categories[index];
    setCategories(categories.filter((_, i) => i !== index));
    setSnackbarMessage(`Categoria "${deletedCategory}" removida com sucesso!`);
    setOpenSnackbar(true);
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
            Categorias
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

      <Box component="main" sx={{ flexGrow: 1, p: 3, overflowY: "auto" }}>
        <Toolbar />
        <Box
          sx={{
            backgroundColor: "#fff",
            borderRadius: 5,
            padding: 3,
            marginBottom: 2,
          }}
        >
          <Typography variant="h5" gutterBottom>
            Gerenciar Categorias
          </Typography>
          <TextField
            label="Nova Categoria"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            margin="normal"
            sx={{ width: "200px", height: "40px" }}
            InputProps={{
              sx: {
                height: "100%",
                "& .MuiInputBase-input": {
                  height: "100%",
                  padding: "10px",
                  boxSizing: "border-box",
                },
              },
            }}
            InputLabelProps={{
              sx: {
                lineHeight: "13px",
              },
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                handleAddCategory();
              }
            }}
          />
          <Button
            variant="contained"
            sx={{
              backgroundColor: primaryColor,
              color: "#fff",
              mt: 2,
              ml: 2,
              "&:hover": {
                backgroundColor: "#FF4500",
              },
            }}
            onClick={handleAddCategory}
          >
            {editIndex !== null ? "Editar Categoria" : "Adicionar Categoria"}
          </Button>
        </Box>
        <Box sx={{ maxHeight: 300, overflowY: "auto" }}>
          <List sx={{ padding: 0 }}>
            {categories.map((category, index) => (
              <ListItem key={index} sx={{ borderBottom: "1px solid #ccc" }}>
                <ListItemText primary={category} />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="edit"
                    onClick={() => handleEditCategory(index)}
                    sx={{ color: "blue" }}
                    title="Editar"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDeleteCategory(index)}
                    sx={{ color: "red" }}
                    title="Excluir"
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{
          top: { xs: 72, sm: 80 },
          right: { xs: 16, sm: 24 },
        }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={
            snackbarMessage.includes("Por favor")
              ? "error"
              : snackbarMessage.includes("removida")
              ? "info"
              : "success"
          }
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Categorias;
