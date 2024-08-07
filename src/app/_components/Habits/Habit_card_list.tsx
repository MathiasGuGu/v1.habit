"use client";

import {
  createHabitboard,
  getAllHabitboards,
} from "@/app/_actions/habit_actions";
import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import HabitCard from "./Habit_card";
import { CreateHabitDrawer } from "./Create_habit_drawer";

const HabitService = () => {
  const { data: habitboards, refetch } = useQuery({
    
    queryFn: () => getAllHabitboards(),
    queryKey: ["habitboards"],
  });

  const { mutate } = useMutation({
    mutationFn: ({ title, description }: { title: string; description: string }) =>
      createHabitboard(title, description),
    mutationKey: ["createHabitboard"],
    onSuccess: async () => {
      await refetch();
    },
  });

  return { habitboards, mutate, refetch };
};

const HabitCardList = () => {
  const { habitboards, mutate } = HabitService();


  return (
    <section className="flex h-auto min-h-screen w-screen flex-col items-center justify-start pt-12">
      <div className="flex h-auto w-full max-w-6xl flex-col gap-8">
        <section className="flex h-auto w-full items-end justify-end">
          <CreateHabitDrawer mutate={mutate} />
        </section>
        <div className="grid grid-cols-3 gap-4">
          {habitboards?.map((habitboard) => {
            return (
              <HabitCard
                key={habitboard.id}
                habitboard={habitboard}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HabitCardList;
