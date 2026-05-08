import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/AppRouter";
import { GoalProvider } from "./context/GoalContext";
import { LanguageProvider } from "./context/LanguageContext";
import { ThemeProvider } from "./context/ThemeContext";
import { createTheme } from "@mui/material/styles";
import { UserProvider } from "./context/UserContext";
import { useState } from "react";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });
  return (

    <ThemeProvider theme={theme}>

      <UserProvider></UserProvider>
      <LanguageProvider>
        <GoalProvider>
          <BrowserRouter>
            <AppRouter />
          </BrowserRouter>
        </GoalProvider>
      </LanguageProvider>
      );

    </ThemeProvider>

  );



}
