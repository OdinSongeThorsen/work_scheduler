type Timeslot = "08-00-12:00" | "12-00-16:00" | "16-00-20:00" | "20-00-00:00";
type Day = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
type Name = "John Doe" | "Max Waldo" | "Ashton Kutcher" | "Brad Pitt" | "Angelina Jolie" | "Tom Cruise" | "temp1" | "temp2" | "temp3";
type MainCalendar = Record<Day, Record<Timeslot, Name[]>>;
type WorkerCalendar = Record<Day, Record<Timeslot, boolean>>;