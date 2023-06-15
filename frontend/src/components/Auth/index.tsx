import React, { useState } from "react";
import { styled } from "@mui/system";
import { TextField, Button } from "@mui/material";

const FormContainer = styled("form")({
  display: "flex",
  flexDirection: "column",
  maxWidth: "300px",
  margin: "0 auto",
  marginTop: "16px",
});

const FormField = styled(TextField)({
  marginBottom: "16px",
});

const SubmitButton = styled(Button)({
  marginTop: "16px",
});

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginFormProps {
  authorization: (email: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = (props) => {
  const { authorization } = props;
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();
    authorization(formData.email, formData.password);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormField
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleInputChange}
        required
      />
      <FormField
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleInputChange}
        required
      />
      <SubmitButton variant="contained" color="primary" type="submit">
        Войти
      </SubmitButton>
    </FormContainer>
  );
};

export default LoginForm;
