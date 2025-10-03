

import WorkIcon from '@mui/icons-material/Work';
import SvgIcon from '@mui/icons-material/Work';

import { OccupationalHealthcareEntry } from './../../types';
import { Box, Typography } from '@mui/material';

type OccupationalHealthcareEntryProps = {
    occupationalHealthcareEntry: OccupationalHealthcareEntry
};

const OccupationalHealthCareEntryComponent = (props: OccupationalHealthcareEntryProps) => {
    const { occupationalHealthcareEntry } = props;

    return (
        <Box sx={{  border: '2px solid', borderRadius: '5px', padding: '5px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '5px' }}>
                <Typography>{occupationalHealthcareEntry.date}</Typography>
                <SvgIcon component={WorkIcon}/>
                <Typography>{occupationalHealthcareEntry.employerName}</Typography>
            </Box>
            <Typography>{occupationalHealthcareEntry.description}</Typography>
            <Typography>Diagnose by {occupationalHealthcareEntry.specialist}</Typography>
        </Box>
    );
};

export default OccupationalHealthCareEntryComponent;