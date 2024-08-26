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

  const handleLogout = async () => {
    // lógica para limpar o estado de autenticação
    navigate("/login");
  };

  const handleAddCategory = () => {
    if (editIndex !== null) {
      const updatedCategories = [...categories];
      updatedCategories[editIndex] = newCategory;
      setCategories(updatedCategories);
      setEditIndex(null);
    } else {
      setCategories([...categories, newCategory]);
    }
    setNewCategory("");
  };

  const handleEditCategory = (index: number) => {
    setNewCategory(categories[index]);
    setEditIndex(index);
  };

  const handleDeleteCategory = (index: number) => {
    setCategories(categories.filter((_, i) => i !== index));
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

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Box>
          <TextField
            label="Nova Categoria"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddCategory}
            sx={{ mt: 2, ml: 2 }}
          >
            {editIndex !== null ? "Editar Categoria" : "Adicionar Categoria"}
          </Button>
        </Box>
        <List>
          {categories.map((category, index) => (
            <ListItem key={index}>
              <ListItemText primary={category} />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="edit"
                  onClick={() => handleEditCategory(index)}
                  sx={{ color: "blue" }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDeleteCategory(index)}
                  sx={{ color: "red" }}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default Categorias;
