import { Box, Typography } from "@mui/material";
import { useGoals } from "../context/GoalContext";
import DashboardHeader from "../components/DashboardHeader";
import StatsCards from "../components/StatsCards";
import ProgressChart from "../components/ProgressChart";
import GoalCard from "../components/GoalCard";
import { useLang } from "../context/LanguageContext";

export default function Dashboard() {
  const { goals, addProgress } = useGoals();
  const { t } = useLang();

  const active = goals.filter(g => g.status === "active").length;
  const completed = goals.filter(g => g.status === "completed").length;

  return (
    <Box sx={{ display: "flex", gap: 2 }}>

      {/* MAIN CONTENT */}
      <Box sx={{ flex: 1 }}>

        {/* HEADER */}
        <DashboardHeader title={t("dashboard")} />

        {/* STATS */}
        <StatsCards goals={goals} />

        {/* CHART */}
        <Box sx={{ height: 300, mb: 3 }}>
          <ProgressChart goals={goals} />
        </Box>

        {/* SECTION TITLE */}
        <Typography variant="h6" sx={{ mb: 2 }}>
          Your Goals
        </Typography>

        {/* GOAL LIST */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {goals.map((goal) => (
            <GoalCard
              key={goal.id}
              goal={goal}
              onProgress={() => addProgress(goal.id)}
            />
          ))}
        </Box>

      </Box>

      {/* RIGHT INSIGHTS PANEL */}
      <Box
        sx={{
          width: 280,
          p: 2,
          display: { xs: "none", md: "block" },
          borderLeft: "1px solid #eee",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Insights
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Typography>🔥 Active Goals: {active}</Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography>🏁 Completed: {completed}</Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography>
            📊 Completion Rate:{" "}
            {goals.length
              ? Math.round((completed / goals.length) * 100)
              : 0}
            %
          </Typography>
        </Box>

        <Box sx={{ mt: 3 }}>
          <Typography variant="body2" color="text.secondary">
            💡 Tip: Focus on 1–2 active goals daily for better streaks.
          </Typography>
        </Box>
      </Box>

    </Box>
  );
}