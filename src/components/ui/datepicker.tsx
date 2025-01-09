import { useState, useMemo } from 'react';
import { Input } from "@chakra-ui/react";
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { HStack, Grid, GridItem, IconButton } from '@chakra-ui/react';
import { Field } from './ui/field';
import { PopoverRoot, PopoverBody, PopoverTrigger, PopoverContent, PopoverArrow } from '@/components/ui/popover.tsx';
import useCalendar from '@/hooks/useCalendar';
import dayjs from 'dayjs';

export default function Datepicker() {
  dayjs().locale('es-AR');
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const formattedDate = useMemo(() => {
    return selectedDate.format('DD-MM-YYYY');
  }, [selectedDate]);

  const handleMonthChange = (increment: number) => {
    setSelectedDate(prev => prev.add(increment, 'month'));
  };

  const handleYearChange = (increment: number) => {
    setSelectedDate(prev => prev.add(increment, 'year'));
  };

  const { previousDays, monthDays, upcomingDays } = useMemo(() => useCalendar(selectedDate), [selectedDate]);

  // local naming of the strings used
  const DAYS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sabado"];
  const MONTHS = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

  return (
    <HStack alignItems="start" gap={1}>
      <Field helperText={selectedDate.format('dddd, MMMM D, YYYY ')} width='fit-content'>
        <Input value={formattedDate} readOnly mb={1} />
      </Field>
      <PopoverRoot positioning={{ placement: "bottom-end" }}>
        <PopoverTrigger>
          <IconButton variant="outline">
            <Calendar />
          </IconButton>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverBody>
            <HStack gap={2} justify="space-between" alignItems="center">
              <IconButton variant="ghost" size="xs" onClick={() => handleMonthChange(-1)}>
                <ChevronLeft />
              </IconButton>
              <h1>{MONTHS[selectedDate.month()]}</h1>
              <IconButton variant="ghost" size="xs" onClick={() => handleMonthChange(1)}>
                <ChevronRight />
              </IconButton>
              <IconButton variant="ghost" size="xs" onClick={() => handleYearChange(-1)}>
                <ChevronLeft />
              </IconButton>
              <h1>{selectedDate.year()}</h1>
              <IconButton variant="ghost" size="xs" onClick={() => handleYearChange(1)}>
                <ChevronRight />
              </IconButton>
            </HStack>
            <Grid templateColumns="repeat(7, 1fr)" gap="5" mt={5} textAlign="center" alignItems="center" justifyContent="center" >
              {DAYS.map(day => (
                <GridItem key={day}>{day.slice(0, 3)}</GridItem>
              ))}
              {previousDays.map((value, index) => (
                <GridItem
                  key={index}
                  padding={1}
                  rounded="full"
                  className="calendar-day adjacent-day"
                  onClick={() => setSelectedDate(selectedDate.add(-1, 'month').date(value))}>
                    {value}
                </GridItem>
              ))}
              {[...Array(monthDays)].map((_, index) => (
                <GridItem
                  key={index}
                  padding={1}
                  rounded="full"
                  className={`calendar-day ${selectedDate.date() === index + 1 ? 'selected-date' : ''}`}
                  onClick={() => setSelectedDate(selectedDate.date(index + 1))}>
                    {index + 1}
                </GridItem>
              ))}
              {upcomingDays.map((value, index) => (
                <GridItem
                  key={index}
                  padding={1}
                  rounded="full"
                  className="calendar-day adjacent-day"
                  onClick={() => setSelectedDate(selectedDate.add(1, 'month').date(value))}>
                    {value}
                </GridItem>
              ))}
            </Grid>
          </PopoverBody>
        </PopoverContent>
      </PopoverRoot>
    </HStack>
  )
}
