"use server";

import { api } from "@/trpc/server";

export async function getAllHabitboards() {
  const habitboards = await api.habit.getAll();
  console.log(habitboards);
  return habitboards;
}

export async function createHabitboard(title: string, description: string) {
  return await api.habit.create({ title, description });
}

export async function createHabitDay(habitboardId: number) {
  return await api.habit.createHabitDay({
    habitboardId,
    completed: false,
    day: new Date().toISOString().split("T")[0]!,
  });
}

export async function updateHabitDay(habitDayId: number, completed: boolean) {
  console.log(habitDayId, completed);
  return await api.habit.updateHabitDay({ habitDayId, completed });
}

export async function getHabitDaysForHabitboard(habitboardId: number) {
  return await api.habit.getHabitdaysForHabitboard({ habitboardId });
}