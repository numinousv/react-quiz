import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

interface Member {
  name: string;
  age: number;
  about: string;
}

export const Route = createFileRoute("/about")({
  component: RouteComponent,
});

function RouteComponent() {
  const [members, setMembers] = useState<Member[]>([
    {
      name: "Ramz",
      age: 27,
      about: "Currently working as a developer on our Quiz App project, focusing on building a seamless user experience and solid logic.",
    },
    {
      name: "Akram",
      age: 24,
      about: "A core member of the team developing our Quiz App, dedicated to implementing smart features and efficient code structures.",
    },
    {
      name: "Chippe",
      age: 29,
      about: "Contributing to the Quiz App development with a focus on UI design and ensuring the application is fun and interactive.",
    },
    {
      name: "Laiba",
      age: 22,
      about: "Working on the Quiz App project to create a dynamic platform where users can test their knowledge across various topics.",
    },
  ]);

  const addMember = () => {
    const newMember: Member = {
      name: "New Member",
      age: 20,
      about: "New developer joining the Quiz App team.",
    };
    setMembers([...members, newMember]);
  };

  return (
    <div className="space-y-8 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">About Us</h1>
        <button
          onClick={addMember}
          className="bg-black text-white px-4 py-2 rounded-md hover:opacity-80 transition"
        >
          Add Member
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {members.map((m, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow h-full">
              <CardHeader>
                <CardTitle>
                  {m.name}, {m.age} years old
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {m.about}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}


// function CardTwo() {
//   return (
//     <motion.p animate={{ rotate: 360 }}>
//       <div className="container max-w-2xl mx-auto p-6">
//         <Card>
//           <CardContent className="flex flex-col items-center justify-center py-12">
//             <div className="h-12 w-12 border-b-2 mb-14"></div>
//             <p>Ramz.M</p>
//           </CardContent>
//         </Card>
//       </div>
//     </motion.p>
//   );
// }
