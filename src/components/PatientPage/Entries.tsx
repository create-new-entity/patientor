import { Box, Typography } from "@mui/material";
import { Entry } from "../../types";


type EntryProps = {
    entry: Entry
};

const PatientEntry = (props: EntryProps) => {
    const { entry } = props;

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
                                {diagnosisCode}
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

    if(!entries.length) {
        return null;
    }

    return (
        <Box sx={{ marginTop: '20px' }}>
            {
                entries.map((entry) => {
                    return (
                        <PatientEntry key={entry.id} entry={entry}/>
                    );
                })
            }
        </Box>
    );
};

export default Entries;