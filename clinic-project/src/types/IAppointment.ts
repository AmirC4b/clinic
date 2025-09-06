import type { IDoctor } from "./IDoctor";
import type { Ipatient } from "./Ipatient";

export interface IAppointement {
  id: number;
  patient: Ipatient;
  doctorSchedule: DoctorSchedule;
  reason: string;
  notes: string;
  createdDate: Date;
  lastModifiedDate: Date;
  cancelledDate: Date | null;
  cancellationReason: null | string;
  isCancelled: boolean;
  status: string;
}

export interface DoctorSchedule {
  id: number;
  doctor: IDoctor;
  day: Date;
  dayDisplay: string;
  startTime: string;
  startTimeDisplay: string;
  endTime: string;
  endTimeDisplay: string;
  appointmentsCount: number;
  isAvailable: boolean;
}


export interface Specialty {
  id: number;
  name: string;
  doctorsCount: number;
}

