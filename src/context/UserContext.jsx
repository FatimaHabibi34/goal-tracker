import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

const defaultUser = {
    name: "Guest User",
    avatar: "",
    xp: 0,
    streak: 0,
};

export function UserProvider({ children }) {
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem("user");
        return saved ? JSON.parse(saved) : defaultUser;
    });

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user));
    }, [user]);

    const updateUser = (data) => {
        setUser((prev) => ({ ...prev, ...data }));
    };

    return (
        <UserContext.Provider value={{ user, setUser: updateUser }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);