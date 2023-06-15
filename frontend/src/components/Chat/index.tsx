import React, { useState, useEffect, useContext } from "react";
import { styled } from "@mui/system";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { api } from "../../utils/Api";
import { DataUser } from "../App";

const ChatContainer = styled("div")({
  display: "flex",
  height: "100vh",
});

const UserCard = styled(Card)(({ theme }) => ({
  minWidth: "250px",
  backgroundColor: "#f5f5f5",
  padding: theme.spacing(2),
}));

const ChatWindow = styled("div")(({ theme }) => ({
  flex: "1",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  padding: theme.spacing(2),
  overflowY: "scroll",
}));

const MessageCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const InputContainer = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginTop: theme.spacing(2),
}));

const InputField = styled(TextField)(({ theme }) => ({
  flex: "1",
  marginRight: theme.spacing(2),
}));

const UserContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
}));

interface Message {
  id: string;
  text: string;
  owner: {
    name: string;
    email: string;
  };
}

export interface User {
  _id: string;
  name: string;
  email: string;
}

const Chat: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [selectedUser, setSelectedUser] = useState<string>();

  useEffect(() => {
    loadUsers();
  }, []);

  const handleUserClick = async (userId: string) => {
    try {
      // Загрузка сообщений между текущим пользователем и выбранным пользователем
      const messages = await loadMessages(userId);

      // Обновление состояния чата с новыми сообщениями
      setMessages(messages);
      setSelectedUser(userId);
    } catch (error) {
      console.log("Ошибка при загрузке сообщений:", error);
    }
  };

  const loadUsers = async () => {
    try {
      const data: User[] = await api.getUsers();
      setUsers(data);
    } catch (err) {
      alert("Произошла ошибка при получении пользователей с сервера");
    }
  };

  const loadMessages = async (userId: string) => {
    try {
      // Загрузка сообщений между текущим пользователем и выбранным пользователем
      const data: Message[] = await api.getMessages(userId);
      return data;
    } catch (err: any) {
      alert(
        `Произошла ошибка при получении сообщений с сервера ${err.message}`
      );
      return [];
    }
  };

  const sendMessage = async () => {
    try {
      if (selectedUser) {
        await api.createNewMessage(inputText, selectedUser);
        const updatedMessages = await loadMessages(selectedUser);
        setMessages(updatedMessages);
        setInputText("");
      }
    } catch (err: any) {
      alert(`"Произошла ошибка при отправке сообщения" ${err.message}`);
    }
  };

  return (
    <ChatContainer>
      <UserCard>
        <CardContent>
          <Typography variant="h6" gutterBottom marginBottom={5}>
            Имя пользователя
          </Typography>
          {users.map((user) => (
            <UserContainer key={user._id}>
              <Button onClick={() => handleUserClick(user._id)} variant="text">
                <Typography variant="h6">
                  {user.name} <br />
                  {user.email}
                </Typography>
              </Button>
            </UserContainer>
          ))}
        </CardContent>
      </UserCard>
      <ChatWindow>
        <>
          {messages.map((message, i) => (
            <MessageCard key={i}>
              <CardContent>
                <Typography variant="h4">{message.owner.name}</Typography>
                <Typography variant="body1">{message.text}</Typography>
              </CardContent>
            </MessageCard>
          ))}
          <InputContainer>
            <InputField
              label="Введите сообщение"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={sendMessage}>
              Отправить
            </Button>
          </InputContainer>
        </>
      </ChatWindow>
    </ChatContainer>
  );
};

export default Chat;
