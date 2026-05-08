import {
  Typography,
  Card,
  CardContent,
  Switch,
  FormControlLabel,
  Button
} from "@mui/material";

import { useState, useEffect } from "react";

export default function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("en");


  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    localStorage.setItem("language", language);

    document.body.dir = language === "fa" ? "rtl" : "ltr";
  }, [darkMode, language]);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>

      <Card sx={{ maxWidth: 500, borderRadius: 4 }}>
        <CardContent>


          <FormControlLabel
            control={
              <Switch
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
              />
            }
            label="Dark Mode"
          />


          <div style={{ marginTop: 20 }}>
            <Typography gutterBottom>
              Language
            </Typography>

            <Button
              variant={language === "en" ? "contained" : "outlined"}
              onClick={() => setLanguage("en")}
              sx={{ mr: 2 }}
            >
              English
            </Button>

            <Button
              variant={language === "fa" ? "contained" : "outlined"}
              onClick={() => setLanguage("fa")}
            >
              فارسی
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}