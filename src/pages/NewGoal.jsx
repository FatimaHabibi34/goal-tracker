import { useState } from "react";
import { useGoals } from "../context/GoalContext";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Alert,
} from "@mui/material";

export default function NewGoal() {
  const { addGoal } = useGoals();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    category: "",
    type: "daily",
    target: 1,
  });

  const [error, setError] = useState("");

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: field === "target" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title.trim() || !form.category || form.target <= 0) {
      setError("Please fill all fields correctly.");
      return;
    }

    addGoal({
      ...form,
      title: form.title.trim(),
    });

    navigate("/");
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
      <Card sx={{ width: 400, borderRadius: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
            Create New Goal
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>


            <TextField
              label="Title"
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
              fullWidth
            />


            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={form.category}
                label="Category"
                onChange={(e) => handleChange("category", e.target.value)}
              >
                <MenuItem value="Health">Health</MenuItem>
                <MenuItem value="Study">Study</MenuItem>
                <MenuItem value="Work">Work</MenuItem>
                <MenuItem value="Personal">Personal</MenuItem>
              </Select>
            </FormControl>


            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                value={form.type}
                label="Type"
                onChange={(e) => handleChange("type", e.target.value)}
              >
                <MenuItem value="daily">Daily</MenuItem>
                <MenuItem value="count">Count</MenuItem>
                <MenuItem value="time">Time</MenuItem>
              </Select>
            </FormControl>


            <TextField
              label="Target"
              type="number"
              inputProps={{ min: 1 }}
              value={form.target}
              onChange={(e) => handleChange("target", e.target.value)}
              fullWidth
            />


            <Box sx={{ display: "flex", gap: 2 }}>
              <Button type="submit" variant="contained" fullWidth>
                Save
              </Button>

              <Button
                variant="outlined"
                fullWidth
                onClick={() => navigate("/")}
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