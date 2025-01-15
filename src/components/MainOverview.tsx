import {useState} from "react";
import {WorkerSchedule} from "./WorkerSchedule.tsx";
import {getEmptyMainCalendar} from "../utils.ts";

const names: Name[] = ["John Doe", "Max Waldo", "Ashton Kutcher", "Brad Pitt", "Angelina Jolie", "Tom Cruise", "temp1", "temp2", "temp3"];

const deliveryTimes: Record<Day, Timeslot | undefined> = {
    Monday: undefined,
    Tuesday: "08-00-12:00",
    Wednesday: undefined,
    Thursday: "12-00-16:00",
    Friday: undefined,
    Saturday: "12-00-16:00",
    Sunday: undefined,
};

export function MainOverview() {
    const [calendar, setCalendar] = useState(getEmptyMainCalendar());

    // @ts-expect-error - keys will return a days array
    const days: Day[] = Object.keys(calendar);

    // @ts-expect-error - keys will return a timeslot array
    const timeslots: Timeslot[] = Object.keys(calendar.Monday);

    return (
    <div>
        <h1>Main Overview</h1>
        <table>
            <tr>
                <th>Time of day</th>
                {days.map((day) => <th key={day}>{day}</th>)}
            </tr>
            {timeslots.map((timeslot) => <tr>
                <td><div>{timeslot}</div></td>
                {days.map(day => <td style={{
                    backgroundColor: deliveryTimes[day] === timeslot ? "orange" : "",
                }} key={day + timeslot}><div >{calendar[day][timeslot].map(name => <p>{name}</p>)}</div></td>)}
            </tr>)}
        </table>
        <br/>
        <h2>Individual worker Schedules</h2>
        <br/>
        {names.map(name => <WorkerSchedule name={name} setMainCalendar={setCalendar}/>)}
    </div>
    );
}