import { Box, Typography } from "@mui/material";
import { Diagnosis, Entry } from "../../types";
import { useEffect, useState } from "react";
import diagnosesServices from "../../services/diagnoses";


type EntryProps = {
    entry: Entry,
    diagnoses: Diagnosis[]
};

const PatientEntry = (props: EntryProps) => {
    const { entry, diagnoses } = props;

    return (
        <Box>
            <Typography variant="body1">
                <strong>{entry.date}</strong>: {entry.description}
            </Typography>
            <ul>
                {
                    entry.diagnosisCodes && entry.diagnosisCodes.map((diagnosisCode, index) => {
                        return (
                            <li key={`${entry.id} ${diagnosisCode}`}>
                                {diagnosisCode} { diagnoses?.find((d) => d.code === diagnosisCode)?.name }
                            </li>
                        );
                    })
                }
            </ul>
        </Box>
    );
};

type EntriesProps = {
    entries: Entry[]
};

const Entries = (props: EntriesProps) => {
    const { entries } = props;
    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

    useEffect(() => {
        (async () => {
            const allDiagnoses = await diagnosesServices.getAllDiagnoses();
            setDiagnoses(allDiagnoses);
        })();
    }, []);

    if(!entries.length) {
        return null;
    }

    return (
        <Box sx={{ marginTop: '20px' }}>
            {
                entries.map((entry) => {
                    return (
                        <PatientEntry
                            key={entry.id}
                            entry={entry}
                            diagnoses={diagnoses}
                        />
                    );
                })
            }
        </Box>
    );
};

export default Entries;