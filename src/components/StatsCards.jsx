import { Grid, Card, CardContent, Typography } from "@mui/material"

export default function StatsCards({ goals = [] }) {
    const active = goals.filter((g) => g.status === "active").length;
    const completed = goals.filter((g) => g.status === "completed").length;

    const total = goals.length;

    return (
        <Grid container spacing={2} sx={{ mb: 3 }}>


            <Grid item xs={12} md={4}>
                <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            Total Goals
                        </Typography>
                        <Typography variant="h4" fontWeight="bold">
                            {total}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>


            <Grid item xs={12} md={4}>
                <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            Active
                        </Typography>
                        <Typography variant="h4" fontWeight="bold" color="primary">
                            {active}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>


            <Grid item xs={12} md={4}>
                <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            Completed
                        </Typography>
                        <Typography variant="h4" fontWeight="bold" color="success.main">
                            {completed}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>

        </Grid>
    );
}