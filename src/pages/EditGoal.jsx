import { useParams, useNavigate } from "react-router-dom";
import { useGoals } from "../context/GoalContext";
import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Alert,
  MenuItem,
  Skeleton,
} from "@mui/material";

export default function EditGoal() {
  const { id } = useParams();
  const { goals, updateGoal } = useGoals();
  const navigate = useNavigate();

  const goal = useMemo(
    () => goals.find((g) => g.id === Number(id)),
    [goals, id]
  );

  const [form, setForm] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);


  useEffect(() => {
    if (goal) {
      setForm(JSON.parse(JSON.stringify(goal)));
    }
  }, [goal]);

  const isValid =
    form &&
    form.title.trim().length > 0 &&
    Number(form.target) > 0;

  const isDirty =
    goal &&
    form &&
    (form.title !== goal.title ||
      form.target !== goal.target ||
      form.category !== goal.category ||
      form.type !== goal.type);

  const handleSave = () => {
    if (!isValid) {
      setError("Please fill fields correctly.");
      return;
    }

    updateGoal({
      ...form,
      title: form.title.trim(),
    });

    setSuccess(true);


    setTimeout(() => navigate("/goals"), 700);
  };

  if (!goal || !form) {
    return (
      <Box sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
        <Skeleton height={40} />
        <Skeleton height={80} />
        <Skeleton height={80} />
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
      <Card sx={{ width: 420, borderRadius: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
            Edit Goal
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Changes saved ✅
            </Alert>
          )}

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>

            <TextField
              label="Title"
              value={form.title}
              onChange={(e) =>
                setForm((p) => ({ ...p, title: e.target.value }))
              }
              fullWidth
              autoFocus
            />


            <TextField
              select
              label="Category"
              value={form.category || ""}
              onChange={(e) =>
                setForm((p) => ({ ...p, category: e.target.value }))
              }
              fullWidth
            >
              {["Health", "Study", "Work", "Personal"].map((c) => (
                <MenuItem key={c} value={c}>
                  {c}
                </MenuItem>
              ))}
            </TextField>


            <TextField
              select
              label="Type"
              value={form.type || "daily"}
              onChange={(e) =>
                setForm((p) => ({ ...p, type: e.target.value }))
              }
              fullWidth
            >
              <MenuItem value="daily">Daily</MenuItem>
              <MenuItem value="count">Count</MenuItem>
              <MenuItem value="time">Time</MenuItem>
            </TextField>


            <TextField
              label="Target"
              type="number"
              inputProps={{ min: 1 }}
              value={form.target}
              onChange={(e) =>
                setForm((p) => ({
                  ...p,
                  target: Number(e.target.value),
                }))
              }
              fullWidth
            />


            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                variant="contained"
                fullWidth
                onClick={handleSave}
                disabled={!isValid || !isDirty}
              >
                Save Changes
              </Button>

              <Button
                variant="outlined"
                fullWidth
                onClick={() => navigate("/goals")}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}