
export enum EntryTypes {
  Hostpital = 'Hospital',
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

type Leave = {
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
  type: EntryTypes.Hostpital,
  discharge: Discharge
}

export interface HealthCheckEntry extends BaseEntry {
  type: EntryTypes.HealthCheck,
  healthCheckRating: number
}

export type Entry = OccupationalHealthcareEntry | HospitalEntry | HealthCheckEntry;

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