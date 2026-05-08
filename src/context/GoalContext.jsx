import { createContext, useContext, useReducer, useEffect } from "react";

const GoalContext = createContext();

const initialState = {
  goals: [],
  xp: 0,
  streak: 0,
  lastLogDate: null,
};


function init() {
  const data = localStorage.getItem("goalData");
  return data ? JSON.parse(data) : initialState;
}


function reducer(state, action) {
  switch (action.type) {
    case "ADD_GOAL":
      return {
        ...state,
        goals: [
          ...state.goals,
          {
            ...action.payload,
            id: Date.now(),
            progress: 0,
            status: "active",
            logs: [],
            createdAt: new Date().toISOString(),
          },
        ],
      };

    case "UPDATE_GOAL":
      return {
        ...state,
        goals: state.goals.map((g) =>
          g.id === action.payload.id ? action.payload : g
        ),
      };

    case "DELETE_GOAL":
      return {
        ...state,
        goals: state.goals.filter((g) => g.id !== action.payload),
      };

    case "TOGGLE_STATUS":
      return {
        ...state,
        goals: state.goals.map((g) => {
          if (g.id === action.payload) {
            return {
              ...g,
              status: g.status === "paused" ? "active" : "paused",
            };
          }
          return g;
        }),
      };

    case "ADD_PROGRESS": {
      const today = new Date();
      const todayStr = today.toDateString();

      const yesterday = new Date();
      yesterday.setDate(today.getDate() - 1);
      const yesterdayStr = yesterday.toDateString();

      let didLogToday = false;

      const updatedGoals = state.goals.map((g) => {
        if (g.id === action.payload && g.status === "active") {
          if (g.logs.some((log) => log.date === todayStr)) {
            didLogToday = true;
            return g;
          }

          const newProgress = Math.min(g.progress + 1, g.target);

          return {
            ...g,
            progress: newProgress,
            status: newProgress >= g.target ? "completed" : "active",
            logs: [...g.logs, { date: todayStr }],
          };
        }
        return g;
      });

      if (didLogToday) return state;

      let newStreak = 1;

      if (!state.lastLogDate) {
        newStreak = 1;
      } else if (state.lastLogDate === yesterdayStr) {
        newStreak = state.streak + 1;
      }

      return {
        ...state,
        goals: updatedGoals,
        xp: state.xp + 20,
        streak: newStreak,
        lastLogDate: todayStr,
      };
    }

    default:
      return state;
  }
}

export function GoalProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState, init);


  useEffect(() => {
    localStorage.setItem("goalData", JSON.stringify(state));
  }, [state]);

  return (
    <GoalContext.Provider
      value={{
        ...state,
        addGoal: (goal) =>
          dispatch({ type: "ADD_GOAL", payload: goal }),
        updateGoal: (goal) =>
          dispatch({ type: "UPDATE_GOAL", payload: goal }),
        deleteGoal: (id) =>
          dispatch({ type: "DELETE_GOAL", payload: id }),
        toggleStatus: (id) =>
          dispatch({ type: "TOGGLE_STATUS", payload: id }),
        addProgress: (id) =>
          dispatch({ type: "ADD_PROGRESS", payload: id }),
      }}
    >
      {children}
    </GoalContext.Provider>
  );
}


export const useGoals = () => {
  const context = useContext(GoalContext);
  if (!context) {
    throw new Error("useGoals must be used inside GoalProvider");
  }
  return context;
};