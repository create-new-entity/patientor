import { Box } from "@mui/material";
import { Entry } from "../../types";
import HospitalEntryComponent from "./HospitalEntry";
import OccupationalHealthCareEntryComponent from "./OccupationalHealthcareEntry";
import HealthCheckEntryComponent from "./HealthCheckEntry";
import typeUtils from "../../typeUtils";

type EntryProps = {
    entry: Entry
};

const PatientEntry = (props: EntryProps) => {
    const { entry } = props;

    switch(entry.type) {
        case "Hospital":
            return <HospitalEntryComponent hospitalEntry={entry}/>;
        case "OccupationalHealthcare":
            return <OccupationalHealthCareEntryComponent occupationalHealthcareEntry={entry}/>;
        case "HealthCheck":
            return <HealthCheckEntryComponent healthCheckEntry={entry}/>;
        default:
            return typeUtils.assertNever(entry);
    }
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
        <Box sx={{ marginTop: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'stretch', gap: '5px' }}>
            {
                entries.map((entry) => {
                    return (
                        <PatientEntry
                            key={entry.id}
                            entry={entry}
                        />
                    );
                })
            }
        </Box>
    );
};

export default Entries;