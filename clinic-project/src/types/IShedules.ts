import type { IDoctor } from "./IDoctor";


export interface IShedule {
    id:                number;
    doctor:            IDoctor;
    day:               Date;
    dayDisplay:        string;
    startTime:         string;
    startTimeDisplay:  string;
    endTime:           string;
    endTimeDisplay:    string;
    appointmentsCount: number;
    isAvailable:       boolean;
}



export interface Specialty {
    id:           number;
    name:         string;
    doctorsCount: number;
}