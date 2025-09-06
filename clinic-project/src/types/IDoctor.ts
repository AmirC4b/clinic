import type { ISpeciality } from "./ISpeciality";

export interface IDoctor {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  medicalLicenseNumber: string;
  phoneNumber: string;
  gender: number;
  genderDisplay: string;
  specialty: ISpeciality;
  schedulesCount: number;
}
