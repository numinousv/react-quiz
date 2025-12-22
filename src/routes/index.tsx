import { createFileRoute } from "@tanstack/react-router";
import CountButton from "@/components/ui/CountButton";
import DarkModeButton from "@/components/ui/DarkModeButton";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center gap-8 p-4">
      <h1 className="text-3xl font-bold">Vite + React + shadcn</h1>
      <div className="flex flex-col items-center gap-4">
        <CountButton />
        <DarkModeButton />
      </div>
      <p className="text-muted-foreground mt-4">
        Edit <code>src/routes/index.tsx</code> and save to test HMR
      </p>
    </div>
  );
}
