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
  name: string;
  email: string;
  password: string;
}

interface RegFormProps {
  register: (name: string, email: string, password: string) => void;
}

const RegForm: React.FC<RegFormProps> = (props) => {
  const { register } = props;
  const [formData, setFormData] = useState<LoginFormData>({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();
    try {
      register(formData.name, formData.email, formData.password);
    } catch (err: any) {
      alert(`"Произошла ошибка при регистрации" ${err.message}`);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormField
        label="Name"
        name="name"
        type="text"
        value={formData.name}
        onChange={handleInputChange}
        required
      />
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
        Зарегестрироваться
      </SubmitButton>
    </FormContainer>
  );
};

export default RegForm;
