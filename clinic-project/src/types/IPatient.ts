export interface Ipatient {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  nationalCode: string;
  phoneNumber: string;
  dateOfBirth: Date;
  age: number;
  gender: number;
  genderDisplay: string;
  address: string;
  registrationDate: Date;
  appointmentsCount: number;
}
