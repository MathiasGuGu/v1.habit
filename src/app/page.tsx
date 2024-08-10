
import { HydrateClient } from "@/trpc/server";
import HabitCardList from "./_components/Habits/Habit_card_list";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <HabitCardList />
      </main>
    </HydrateClient>
  );
}
