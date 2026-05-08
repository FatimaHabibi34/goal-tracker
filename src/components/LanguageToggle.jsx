import { Button, Stack } from "@mui/material";
import { useLang } from "../context/LanguageContext";

export default function LanguageToggle() {
    const { lang, setLang } = useLang();

    return (
        <Stack direction="row" spacing={1}>
            <Button
                variant={lang === "en" ? "contained" : "outlined"}
                onClick={() => setLang("en")}
            >
                EN
            </Button>

            <Button
                variant={lang === "fa" ? "contained" : "outlined"}
                onClick={() => setLang("fa")}
            >
                FA
            </Button>
        </Stack>
    );
}