import { Card } from "flowbite-react";
import React from "react";

export default function FeatureCard({ title, description }) {
  return (
    <Card className="!bg-white !border-yellow-500 p-4 h-full w-full flex flex-col justify-between">
    <div className="space-y-4">
      <h5 className="text-xl font-bold tracking-tight italic antialiased">
        {title}
      </h5>
      <p className="font-normal text-justify">
        {description}
      </p>
    </div>
  </Card>
  );
}
