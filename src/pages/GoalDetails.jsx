import { useParams, useNavigate } from "react-router-dom";
import { useGoals } from "../context/GoalContext";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  LinearProgress,
  Chip,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

export default function GoalDetails() {
  const { id } = useParams();
  const { goals } = useGoals();
  const navigate = useNavigate();

  const goal = goals.find((g) => g.id === Number(id));

  if (!goal) {
    return (
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <Typography>Goal not found</Typography>
      </Box>
    );
  }

  const percent = Math.min(
    100,
    Math.round(
      goal.target > 0 ? (goal.progress / goal.target) * 100 : 0
    )
  );

  const getStatusColor = () => {
    if (goal.status === "completed") return "success";
    if (goal.status === "paused") return "warning";
    return "primary";
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
      <Card sx={{ width: 550, borderRadius: 3, boxShadow: 3 }}>
        <CardContent>

          {/* TITLE */}
          <Typography variant="h5" fontWeight="bold">
            {goal.title}
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {goal.category}
          </Typography>

          {/* STATUS CHIP */}
          <Chip
            label={goal.status}
            color={getStatusColor()}
            sx={{ mb: 2 }}
          />

          {/* PROGRESS */}
          <Box sx={{ mt: 2 }}>
            <LinearProgress
              variant="determinate"
              value={percent}
              sx={{ height: 10, borderRadius: 5 }}
            />

            <Typography sx={{ mt: 1 }}>
              {goal.progress} / {goal.target} ({percent}%)
            </Typography>
          </Box>

          {/* LOGS */}
          <Typography sx={{ mt: 3, mb: 1 }} fontWeight="bold">
            Activity Timeline
          </Typography>

          {goal.logs?.length ? (
            <List>
              {goal.logs.map((log, i) => (
                <ListItem key={i}>
                  <ListItemText
                    primary={`✔ ${log.date}`}
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography color="text.secondary">
              No activity yet
            </Typography>
          )}

          {/* ACTIONS */}
          <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
            <Button
              variant="contained"
              fullWidth
              onClick={() =>
                navigate(`/goals/edit/${goal.id}`)
              }
            >
              Edit
            </Button>

            <Button
              variant="outlined"
              fullWidth
              onClick={() => navigate("/goals")}
            >
              Back
            </Button>
          </Box>

        </CardContent>
      </Card>
    </Box>
  );
}