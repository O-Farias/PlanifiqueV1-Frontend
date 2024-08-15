import React, { useState } from "react";
import { Box, Button, TextField, Typography, Container } from "@mui/material";
import { Link } from "react-router-dom";

const Cadastro: React.FC = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Tentativa de cadastro com:", nome, email, senha);
    // lógica de cadastro
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background:
          "linear-gradient(-45deg, #e0e0e0, #b0bec5, #78909c, #546e7a)",
        backgroundSize: "400% 400%",
        animation: "gradientBG 15s ease infinite",
        "@keyframes gradientBG": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      }}
    >
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            padding: 3,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
            Cadastro
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ width: "100%" }}
          >
            <TextField
              margin="normal"
              fullWidth
              id="nome"
              label="Nome"
              name="nome"
              autoComplete="name"
              autoFocus
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              InputLabelProps={{ required: false }}
            />
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="E-mail"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputLabelProps={{ required: false }}
            />
            <TextField
              margin="normal"
              fullWidth
              name="senha"
              label="Senha"
              type="password"
              id="senha"
              autoComplete="new-password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              InputLabelProps={{ required: false }}
            />
            <TextField
              margin="normal"
              fullWidth
              name="confirmarSenha"
              label="Confirmar Senha"
              type="password"
              id="confirmarSenha"
              autoComplete="new-password"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              InputLabelProps={{ required: false }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Cadastrar
            </Button>
            <Box sx={{ textAlign: "center", mt: 2 }}>
              <Typography variant="body2" component="span">
                Já possui uma conta?{" "}
                <Link to="/login" style={{ textDecoration: "none" }}>
                  <Typography variant="body2" component="span" color="primary">
                    Clique aqui para fazer login
                  </Typography>
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Cadastro;
