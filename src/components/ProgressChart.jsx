
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Box, Typography } from "@mui/material";

export default function ProgressChart({ goals = [] }) {
  if (goals.length === 0) {
    return (
      <Box
        sx={{
          height: 300,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px dashed #ccc",
          borderRadius: 3,
        }}
      >
        <Typography color="text.secondary">
          No data yet 📊
        </Typography>
      </Box>
    );
  }

  const data = goals.map((g) => ({
    name:
      g.title.length > 12 ? g.title.slice(0, 12) + "..." : g.title,
    progress: Math.min(
      g.target > 0 ? Math.round((g.progress / g.target) * 100) : 0,
      100
    ),
  }));

  return (
    <Box sx={{ width: "100%", height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>

          <XAxis
            dataKey="name"
            tick={{ fontSize: 12 }}
            interval={0}
            angle={-20}
          />

          <YAxis />

          <Tooltip formatter={(value) => `${value}%`} />

          <Bar
            dataKey="progress"
            radius={[8, 8, 0, 0]}
            fill="#4cafef"
          />

        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}