import { useGoals } from "../context/GoalContext";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  LinearProgress
} from "@mui/material";

export default function Categories() {
  const { goals } = useGoals();


  const categories = [...new Set(goals.map(g => g.category))];


  const categoryStats = categories.map(category => {
    const categoryGoals = goals.filter(g => g.category === category);

    const completed = categoryGoals.filter(
      g => g.status === "completed"
    ).length;

    const active = categoryGoals.filter(
      g => g.status === "active"
    ).length;

    const totalProgress =
      categoryGoals.reduce((sum, g) => {
        return sum + (g.progress / g.target) * 100;
      }, 0) / (categoryGoals.length || 1);

    return {
      category,
      active,
      completed,
      progress: Math.round(totalProgress)
    };
  });

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Categories Overview
      </Typography>

      <Grid container spacing={3}>
        {categoryStats.map(cat => (
          <Grid item xs={12} md={6} lg={4} key={cat.category}>
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
                  {cat.category}
                </Typography>

                <Typography sx={{ mt: 1 }}>
                  Active Goals: {cat.active}
                </Typography>

                <Typography>
                  Completed Goals: {cat.completed}
                </Typography>

                <Typography sx={{ mt: 2 }}>
                  Progress: {cat.progress}%
                </Typography>

                <LinearProgress
                  variant="determinate"
                  value={cat.progress}
                  sx={{
                    mt: 1,
                    height: 10,
                    borderRadius: 5
                  }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {categoryStats.length === 0 && (
        <Typography sx={{ mt: 4 }}>
          No categories yet.
        </Typography>
      )}
    </div>
  );
}