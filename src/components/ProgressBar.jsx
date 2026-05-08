import { Box, LinearProgress, Typography } from "@mui/material";

export default function ProgressBar({ value }) {
    const getColor = () => {
        if (value >= 100) return "success";
        if (value >= 50) return "primary";
        return "warning";
    };

    return (
        <Box>
            <LinearProgress
                variant="determinate"
                value={value}
                color={getColor()}
                sx={{
                    height: 10,
                    borderRadius: 5,
                    mb: 1,
                }}
            />

            <Typography variant="body2" align="right">
                {Math.round(value)}%
            </Typography>
        </Box>
    );
}