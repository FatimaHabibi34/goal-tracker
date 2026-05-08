import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div
            style={{
                height: "80vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <Typography variant="h2" gutterBottom>
                404
            </Typography>

            <Typography variant="h5" gutterBottom>
                Page Not Found
            </Typography>

            <Button
                component={Link}
                to="/"
                variant="contained"
                sx={{ mt: 2 }}
            >
                Go Home
            </Button>
        </div>
    );
}