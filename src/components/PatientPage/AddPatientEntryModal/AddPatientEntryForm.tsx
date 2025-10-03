

import { useState, SyntheticEvent } from "react";
import {  TextField, Grid, Button, SelectChangeEvent, Select, MenuItem } from '@mui/material';
import { EntryWithoutId, EntryTypes } from "../../../types";


interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryWithoutId) => void;
}

const AddPatientEntryForm = ({ onCancel, onSubmit }: Props) => {
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');

  const [selectedEntryType, setSelectedEntryType] = useState<EntryTypes>(EntryTypes.HealthCheck);

  
  const [description, setDescription] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState('');


  // OccupationalHealthcareEntry
  // const [employerName, setEmployerName] = useState('');
  // const [sickLeave, setSickLeave] = useState('');

  // HospitalEntry
  // const [dischargeDate, setDischargeDate] = useState('');
  // const [dischargeCriteria, setDischargeCriteria] = useState('');

  // HealthCheckEntry
  const [healthCheckRating, setHealthCheckRating] = useState('');



  const onEntryTypeChange = (event: SelectChangeEvent<EntryTypes>) => {
    event.preventDefault();
    if ( typeof event.target.value === "string") {
      const value = event.target.value;
      const entryType = Object.values(EntryTypes).find(g => g.toString() === value);
      if (entryType) {
        setSelectedEntryType(entryType);
      }
    }
  };

  const addPatientEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    if(selectedEntryType === EntryTypes.HealthCheck) {
      onSubmit({
        type: selectedEntryType,
        date,
        specialist,
        description,
        diagnosisCodes: diagnosisCodes.split(','),
        healthCheckRating: parseInt(healthCheckRating, 10)
      });
    }
  };


  return (
    <div>
      <form onSubmit={addPatientEntry}>
        <Select
          label="Entry"
          fullWidth
          value={selectedEntryType}
          onChange={onEntryTypeChange}
        >
        {
          Object.values(EntryTypes).map(entryType =>
            <MenuItem key={entryType} value={entryType}>
              {entryType}
            </MenuItem>
          )
        }
        </Select>
        <TextField
          label="Date"
          fullWidth 
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          label="Diagnosis Codes"
          fullWidth
          value={diagnosisCodes}
          onChange={({ target }) => setDiagnosisCodes(target.value)}
        />
        <TextField
          label="Health Check Rating"
          fullWidth
          value={healthCheckRating}
          onChange={({ target }) => setHealthCheckRating(target.value)}
        />
        
        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddPatientEntryForm;