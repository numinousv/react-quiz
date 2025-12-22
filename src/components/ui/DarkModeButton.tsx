import { useState } from "react";
import { Button } from "./button";

export default function DarkModeButton() {
  const [dark, setDark] = useState(false);

  const toggleDark = () => {
    setDark((prev) => !prev);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <Button variant="secondary" onClick={toggleDark}>
      {dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    </Button>
  );
}
