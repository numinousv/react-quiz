import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Trophy, Medal, Award } from "lucide-react";

interface ScoreEntry {
  rank: number;
  name: string;
  score: number;
  accuracy: string;
}

export const Route = createFileRoute("/scoreboard")({
  component: RouteComponent,
});

function RouteComponent() {
  const [scores] = useState<ScoreEntry[]>([
    { rank: 1, name: "Chippe", score: 2450, accuracy: "98%" },
    { rank: 2, name: "Ramz", score: 2100, accuracy: "92%" },
    { rank: 3, name: "Laiba", score: 1850, accuracy: "89%" },
    { rank: 4, name: "Akram", score: 1400, accuracy: "75%" },
  ]);

  return (
    <div className="space-y-8 p-6">
      <header>
        <h1 className="text-3xl font-bold">Scoreboard</h1>
        <p className="text-muted-foreground">Top performers in the Quiz App.</p>
      </header>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="text-yellow-500" /> 
              Global Rankings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead>
                  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted text-left font-medium">
                    <th className="h-12 px-4 align-middle">Rank</th>
                    <th className="h-12 px-4 align-middle">Name</th>
                    <th className="h-12 px-4 align-middle">Score</th>
                    <th className="h-12 px-4 align-middle text-right">Accuracy</th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                  {scores.map((entry, index) => (
                    <motion.tr
                      key={entry.rank}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border-b transition-colors hover:bg-muted/50"
                    >
                      <td className="p-4 align-middle font-medium">
                        {entry.rank === 1 && <Medal className="inline mr-2 text-yellow-500 w-4 h-4" />}
                        {entry.rank === 2 && <Medal className="inline mr-2 text-gray-400 w-4 h-4" />}
                        {entry.rank === 3 && <Medal className="inline mr-2 text-amber-600 w-4 h-4" />}
                        #{entry.rank}
                      </td>
                      <td className="p-4 align-middle font-semibold">{entry.name}</td>
                      <td className="p-4 align-middle font-mono">{entry.score} XP</td>
                      <td className="p-4 align-middle text-right">{entry.accuracy}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-yellow-50/50 border-yellow-200">
                <CardContent className="pt-6 flex flex-col items-center">
                    <Trophy className="w-8 h-8 text-yellow-500 mb-2" />
                    <p className="text-sm font-medium">Highest Score</p>
                    <p className="text-2xl font-bold">2450</p>
                </CardContent>
            </Card>
            <Card className="bg-blue-50/50 border-blue-200">
                <CardContent className="pt-6 flex flex-col items-center">
                    <Award className="w-8 h-8 text-blue-500 mb-2" />
                    <p className="text-sm font-medium">Total Players</p>
                    <p className="text-2xl font-bold">128</p>
                </CardContent>
            </Card>
            <Card className="bg-green-50/50 border-green-200">
                <CardContent className="pt-6 flex flex-col items-center">
                    <Medal className="w-8 h-8 text-green-500 mb-2" />
                    <p className="text-sm font-medium">Avg Accuracy</p>
                    <p className="text-2xl font-bold">84%</p>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}

