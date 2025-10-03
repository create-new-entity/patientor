import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SvgIcon from '@mui/icons-material/MedicalServices';
import { Box, Typography } from '@mui/material';
import { HealthCheckEntry } from "../../types";

type HealthCheckEntryProps = {
    healthCheckEntry: HealthCheckEntry
};

type HeartColor = 'success' | 'warning' | 'error';
const getHeartColor = (healthCheckRating: number): HeartColor => {
    if(healthCheckRating === 0) {
        return 'error';
    }
    if(healthCheckRating === 1) {
        return 'warning';
    }
    return 'success';
};

const HealthCheckEntryComponent = (props: HealthCheckEntryProps) => {
    const { healthCheckEntry } = props;
    
    return (
        <Box sx={{  border: '2px solid', borderRadius: '5px', padding: '5px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '5px' }}>
                <Typography>
                    { healthCheckEntry.date }
                </Typography>
                <SvgIcon component={MonitorHeartIcon}/>
            </Box>
            <Typography>{healthCheckEntry.description}</Typography>
            <SvgIcon color={getHeartColor(healthCheckEntry.healthCheckRating)} component={FavoriteIcon}/>
            <Typography>Diagnose by {healthCheckEntry.specialist}</Typography>
        </Box>
    );
};

export default HealthCheckEntryComponent;