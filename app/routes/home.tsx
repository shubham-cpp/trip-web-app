import { useState } from "react";
import type { Route } from "./+types/home";
import { Header } from "~/components/Header";
import { CountryTabs } from "~/components/CountryTabs";
import { TopicTabs } from "~/components/TopicTabs";
import { TransportSection } from "~/components/TransportSection";
import { MoneySection } from "~/components/MoneySection";
import { FoodSection } from "~/components/FoodSection";
import { ScamsSection } from "~/components/ScamsSection";
import { ActivitiesSection } from "~/components/ActivitiesSection";
import { ChecklistSection } from "~/components/ChecklistSection";
import type { CountryKey, TopicKey } from "~/data/trips";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "SE Asia '26 — Mar 21–31" },
    { name: "description", content: "Trip guide: KL, HCMC, Hanoi, Bangkok" },
  ];
}

export default function Home() {
  const [country, setCountry] = useState<CountryKey>("kl");
  const [topic, setTopic] = useState<TopicKey>("transport");

  return (
    <div className="min-h-dvh bg-surface">
      {/* Sticky navigation stack */}
      <div className="sticky top-0 z-50 bg-surface">
        <Header />
        <CountryTabs active={country} onChange={setCountry} />
        <TopicTabs active={topic} onChange={setTopic} />
      </div>

      {/* Content */}
      <main className="max-w-120 mx-auto pb-8">
        {topic === "transport" && (
          <TransportSection key={`transport-${country}`} country={country} />
        )}
        {topic === "money" && (
          <MoneySection key={`money-${country}`} country={country} />
        )}
        {topic === "food" && (
          <FoodSection key={`food-${country}`} country={country} />
        )}
        {topic === "scams" && (
          <ScamsSection key={`scams-${country}`} country={country} />
        )}
        {topic === "activities" && (
          <ActivitiesSection key={`activities-${country}`} country={country} />
        )}
        {topic === "checklist" && <ChecklistSection />}
      </main>
    </div>
  );
}
