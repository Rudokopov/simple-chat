import React, { useCallback, useContext, useEffect, useState } from "react";
import "./App.css";
import Header from "./Header";
import Chat from "./Chat";
import { Route, Routes, useNavigate } from "react-router-dom";
import { LoginContext } from "../contexts/LoginContext";
import LoginForm from "./Auth";
import RegForm from "./Registration";
import * as auth from "../utils/Auth";
import { api } from "../utils/Api";
import { UserContext } from "../contexts/UserContext";

export type DataUser = {
  name: string;
  email: string;
};

type MessageData = {
  owner: string;
  text: string;
};

type ServerResponse = {
  token: string;
};

const App: React.FC = () => {
  const navigate = useNavigate();
  const [isLoggin, setLoggin] = useState(false);
  const [currentUser, setCurrentUser] = useState<DataUser | undefined>();
  const [messages, setMessages] = useState<MessageData[]>();

  useEffect(() => {
    tokenCheck();
  }, []);

  const requestUserData = () => {
    Promise.all([api.getProfileInfo()])
      .then(([userData]) => {
        const transformUserData = userData as DataUser;
        // const transformMessagesData = messages as MessageData[];
        setCurrentUser(transformUserData);
        // setMessages(transformMessagesData);
      })

      .catch((err) => console.log(err));
  };

  const tokenCheck = () => {
    const token = localStorage.getItem("jwt");
    try {
      if (token) {
        handleLogin();
        navigate("/chat", { replace: true });
        api.updateAuthorization(token);
        requestUserData(); // вызов функции для обновления данных
      } else {
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const authorization = useCallback(async (email: string, password: string) => {
    await auth
      .authorize(email, password)
      .then((data: ServerResponse) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          handleLogin();
          navigate("/chat", { replace: true });
          tokenCheck();
        }
        return;
      })
      .catch((err: any) => {
        alert(`"Произошла ошибка при авторизации" ${err.name}`);
      });
  }, []);

  const registration = (name: string, email: string, password: string) => {
    auth
      .register(name, email, password)
      .then(() => {
        alert("Вы успешно зарегестрировались! Теперь войдите");
        navigate("/signin", { replace: true });
      })
      .catch((err: any) => {
        alert(`'Произошла ошибка при регистрации' ${err.message}`);
      });
  };

  const signOut = () => {
    localStorage.removeItem("jwt");
    setLoggin(false);
    navigate("/signin", { replace: true });
  };

  const handleLogin = useCallback(() => {
    setLoggin(true);
  }, []);
  return (
    <LoginContext.Provider value={isLoggin}>
      <UserContext.Provider value={currentUser}>
        <div className="App">
          <Header signOut={signOut} />
          <Routes>
            {isLoggin && <Route path="/chat" element={<Chat />} />}
            <Route
              path="/signin"
              element={<LoginForm authorization={authorization} />}
            />
            <Route
              path="/signup"
              element={<RegForm register={registration} />}
            />
          </Routes>
        </div>
      </UserContext.Provider>
    </LoginContext.Provider>
  );
};

export default App;
