import { useGoals } from "../context/GoalContext";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../components/ProgressBar";

import {
  Box,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  Chip,
  Card,
  CardContent,
  Grid,
  Stack,
} from "@mui/material";

export default function Goals() {
  const { goals, deleteGoal, toggleStatus } = useGoals();

  const navigate = useNavigate();

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");


  const filtered = useMemo(() => {
    let data = [...goals];


    if (filter !== "all") {
      data = data.filter((g) => g.status === filter);
    }


    data = data.filter((g) =>
      g.title.toLowerCase().includes(search.toLowerCase())
    );


    data.sort((a, b) => {
      if (sort === "newest") return b.id - a.id;

      if (sort === "progress") {
        return (
          b.progress / b.target -
          a.progress / a.target
        );
      }

      if (sort === "category") {
        return a.category.localeCompare(b.category);
      }

      return 0;
    });

    return data;
  }, [goals, filter, search, sort]);


  const handleDelete = (id) => {
    if (window.confirm("Delete this goal?")) {
      deleteGoal(id);
    }
  };

  return (
    <Box sx={{ p: 2 }}>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4">
          Goals
        </Typography>

        <Button
          variant="contained"
          onClick={() => navigate("/goals/new")}
        >
          + New Goal
        </Button>
      </Box>


      <Stack
        direction="row"
        spacing={1}
        sx={{ mb: 2, flexWrap: "wrap" }}
      >
        {["all", "active", "completed", "paused"].map(
          (f) => (
            <Chip
              key={f}
              label={f}
              clickable
              color={
                filter === f
                  ? "primary"
                  : "default"
              }
              onClick={() => setFilter(f)}
            />
          )
        )}
      </Stack>


      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 3,
          flexWrap: "wrap",
        }}
      >
        <TextField
          placeholder="Search goals..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          fullWidth
        />

        <Select
          value={sort}
          onChange={(e) =>
            setSort(e.target.value)
          }
        >
          <MenuItem value="newest">
            Newest
          </MenuItem>

          <MenuItem value="progress">
            Progress %
          </MenuItem>

          <MenuItem value="category">
            Category
          </MenuItem>
        </Select>
      </Box>


      <Grid container spacing={2}>
        {filtered.length === 0 ? (
          <Typography>
            No goals found
          </Typography>
        ) : (
          filtered.map((g) => {
            const percent =
              (g.progress / g.target) * 100;

            return (
              <Grid
                item
                xs={12}
                md={6}
                key={g.id}
              >
                <Card
                  sx={{
                    borderRadius: 3,
                    transition: "0.3s",
                    "&:hover": {
                      boxShadow: 6,
                      transform:
                        "translateY(-3px)",
                    },
                  }}
                >
                  <CardContent>
                    <Typography variant="h6">
                      {g.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      {g.category}
                    </Typography>

                    <Typography sx={{ mt: 1 }}>
                      {g.progress} / {g.target}
                    </Typography>


                    <ProgressBar value={percent} />

                    <Typography sx={{ mt: 1 }}>
                      Status: {g.status}
                    </Typography>


                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{
                        mt: 2,
                        flexWrap: "wrap",
                      }}
                    >
                      <Button
                        size="small"
                        onClick={() =>
                          navigate(
                            `/goals/${g.id}`
                          )
                        }
                      >
                        View
                      </Button>

                      <Button
                        size="small"
                        onClick={() =>
                          navigate(
                            `/goals/edit/${g.id}`
                          )
                        }
                      >
                        Edit
                      </Button>

                      <Button
                        size="small"
                        onClick={() =>
                          toggleStatus(g.id)
                        }
                      >
                        {g.status === "paused"
                          ? "Resume"
                          : "Pause"}
                      </Button>

                      <Button
                        size="small"
                        color="error"
                        onClick={() =>
                          handleDelete(g.id)
                        }
                      >
                        Delete
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            );
          })
        )}
      </Grid>
    </Box>
  );
}