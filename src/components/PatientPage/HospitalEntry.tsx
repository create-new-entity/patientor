
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import SvgIcon from '@mui/icons-material/MedicalServices';

import { HospitalEntry } from "../../types";
import { Box, Typography } from '@mui/material';


type HospitalEntryProps = {
    hospitalEntry: HospitalEntry
};


const HospitalEntryComponent = (props: HospitalEntryProps) => {
    const { hospitalEntry } = props;

    return (
        <Box sx={{  border: '2px solid', borderRadius: '5px', padding: '5px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '5px' }}>
                <Typography>{hospitalEntry.date}</Typography>
                <SvgIcon component={MedicalServicesIcon}/>
            </Box>
            <Typography>{hospitalEntry.description}</Typography>
            <Typography>Diagnose by {hospitalEntry.specialist}</Typography>
        </Box>
    );
};

export default HospitalEntryComponent;