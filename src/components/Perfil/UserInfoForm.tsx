import React, { useState } from "react";
import { TextField, Button, Avatar, Box } from "@mui/material";

interface UserInfo {
  name: string;
  email: string;
  profilePicture: string;
  newPassword?: string;
}

interface UserInfoFormProps {
  initialUserInfo: UserInfo;
  onSubmit: (userInfo: UserInfo) => void;
  isEditable?: boolean;
}

const UserInfoForm: React.FC<UserInfoFormProps> = ({
  initialUserInfo,
  onSubmit,
  isEditable = true,
}) => {
  const [userInfo, setUserInfo] = useState<UserInfo>(initialUserInfo);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(userInfo);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: "100%",
        maxWidth: "400px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        alignSelf: "flex-start",
        marginLeft: "-15px",
        marginTop: "30px",
        marginRight: "50px",
      }}
    >
      <Avatar
        src={userInfo.profilePicture}
        sx={{ width: 100, height: 100, margin: "20px auto" }}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Nome"
        name="name"
        value={userInfo.name}
        onChange={handleChange}
        disabled={!isEditable}
      />
      <TextField
        fullWidth
        margin="normal"
        label="E-mail"
        name="email"
        type="email"
        value={userInfo.email}
        onChange={handleChange}
        disabled={!isEditable}
      />
      {isEditable && (
        <TextField
          fullWidth
          margin="normal"
          label="Nova Senha"
          name="newPassword"
          type="password"
          value={userInfo.newPassword || ""}
          onChange={handleChange}
        />
      )}
      {isEditable && (
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2, width: "100%" }}
        >
          Salvar Alterações
        </Button>
      )}
    </Box>
  );
};
export default UserInfoForm;
