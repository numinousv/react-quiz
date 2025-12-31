import { createFileRoute } from "@tanstack/react-router";
import CountButton from "@/components/ui/CountButton";
import { BookOpen, Brain, Trophy } from "lucide-react";
export const Route = createFileRoute("/")({
  component: HomeComponent,
});

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function HomeComponent() {
  return (
    <div className="space-y-8">
      {/* main content */}

      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Vite + React + shadcn</h1>
        <p className="text-muted-foreground mb-6">
          Edit <code>src/routes/index.tsx</code> and save to test HMR
        </p>
      </div>

      <div className="flex flex-col items-center gap-4">
        <CountButton />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Brain className="h-5 w-5 text-blue-500" />
              <CardTitle>Math Quiz</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-4">
              Test your math skills with algebra, geometry, and calculus
              questions.
            </p>
            <button className="w-full">Start Quiz</button>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="h-5 w-5 text-green-500" />
              <CardTitle>Trivia</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              General knowledge questions about history, science, and pop
              culture.
            </p>
            <button className="w-full">Start Quiz</button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Trophy className="h-5 w-5 text-yellow-500" />
            <CardTitle>Quiz Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-primary/10 rounded-lg">
                <div className="text-2xl font-bold">xy</div>
                <div className="text-sm text-muted-foreground">
                  Quizzes Taken
                </div>
              </div>
              <div className="text-center p-4 bg-secondary/10 rounded-lg">
                <div className="text-2xl font-bold">?%</div>
                <div className="text-sm text-muted-foreground">
                  Average Score
                </div>
              </div>
              <div className="text-center p-4 bg-destructive/10 rounded-lg">
                <div className="text-2xl font-bold">xy</div>
                <div className="text-sm text-muted-foreground">
                  Perfect Scores
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
