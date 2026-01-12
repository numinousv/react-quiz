import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Question = {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  all_answers: string[];
};

export const Route = createFileRoute("/quiz")({
  component: QuizPage,
});

function QuizPage() {
  const [questions, setQuestions] = useState<Question[]>([]);

  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0);

  const [score, setScore] = useState(0);

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await fetch(
        "https://opentdb.com/api.php?amount=5&type=multiple"
      );
      const data = await response.json();

      const quizQuestions = data.results.map((q: any) => {
        const allAnswers = [...q.incorrect_answers, q.correct_answer];
        const shuffledAnswers = shuffleArray(allAnswers);

        return {
          question: q.question,
          correct_answer: q.correct_answer,
          incorrect_answers: q.incorrect_answers,
          all_answers: shuffledAnswers,
        };
      });

      setQuestions(quizQuestions);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch questions", error);
      setQuestions(getBackupQuestions());
      setIsLoading(false);
    }
  };

  const handleAnswerClick = (answer: string) => {
    if (selectedAnswer) return;

    setSelectedAnswer(answer);

    const currentQuestion = questions[currentQuestionNumber];
    if (answer === currentQuestion.correct_answer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionNumber < questions.length - 1) {
      setCurrentQuestionNumber(currentQuestionNumber + 1);

      setSelectedAnswer(null);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionNumber(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsLoading(true);
    fetchQuestions();
  };

  if (isLoading) {
    return (
      <div className="container max-w-2xl mx-auto p-6">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
            <p>Loading questions...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionNumber];

  if (!currentQuestion) {
    return (
      <div className="container max-w-2xl mx-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle>Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p>No questions found. Please try again.</p>
            <Button onClick={handleRestart} className="mt-4">
              Restart Quiz
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isQuizFinished =
    currentQuestionNumber === questions.length - 1 && selectedAnswer;

  return (
    <div className="container max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            Question {currentQuestionNumber + 1} of {questions.length}
          </CardTitle>
          <p className="text-muted-foreground">
            Score: {score} / {questions.length}
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="text-xl font-semibold">
              {decodeHTML(currentQuestion.question)}
            </h3>
          </div>

          <div className="grid gap-3">
            {currentQuestion.all_answers.map((answer, index) => {
              const isSelected = selectedAnswer === answer;
              const isCorrect = answer === currentQuestion.correct_answer;

              let buttonStyle = "justify-start text-left h-auto py-3";

              if (selectedAnswer) {
                if (isCorrect) {
                  buttonStyle +=
                    " bg-green-100 text-green-800 border-green-300";
                } else if (isSelected && !isCorrect) {
                  buttonStyle += " bg-red-100 text-red-800 border-red-300";
                }
              } else {
                buttonStyle += " hover:bg-accent";
              }

              return (
                <Button
                  key={index}
                  variant="outline"
                  className={buttonStyle}
                  onClick={() => handleAnswerClick(answer)}
                  disabled={!!selectedAnswer}
                >
                  <span className="text-lg">{decodeHTML(answer)}</span>
                </Button>
              );
            })}
          </div>

          <div className="flex justify-between">
            {selectedAnswer && !isQuizFinished && (
              <Button onClick={handleNextQuestion}>Next Question</Button>
            )}

            {isQuizFinished && (
              <div className="space-y-4 w-full">
                <div className="text-center p-4 bg-primary/10 rounded-lg">
                  <h3 className="text-2xl font-bold mb-2">Quiz Complete!</h3>
                  <p className="text-xl">
                    Your score: {score} / {questions.length}
                  </p>
                </div>
                <Button onClick={handleRestart} className="w-full">
                  Play Again
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// shuffle array helper function very confusing wow
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array]; // make a copy
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]]; // swap elements
  }
  return newArray;
}

// Function to fix HTML codes (like &quot; becoming ")
function decodeHTML(html: string): string {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

// Backup questions in case API fails
function getBackupQuestions(): Question[] {
  return [
    {
      question: "What is the capital of Sweden?",
      correct_answer: "Stockholm",
      incorrect_answers: ["London", "Berlin", "Cairo"],
      all_answers: ["Stockholm", "London", "Berlin", "Cairo"],
    },
    {
      question: "What is the name of the creator behind Minecraft?",
      correct_answer: "Notch",
      incorrect_answers: ["Andreas Rönnberg", "Todd Howard", "Hideo Kojima"],
      all_answers: ["Andreas Rönnberg", "Todd Howard", "Notch", "Hideo Kojima"],
    },
    {
      question: "Who is the author behind The Lord of the Rings?",
      correct_answer: "J. R. R. Tolkien",
      incorrect_answers: [
        "George R. R. Martin",
        "George Lukas",
        "J. K. Rowling",
      ],
      all_answers: [
        "George R. R. Martin",
        "J. R. R. Tolkien",
        "George Lukas",
        "J. K. Rowling",
      ],
    },
  ];
}

export default QuizPage;
