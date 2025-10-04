import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import patients from "../../services/patients";
import { isString } from "../../typeUtils";
import { EntryWithoutId, Gender, Patient } from "../../types";
import { Box, Button, SvgIcon, Typography } from "@mui/material";
import { Male, Female, Transgender } from '@mui/icons-material';
import Entries from "./Entries";
import AddPatientEntryModal from "./AddPatientEntryModal";


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

    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [error, setError] = useState<string>();

    useEffect(() => {
        const patientId = params.id;
        if(isString(patientId)) {
            (async () => {
                const fetchedPatient = await patients.getOne(patientId);
                setPatient(fetchedPatient);
            })();
        }
    }, [params.id]);

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    const submitNewPatientEntry = async (values: EntryWithoutId) => {
        try {
            const patientId = params.id;
            if(isString(patientId)) {
                const updatedPatient = await patients.createEntry(patientId, values);
                setPatient(updatedPatient);
            }
            setModalOpen(false);
        } catch (e: unknown) {
            if (axios.isAxiosError(e)) {
                if (e?.response?.data && typeof e?.response?.data === "string") {
                    const message = e.response.data.replace('Something went wrong. Error: ', '');
                    console.error(message);
                    setError(message);
                } else {
                    setError(e.response?.data.error);
                }
            } else {
                console.error("Unknown error", e);
                setError("Unknown error");
            }
        }
    };

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
            <AddPatientEntryModal
                modalOpen={modalOpen}
                onSubmit={submitNewPatientEntry}
                error={error}
                onClose={closeModal}
            />
            <Button sx={{ marginTop: '5px' }} variant="contained" onClick={() => openModal()}>
                Add New Patient Entry
            </Button>
            <Entries entries={patient.entries}/>
        </Box>
    );
};

export default PatientPage;