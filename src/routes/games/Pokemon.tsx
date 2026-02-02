import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/games/Pokemon")({
  component: PokemonPage,
});

type Pokemon = {
  name: string;
  image: string;
  hp: number;
  attack: number;
};

function PokemonPage() {
  const [player, setPlayer] = useState<Pokemon | null>(null);
  const [enemy, setEnemy] = useState<Pokemon | null>(null);
  const [winner, setWinner] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="container max-w-xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>⚔️ Pokémon Battle</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4 text-center">
          <Button onClick={() => startBattle(setPlayer, setEnemy, setWinner, setLoading)} disabled={loading}>
            {loading ? "Battlar..." : "Starta Battle"}
          </Button>

          {player && enemy && (
            <div className="grid grid-cols-2 gap-4">
              <PokemonCard title="Du" pokemon={player} />
              <PokemonCard title="Motståndare" pokemon={enemy} />
            </div>
          )}

          {winner && (
            <p className="text-xl font-bold mt-4">
              {winner}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
async function fetchPokemon(id: number): Promise<Pokemon> {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await res.json();

  const hp = data.stats.find((s: any) => s.stat.name === "hp").base_stat;
  const attack = data.stats.find((s: any) => s.stat.name === "attack").base_stat;

  return {
    name: data.name,
    image: data.sprites.front_default,
    hp,
    attack,
  };
}
async function startBattle(
  setPlayer: any,
  setEnemy: any,
  setWinner: any,
  setLoading: any
) {
  setLoading(true);
  setWinner(null);

  const playerId = Math.floor(Math.random() * 151) + 1;
  const enemyId = Math.floor(Math.random() * 151) + 1;

  const playerPokemon = await fetchPokemon(playerId);
  const enemyPokemon = await fetchPokemon(enemyId);

  setPlayer(playerPokemon);
  setEnemy(enemyPokemon);

  const playerPower = playerPokemon.hp + playerPokemon.attack;
  const enemyPower = enemyPokemon.hp + enemyPokemon.attack;

  if (playerPower > enemyPower) {
    setWinner("🎉 Du vann!");
  } else {
    setWinner("💀 Du förlorade!");
  }

  setLoading(false);
}
function PokemonCard({ title, pokemon }: { title: string; pokemon: Pokemon }) {
  return (
    <div className="border rounded p-3">
      <h3 className="font-semibold mb-2">{title}</h3>
      <img src={pokemon.image} alt={pokemon.name} className="mx-auto" />
      <p className="capitalize font-bold">{pokemon.name}</p>
      <p>❤️ HP: {pokemon.hp}</p>
      <p>⚔️ Attack: {pokemon.attack}</p>
      <p className="font-semibold">
        Power: {pokemon.hp + pokemon.attack}
      </p>
    </div>
  );
}
