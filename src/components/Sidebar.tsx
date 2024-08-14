import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
  Divider,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import InsertChartOutlinedIcon from "@mui/icons-material/InsertChartOutlined";
import ListAltIcon from "@mui/icons-material/ListAlt";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  drawerWidth: number;
  primaryColor: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  open,
  onClose,
  drawerWidth,
  primaryColor,
}) => {
  const menuItems = [
    {
      text: "Dashboard",
      icon: <InsertChartOutlinedIcon sx={{ color: primaryColor }} />,
    },
    { text: "Categorias", icon: <ListAltIcon sx={{ color: "red" }} /> },
  ];
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          padding: "0 8px",
        }}
      >
        <IconButton onClick={onClose}>
          <ChevronLeftIcon />
        </IconButton>
      </Box>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
