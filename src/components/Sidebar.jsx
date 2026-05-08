import {
    Dashboard,
    Flag,
    Category,
    Settings,
    CheckCircle
} from "@mui/icons-material";

import { NavLink } from "react-router-dom";

export default function Sidebar() {
    const links = [
        { name: "Dashboard", path: "/", icon: <Dashboard /> },
        { name: "Goals", path: "/goals", icon: <Flag /> },
        { name: "Categories", path: "/categories", icon: <Category /> },
        { name: "Completed", path: "/completedGoals", icon: <CheckCircle /> },
        { name: "Settings", path: "/settings", icon: <Settings /> },
    ];

    return (
        <div
            style={{
                width: 240,
                background: "#111827",
                color: "white",
                minHeight: "100vh",
                padding: 20,
                position: "sticky",
                top: 0
            }}
        >
            <h2 style={{ marginBottom: 30 }}>🎯 Goal Tracker</h2>

            <nav
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 10
                }}
            >
                {links.map(link => (
                    <NavLink
                        key={link.path}
                        to={link.path}
                        style={({ isActive }) => ({
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            textDecoration: "none",
                            color: "white",
                            padding: "12px 16px",
                            borderRadius: 10,
                            background: isActive ? "#2563eb" : "transparent",
                            transition: "0.3s"
                        })}
                    >
                        {link.icon}
                        {link.name}
                    </NavLink>
                ))}
            </nav>
        </div>
    );
}