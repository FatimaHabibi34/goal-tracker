import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Dashboard from "../pages/Dashboard";
import Goals from "../pages/Goals";
import Settings from "../pages/Settings";
import NewGoal from "../pages/NewGoal";
import PageTransition from "../components/PageTransition";
import Layout from "../components/Layout";
import NotFound from "../pages/NotFound";
import CompletedGoals from "../pages/CompletedGoals";

export default function AppRouter() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>

        <Route
          path="/"
          element={
            <PageTransition>
              <Layout>
                <Dashboard />
              </Layout>
            </PageTransition>
          }
        />

        <Route
          path="/goals"
          element={
            <PageTransition>
              <Goals />
            </PageTransition>
          }
        />

        <Route
          path="/goals/new"
          element={
            <PageTransition>
              <NewGoal />
            </PageTransition>
          }
        />

        <Route
          path="/settings"
          element={
            <PageTransition>
              <Settings />
            </PageTransition>
          }
        />
        <Route path="/completed" element={<CompletedGoals />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}