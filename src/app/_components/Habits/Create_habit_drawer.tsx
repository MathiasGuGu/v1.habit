import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import type { UseMutateFunction } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { BicepsFlexed, Plus, X } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const FormSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
});

export function CreateHabitDrawer({
  mutate,
}: {
  mutate: UseMutateFunction<void, Error, { title: string; description: string; }, unknown>;
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    mutate(data);
  }

  return (
    <div>
      <Drawer direction="right" fixed>
        <DrawerTrigger asChild>
          <Button className="flex items-center gap-2 transition-all duration-200 hover:gap-3 focus:gap-3">
            <BicepsFlexed size={18} strokeWidth={1.5} />
            Create a habit
          </Button>
        </DrawerTrigger>
        <DrawerPortal>
          <DrawerContent className="mt-24 flex h-full rounded-none">
            <div className="relative mx-24 mt-24 flex w-[400px] flex-col gap-2">
              <DrawerClose className="absolute right-0" asChild>
                <Button variant="ghost">
                  <X size={24} strokeWidth={1.5} />
                </Button>
              </DrawerClose>
              <DrawerTitle className="text-3xl">Create a new habit</DrawerTitle>
              <DrawerDescription>
                Create a new habit to track your progress.
              </DrawerDescription>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="w-3/3 space-y-3"
                >
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Drink water" {...field} />
                        </FormControl>
                        <FormDescription>
                          Give a title to your habit.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Input placeholder="Get healtier" {...field} />
                        </FormControl>
                        <FormDescription>
                          motivate yourself with a description.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="flex items-center gap-2 transition-all duration-200 hover:gap-3 focus:gap-3"
                  >
                    <Plus size={18} strokeWidth={1.5} />
                    Create Habit
                  </Button>
                </form>
              </Form>
            </div>
          </DrawerContent>
        </DrawerPortal>
      </Drawer>
    </div>
  );
}
