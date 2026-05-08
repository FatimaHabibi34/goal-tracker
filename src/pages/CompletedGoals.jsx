import { useGoals } from "../context/GoalContext";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  LinearProgress
} from "@mui/material";

export default function CompletedGoals() {
  const { goals } = useGoals();

  const completedGoals = goals.filter(
    g => g.status === "completed"
  );

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Completed Goals
      </Typography>

      {completedGoals.length === 0 && (
        <Typography>No completed goals yet.</Typography>
      )}

      <Grid container spacing={3}>
        {completedGoals.map(goal => {
          const percent = Math.round(
            (goal.progress / goal.target) * 100
          );

          return (
            <Grid item xs={12} md={6} lg={4} key={goal.id}>
              <Card
                sx={{
                  borderRadius: 4,
                  transition: "0.3s",
                  "&:hover": {
                    boxShadow: 6,
                    transform: "translateY(-4px)"
                  }
                }}
              >
                <CardContent>
                  <Typography variant="h6">
                    {goal.title}
                  </Typography>

                  <Typography>
                    Category: {goal.category}
                  </Typography>

                  <Typography sx={{ mt: 2 }}>
                    Progress: {percent}%
                  </Typography>

                  <LinearProgress
                    variant="determinate"
                    value={percent}
                    sx={{
                      mt: 1,
                      height: 10,
                      borderRadius: 5
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}