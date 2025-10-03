import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patients from "../../services/patients";
import { isString } from "../../typeUtils";
import { Gender, Patient } from "../../types";
import { Box, SvgIcon, Typography } from "@mui/material";
import { Male, Female, Transgender } from '@mui/icons-material';
import Entries from "./Entries";

type GenderProps = {
    gender: Gender
};

const GenderIcon = (props: GenderProps) => {
    const { gender } = props;

    let genderIcon;

    if(gender === Gender.Male) {
        genderIcon = Male;
    }
    else if(gender === Gender.Female) {
        genderIcon = Female;
    }
    else if(gender === Gender.Other) {
        genderIcon = Transgender;
    }
    else {
        genderIcon = null;
    }

    if(genderIcon) {
        return (
            <SvgIcon component={genderIcon}/>
        );
    }
    return null;
};


const PatientPage = () => {

    const params = useParams();
    const [patient, setPatient] = useState<Patient>();
    
    useEffect(() => {
        const patientId = params.id;
        if(isString(patientId)) {
            (async () => {
                const fetchedPatient = await patients.getOne(patientId);
                setPatient(fetchedPatient);
            })();
        }
    }, [params.id]);

    if(!patient) {
        return null;
    }

    return (
        <Box sx={{ marginTop: '50px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '5px' }}>
                <Typography variant="body1"><strong>{patient.name}</strong></Typography>
                <GenderIcon gender={patient.gender}/>
            </Box>
            <Typography variant="body1">SSN: {patient.ssn}</Typography>
            <Typography variant="body1">Occupation: {patient.name}</Typography>
            <Entries entries={patient.entries}/>
        </Box>
    );
};

export default PatientPage;