"use client";


import { useSearchStore } from "@/store/zustand/search.store";
import BusSearch from "./BusSearch";
import CoopSearch from "./CoopSearch";
import TerminalSearch from "./TerminalSearch";

export default function SearchContent() {
  const activeTab = useSearchStore((state) => state.activeTab);

  if (activeTab === "bus") return <BusSearch />;
  if (activeTab === "coop") return <CoopSearch />;
  if (activeTab === "terminal") return <TerminalSearch />;

  return null;
}
