import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react"; 
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


type GameQuestion = {
  question: string;
  correct_answer: string;
  all_answers: string[];
};


export const fetchGameQuestions = async () => {
  try {
    const response = await fetch(
      "https://opentdb.com/api.php?amount=5&type=multiple"
    );
    const data = await response.json();

    return data.results.map((q: any) => ({
      question: q.question,
      correct_answer: q.correct_answer,
      all_answers: shuffleArray([
        ...q.incorrect_answers,
        q.correct_answer,
      ]),
    }));
  } catch (error) {
    console.error("Failed to fetch game questions", error);
    return [];
  }
};

export const Route = createFileRoute("/game")({
  loader: async () => {
    return await fetchGameQuestions();
  },
  component: GamePage,
});

function GamePage() {
  const questions = Route.useLoaderData() as GameQuestion[];

  const [index, setIndex] = useState(0);
  const [points, setPoints] = useState(0);
  const [locked, setLocked] = useState(false);

  const current = questions[index];

  if (!current) {
    return (
      <Card className="max-w-xl mx-auto mt-10">
        <CardHeader>
          <CardTitle>Game Over 🎮</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>You scored {points} points</p>
          <Button onClick={() => window.location.reload()}>
            Play again
          </Button>
        </CardContent>
      </Card>
    );
  }

  const handleAnswer = (answer: string) => {
    if (locked) return;

    setLocked(true);
    if (answer === current.correct_answer) {
      setPoints((p) => p + 1);
    }

    setTimeout(() => {
      setIndex((i) => i + 1);
      setLocked(false);
    }, 800);
  };

  return (
    <div className="container max-w-xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Points: {points}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <h2 className="text-xl font-semibold">
            {decodeHTML(current.question)}
          </h2>

          {current.all_answers.map((a) => (
            <Button
              key={a}
              onClick={() => handleAnswer(a)}
              disabled={locked}
              className="w-full"
              variant="outline"
            >
              {decodeHTML(a)}
            </Button>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function shuffleArray<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}

function decodeHTML(html: string): string {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

export default GamePage;
