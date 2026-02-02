import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/Feedback")({
  component: FeedbackPage,
});

function FeedbackPage() {
  const [feedback, setFeedback] = useState("");

  const handleSubmit = () => {
    if (!feedback) return alert("Skriv något först!");
    console.log("Feedback skickad:", feedback);
    alert("Tack för din feedback!");
    setFeedback(""); 
  };

  return (
    <div className="container max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Feedback</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <textarea
            className="w-full p-3 border rounded-md resize-none"
            rows={6}
            placeholder="Skriv din feedback här..." 
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
          <Button onClick={handleSubmit} className="w-full">
            Skicka Feedback
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default FeedbackPage;
