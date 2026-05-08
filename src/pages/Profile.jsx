import {
    Box,
    Card,
    CardContent,
    Typography,
    Avatar,
    TextField,
    Button,
} from "@mui/material";
import { useUser } from "../context/UserContext";
import { useState } from "react";

export default function Profile() {
    const { user, setUser } = useUser();

    const [name, setName] = useState(user.name);

    const handleSave = () => {
        setUser({ name });
    };

    return (
        <Box sx={{ maxWidth: 500, mx: "auto", mt: 4 }}>

            <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
                User Profile
            </Typography>

            <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
                <CardContent sx={{ textAlign: "center" }}>


                    <Avatar
                        sx={{
                            width: 80,
                            height: 80,
                            mx: "auto",
                            mb: 2,
                            bgcolor: "#4cafef",
                        }}
                    >
                        {user.name?.charAt(0).toUpperCase()}
                    </Avatar>


                    <TextField
                        fullWidth
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        sx={{ mb: 2 }}
                    />

                    <Button variant="contained" onClick={handleSave} fullWidth>
                        Save
                    </Button>

                </CardContent>
            </Card>


            <Box sx={{ mt: 3, display: "flex", gap: 2 }}>

                <Card sx={{ flex: 1 }}>
                    <CardContent>
                        <Typography>🔥 XP</Typography>
                        <Typography variant="h6">{user.xp}</Typography>
                    </CardContent>
                </Card>

                <Card sx={{ flex: 1 }}>
                    <CardContent>
                        <Typography>⚡ Streak</Typography>
                        <Typography variant="h6">{user.streak}</Typography>
                    </CardContent>
                </Card>

            </Box>

        </Box>
    );
}