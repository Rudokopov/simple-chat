import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import { LoginContext } from "../../contexts/LoginContext";

interface HeaderProps {
  signOut: () => void;
}

const Header: React.FC<HeaderProps> = (props) => {
  const isLoggin = useContext(LoginContext);
  const { signOut } = props;
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            SimpleChat
          </Typography>
          <Link className={styles.link} to="/signup">
            Регистрация
          </Link>
          <Link className={styles.link} to="/signin">
            Вход
          </Link>
          {isLoggin ? (
            <Button onClick={signOut} color="inherit">
              Logout
            </Button>
          ) : (
            ""
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
