import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useLang } from "../context/LanguageContext";

export default function PageTransition({ children }) {
    const location = useLocation();
    const { lang } = useLang();

    const isRTL = lang === "fa";

    const variants = {
        initial: {
            opacity: 0,
            x: isRTL ? -20 : 20,
        },
        animate: {
            opacity: 1,
            x: 0,
        },
        exit: {
            opacity: 0,
            x: isRTL ? 20 : -20,
        },
    };

    return (
        <motion.div
            key={location.pathname}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.25, ease: "easeInOut" }}
            style={{ height: "100%" }}
        >
            {children}
        </motion.div>
    );
}