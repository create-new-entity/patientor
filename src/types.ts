
export enum EntryTypes {
  Hospital = 'Hospital',
  OccupationalHealthcare = 'OccupationalHealthcare',
  HealthCheck = 'HealthCheck'
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BaseEntry {
  id: string,
  date: string,
  specialist: string,
  description: string,
  diagnosisCodes? : string[],
}

export type Leave = {
  startDate: string,
  endDate: string
};


export interface OccupationalHealthcareEntry extends BaseEntry {
  type: EntryTypes.OccupationalHealthcare,
  employerName: string,
  sickLeave?: Leave
}

type Discharge = {
  date: string,
  criteria: string
};

export interface HospitalEntry extends BaseEntry {
  type: EntryTypes.Hospital,
  discharge: Discharge
}

export interface HealthCheckEntry extends BaseEntry {
  type: EntryTypes.HealthCheck,
  healthCheckRating: number
}

export type Entry = OccupationalHealthcareEntry | HospitalEntry | HealthCheckEntry;

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// Define Entry without the 'id' property
export type EntryWithoutId = UnionOmit<Entry, 'id'>;


export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[]
}

export type PatientFormValues = Omit<Patient, "id" | "entries">;