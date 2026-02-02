import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

interface Member {
  name: string;
  age: number;
  about: string;
  emoji?: string;
  img?: string;
  bgColor: string;
}

const members = [
  {
    name: "Ramz",
    age: 27,
    about: "Focusing on building a seamless user experience and solid logic.",
    emoji: "👨‍💼",
    bgColor: "bg-blue-100",
  },
  {
    name: "Akram",
    age: 24,
    about:
      "Dedicated to implementing smart features and efficient code structures.",
    img: "https://avatars.githubusercontent.com/u/230323566",
    bgColor: "bg-orange-100",
  },
  {
    name: "Chippe",
    age: 29,
    about:
      "Focusing on UI design and ensuring the application is fun and interactive.",
    emoji: "💇‍♂️",
    bgColor: "bg-green-100",
  },
  {
    name: "Laiba",
    age: 22,
    about:
      "Creating a dynamic platform where users can test their knowledge.",
    emoji: "🧕",
    bgColor: "bg-pink-100",
  },
];
export const Route = createFileRoute("/about")({
  component: RouteComponent,
});

function RouteComponent() {

  return (
    <div className="space-y-8 p-6">
      <h1 className="text-3xl font-bold text-center">Meet the Team</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {members.map((m, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -10 }}
          >
            <Card className="h-full border-none shadow-lg text-center overflow-hidden">
              <CardHeader className="flex flex-col items-center pt-8">
                {m.img ? (
                  <img
                    src={m.img}
                    alt="avatar"
                    className={`w-24 h-24 ${m.bgColor} rounded-full flex items-center justify-center text-5xl shadow-inner border-4 border-white`}
                  />
                ) : (
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    className={`w-24 h-24 ${m.bgColor} rounded-full flex items-center justify-center text-5xl shadow-inner border-4 border-white`}
                  >
                    {m.emoji}
                  </motion.div>
                )}
                <CardTitle className="text-2xl mt-4">{m.name}</CardTitle>
                <p className="text-primary font-semibold text-xs uppercase tracking-tighter">
                  {m.age} Years Old
                </p>
              </CardHeader>
              <CardContent className="pb-8">
                <p className="text-sm text-muted-foreground leading-relaxed italic">
                  "{m.about}"
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
