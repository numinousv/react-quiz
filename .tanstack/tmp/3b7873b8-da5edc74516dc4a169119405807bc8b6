import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type PlayingCard = {
  image: string;
  value: string;
  suit: string;
};

export const Route = createFileRoute("/games/Cardgame")({
  loader: async () => {
    const response = await fetch(
      "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
    );
    const data = await response.json();
    return data.deck_id as string;
  },
  component: CardgamePage,
});

function CardgamePage() {
  const deckId = Route.useLoaderData() as string;

  const [currentCard, setCurrentCard] = useState<PlayingCard | null>(null);
  const [points, setPoints] = useState(0);
  const [remaining, setRemaining] = useState(52);
  const [locked, setLocked] = useState(false);

  // Draw first card automatically
  useEffect(() => {
    drawInitialCard();
  }, []);

  const drawInitialCard = async () => {
    const response = await fetch(
      `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
    );
    const data = await response.json();
    setCurrentCard(data.cards[0]);
    setRemaining(data.remaining);
  };

  const getCardValue = (value: string): number => {
    if (!isNaN(Number(value))) return Number(value);
    if (value === "JACK") return 11;
    if (value === "QUEEN") return 12;
    if (value === "KING") return 13;
    if (value === "ACE") return 14;
    return 0;
  };

  const guess = async (type: "under" | "over") => {
    if (!currentCard || locked) return;
    setLocked(true);

    const response = await fetch(
      `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
    );
    const data = await response.json();
    const nextCard: PlayingCard = data.cards[0];

    const currentValue = getCardValue(currentCard.value);
    const nextValue = getCardValue(nextCard.value);

    const isCorrect =
      (type === "under" && nextValue < currentValue) ||
      (type === "over" && nextValue > currentValue);

    if (isCorrect) {
      setPoints((p) => p + 1);
    }

    setTimeout(() => {
      setCurrentCard(nextCard);
      setRemaining(data.remaining);
      setLocked(false);
    }, 600);
  };

  return (
    <div className="container max-w-xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>🃏 Under / Över</CardTitle>
          <p>Poäng: {points}</p>
        </CardHeader>

        <CardContent className="space-y-4 text-center">
          <p>Kort kvar: {remaining}</p>

          {currentCard && (
            <div className="space-y-2">
              <img
                src={currentCard.image}
                alt={`${currentCard.value} of ${currentCard.suit}`}
                className="mx-auto"
              />
              <p className="font-semibold">
                {currentCard.value} of {currentCard.suit}
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <Button onClick={() => guess("under")} disabled={locked}>
              Under
            </Button>
            <Button onClick={() => guess("over")} disabled={locked}>
              Över
            </Button>
          </div>

          <Link to="/games">
            <Button variant="ghost" className="w-full">
              ⬅ Tillbaka till spelmeny
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}

export default CardgamePage;
