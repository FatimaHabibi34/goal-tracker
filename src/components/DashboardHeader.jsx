import { Box, Typography, Button, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useGoals } from "../context/GoalContext";
import { useThemeMode } from "../context/ThemeContext";
import LanguageToggle from "./LanguageToggle";


export default function DashboardHeader({ title }) {
    const navigate = useNavigate();
    const { xp, streak } = useGoals();
    const { darkMode, toggleDark } = useThemeMode();

    return (
        <Box>
            <Box sx={{ display: "flex", gap: 2 }}>
                <LanguageToggle />
            </Box>
            <Box sx={{ mb: 1 }}>
                <Button onClick={toggleDark}>
                    {darkMode ? "🌙 Dark" : "☀️ Light"}
                </Button>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3,
                    p: 2,
                    borderRadius: 3,
                    bgcolor: "background.paper",
                    boxShadow: 1,
                    position: "sticky",
                    top: 0,
                    zIndex: 10,
                }}
            >

                <Box>
                    <Typography variant="h5" fontWeight="bold">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Keep going 🔥
                    </Typography>
                </Box>


                <Box sx={{ display: "flex", gap: 2 }}>
                    <Typography>🔥 XP: {xp}</Typography>
                    <Typography>⚡ Streak: {streak}</Typography>
                </Box>


                <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                    <Button variant="contained" onClick={() => navigate("/goals/new")}>
                        + New Goal
                    </Button>

                    <Avatar sx={{ bgcolor: "#4cafef" }}>F</Avatar>
                </Box>
            </Box>
        </Box>
    );
}