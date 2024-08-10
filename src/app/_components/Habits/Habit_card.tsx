import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import HabitHistory from "./Habit_history";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createHabitDay,
  getHabitDaysForHabitboard,
  updateHabitDay,
} from "@/app/_actions/habit_actions";
import { Checkbox } from "@/components/ui/checkbox";
import type { Activity } from "react-activity-calendar";

const HabitCardService = (id: number) => {
  const { data: habitdays, refetch } = useQuery({
    queryFn: () => getHabitDaysForHabitboard(id),
    queryKey: ["habitdays", id],
  });

  const { mutate: createDay } = useMutation({
    mutationFn: () => createHabitDay(id),
    mutationKey: ["createHabitDay"],
    onSuccess: async () => {
      await refetch();
    },
  });

  const { mutate: updateDay } = useMutation({
    mutationFn: ({
      habitDayId,
      completed,
    }: {
      habitDayId: number;
      completed: boolean;
    }) => updateHabitDay(habitDayId, completed),
    mutationKey: ["updateHabitDay"],
    onSuccess: async () => {
      await refetch();
    },
  });

  return { habitdays, createDay, updateDay, refetch };
};

const HabitCard = ({
  habitboard,
}: {
  habitboard: {
    id: number;
    title: string | null;
    description: string | null;
    createdAt: Date;
  };
}) => {
  const { habitdays, updateDay, createDay, refetch } = HabitCardService(
    habitboard.id,
  );

  const habitHistory = habitdays?.map((day) => {
    return {
      date: day.day,
      count: 1,
      level: 3,
    };
  });

 



  return (
    <Card className="relative h-[400px] min-h-[400px] max-w-[400px]">
      <Checkbox
        className="absolute right-6 top-6 size-10 rounded-full disabled:pointer-events-none"
        onCheckedChange={async (checked) => {
          if (checked) {
            createDay();
            const idOfCreatedDay = habitdays?.find(
              (day) => day.day === new Date().toISOString().split("T")[0],
            )?.id;
            if (!idOfCreatedDay) return;
            updateDay({ habitDayId: idOfCreatedDay, completed: true });
            await refetch();
          }
        }}
      />

      <CardHeader>
        <CardTitle>{habitboard.title}</CardTitle>
        <CardDescription>{habitboard.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <HabitHistory habitData={habitHistory as Activity[]} />
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default HabitCard;
