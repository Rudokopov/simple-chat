import React from "react";
import { DataUser } from "../components/App";

export const UserContext = React.createContext<DataUser | undefined>(undefined);
