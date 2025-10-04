

import { useState, SyntheticEvent, useEffect } from "react";
import {  TextField, Grid, Button, SelectChangeEvent, Select, MenuItem, Box, Typography } from '@mui/material';
import { EntryWithoutId, EntryTypes } from "../../../types";
import DiagnosesCodesSelector from "./DiagnosesCodesSelector";
import HealthRating from "./HealthRating";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryWithoutId) => void;
}

const AddPatientEntryForm = ({ onCancel, onSubmit }: Props) => {
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');

  const [selectedEntryType, setSelectedEntryType] = useState<EntryTypes>(EntryTypes.Hospital);

  const [description, setDescription] = useState('');
  const [diagnosisCodes, setSelectedDiagnosesCodes] = useState<string[]>([]);

  // OccupationalHealthcareEntry
  const [employerName, setEmployerName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Hospital
  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');

  // HealthCheck
  const [healthCheckRating, setHealthCheckRating] = useState(0);

  useEffect(() => {
    const date = new Date();
    setStartDate(date.toISOString().split('T')[0]);
    setDischargeDate(date.toISOString().split('T')[0]);
    date.setDate(date.getDate() + 1);
    setEndDate(date.toISOString().split('T')[0]);
  }, []);

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
        diagnosisCodes,
        healthCheckRating: parseInt(healthCheckRating, 10)
      });
    }
    else if(selectedEntryType === EntryTypes.OccupationalHealthcare) {
      onSubmit({
        type: selectedEntryType,
        date,
        specialist,
        description,
        diagnosisCodes,
        employerName,
        sickLeave: {
          startDate, endDate
        }
      });
    }
    else if(selectedEntryType === EntryTypes.Hospital) {
      onSubmit({
        type: selectedEntryType,
        date,
        specialist,
        description,
        diagnosisCodes,
        discharge: {
          date: dischargeDate,
          criteria: dischargeCriteria
        }
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
        <DiagnosesCodesSelector setSelectedDiagnosesCodes={setSelectedDiagnosesCodes}/>
        {
          selectedEntryType === EntryTypes.HealthCheck &&
          <HealthRating setHealthCheckRating={setHealthCheckRating}/>
        }

        {
          selectedEntryType === EntryTypes.OccupationalHealthcare &&
          <>
            <TextField
              label="Employer Name"
              fullWidth
              value={employerName}
              onChange={({ target }) => setEmployerName(target.value)}
            />
            <Box sx={{ padding: '5px', border: '1px solid', borderRadius: '5px', marginTop: '3px', marginBottom: '3px' }}>
              <Typography variant="body1">Sick Leave</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '20px', padding: '10px' }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '3px' }}>
                  <label htmlFor="startDate">Start date:</label>
                  <input
                    type="date"
                    id="startDate"
                    name="sick-leave-start"
                    value={startDate}
                    min="1970-01-01"
                    max="2050-12-31"
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '3px' }}>
                  <label htmlFor="endDate">End date:</label>
                  <input
                    type="date"
                    id="endDate"
                    name="sick-leave-end"
                    value={endDate}
                    min="1970-01-01"
                    max="2050-12-31"
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </Box>
              </Box>
            </Box>
          </>
        }

        {
          selectedEntryType === EntryTypes.Hospital &&
          <>
            <Box sx={{ padding: '5px', border: '1px solid', borderRadius: '5px', marginTop: '5px' }}>
              <Typography>Discharge</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '3px', marginBottom: '5px' }}>
                <label htmlFor="dischargeDate">Discharge date:</label>
                  <input
                    type="date"
                    id="dischargeDate"
                    name="dischargeDate"
                    value={dischargeDate}
                    min="1970-01-01"
                    max="2050-12-31"
                    onChange={(e) => setDischargeDate(e.target.value)}
                  />
              </Box>
              <TextField
                label="Criteria"
                placeholder="Criteria"
                fullWidth
                value={dischargeCriteria}
                onChange={({ target }) => setDischargeCriteria(target.value)}
              />
            </Box>
          </>
        }
        
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