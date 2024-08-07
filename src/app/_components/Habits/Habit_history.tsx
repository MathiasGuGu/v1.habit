import ActivityCalendar, { Skeleton } from "react-activity-calendar";
import type { Activity } from "react-activity-calendar";
const HabitHistory = ({ habitData }: { habitData: Activity[]}) => {
  return (
    <div className="flex h-[200px] w-[325px] flex-col flex-wrap gap-1 rounded">
      <Skeleton totalCount={20} colorScheme="light" loading={!habitData} />
      <ActivityCalendar
        colorScheme="light"
        labels={{
          legend: { less: "😪", more: "🥳" },
        }}
        hideTotalCount
        hideMonthLabels
        theme={{
          light: ["#f0fdf4", "#dcfce7", "#bbf7d0", "#86efac", "#4ade80"],
        }}
        data={habitData ? habitData : []}
      />
    </div>
  );
};

export default HabitHistory;
