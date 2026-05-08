import Sidebar from "./Sidebar";
import { motion } from "framer-motion";

export default function Layout({ children }) {
  return (
    <div
      style={{
        display: "flex",
        background: "#f5f7fb",
        minHeight: "100vh"
      }}
    >

      <Sidebar />


      <motion.div
        style={{
          flex: 1,
          padding: 30
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </div>
  );
}