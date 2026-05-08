import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  Typography,
  Button,
  LinearProgress,
  Chip,
  Stack
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import EditIcon from "@mui/icons-material/Edit";
import ProgressBar from "../components/ProgressBar";

export default function GoalCard({ goal, onProgress, onEdit }) {
  const percent = Math.min(
    goal.target > 0
      ? Math.round((goal.progress / goal.target) * 100)
      : 0,
    100
  );

  const isCompleted = goal.status === "completed";
  const isPaused = goal.status === "paused";
  // const percent = (goal.progress / goal.target) * 100;
  <ProgressBar value={percent} />

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        sx={{
          mb: 2,
          borderRadius: 3,
          transition: "0.3s",
          opacity: isPaused ? 0.6 : 1,
          "&:hover": {
            boxShadow: 6,
            transform: "translateY(-3px)"
          }
        }}
      >
        <CardContent>
          {/* Title + Status */}
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h6">{goal.title}</Typography>

            <Chip
              label={goal.status}
              color={
                isCompleted
                  ? "success"
                  : isPaused
                    ? "warning"
                    : "primary"
              }
              size="small"
            />
          </Stack>

          <Typography variant="body2" sx={{ mb: 1 }}>
            {goal.category}
          </Typography>

          {/* Progress */}
          <LinearProgress
            variant="determinate"
            value={percent}
            sx={{
              my: 2,
              height: 10,
              borderRadius: 5
            }}
          />

          <Typography sx={{ mb: 1 }}>{percent}%</Typography>

          {/* Actions */}
          <Stack direction="row" spacing={1}>
            <Button
              onClick={onProgress}
              startIcon={<StarIcon />}
              variant="contained"
              disabled={isCompleted || isPaused}
            >
              Add
            </Button>

            <Button
              onClick={onEdit}
              startIcon={<EditIcon />}
              variant="outlined"
            >
              Edit
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </motion.div>
  );
}