import { Dayjs } from "dayjs";

export default function useCalendar(date: Dayjs) {
  let previousDays: number[] = [];
  let upcomingDays: number[] = [];

  const monthDays = date.daysInMonth();
  const firstDay = date.startOf('month').day();
  const lastDay = date.endOf('month').day();
  const prevMonthDays = date.subtract(1, 'month').daysInMonth();

  for (let i = 0; firstDay != i; i++) {
    previousDays.push(prevMonthDays - i)
  }
  previousDays.reverse();

  for (let i = 6 - lastDay; i > 0; i--) {
    upcomingDays.push(i)
  }
  upcomingDays.reverse();

  return { previousDays, monthDays, upcomingDays }
}
