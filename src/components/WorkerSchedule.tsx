import {useState} from "react";
import {getEmptyWorkerCalendar} from "../utils.ts";

export function WorkerSchedule(p: {
    name: Name,
    setMainCalendar: (value: (((prevState: MainCalendar) => MainCalendar) | MainCalendar)) => void
}) {
    const [personalCalendar, setPersonalCalendar] = useState(getEmptyWorkerCalendar())
    const [hoursAllocated, setHoursAllocated] = useState(0)

    // @ts-expect-error - keys will return a days array
    const days: Day[] = Object.keys(personalCalendar);

    // @ts-expect-error - keys will return a timeslot array
    const timeslots: Timeslot[] = Object.keys(personalCalendar.Monday);
    return <div>
        <h2>{p.name}</h2>
        <b style={{
            backgroundColor: hoursAllocated === 40 ? "green" : "",
            display: "inline-block",
            padding: "5px",
        }}>Hours allocated: {hoursAllocated}</b>
        <table>
            <tr>
                <th>Time of day</th>
                {days.map((day) => <th key={day}>{day}</th>)}
            </tr>
            {timeslots.map((timeslot) => <tr>
                <td>{timeslot}</td>
                {days.map(day => <td key={day + timeslot}
                                     onClick={(e) => {
                                         e.preventDefault();
                                         const isSigningUp = !personalCalendar[day][timeslot]
                                         setHoursAllocated(prevState => prevState + (isSigningUp ? 4 : -4))
                                         setPersonalCalendar(prev => ({
                                             ...prev,
                                             [day]: {...prev[day], [timeslot]: !prev[day][timeslot]}
                                         }))
                                         p.setMainCalendar(prev => ({
                                             ...prev,
                                             [day]: {
                                                 ...prev[day],
                                                 [timeslot]: isSigningUp ? [...prev[day][timeslot], p.name] : prev[day][timeslot].filter(name => name !== p.name)
                                             }
                                         }))
                                     }}
                                     style={{
                                         backgroundColor: personalCalendar[day][timeslot] ? "green" : "",
                                         minHeight: "60px",
                                         minWidth: "100px",
                                         cursor: "pointer",
                                         userSelect: "none",
                }}>{personalCalendar[day][timeslot] ? "Working" : "Not Working"}</td>)}
            </tr>)}
        </table>
    </div>
}