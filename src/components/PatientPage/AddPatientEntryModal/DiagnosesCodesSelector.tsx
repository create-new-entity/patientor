

import * as React from 'react';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import diagnosesService from "../../../services/diagnoses";
import { Diagnosis } from '../../../types';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


const DiagnosesCodesSelector = ({ setSelectedDiagnosesCodes }: { setSelectedDiagnosesCodes: React.Dispatch<React.SetStateAction<Array<Diagnosis['code']>>> }) => {
    const [personName, setPersonName] = React.useState<string[]>([]);
    const [diagnosesCodes, setDiagnosesCodes] = React.useState<Diagnosis[]>([]);

    React.useEffect(() => {
        (async () => {
            const allDiagnoses = await diagnosesService.getAllDiagnoses();
            setDiagnosesCodes(allDiagnoses);
        })();
    }, []);

    const handleChange = (event: SelectChangeEvent<typeof personName>) => {
        const { target: { value } } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value
        );
        setSelectedDiagnosesCodes(value);
    };

    return (
        <div>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-chip-label">Diagnosis</InputLabel>
                <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    fullWidth
                    value={personName}
                    onChange={handleChange}
                    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                            <Chip key={value} label={value} />
                        ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                {diagnosesCodes.map((diagnosisCode) => (
                    <MenuItem
                        key={diagnosisCode.code}
                        value={diagnosisCode.code}
                        // style={getStyles(name, personName, theme)}
                    >
                        {`${diagnosisCode.code} ${diagnosisCode.name}`}
                    </MenuItem>
                ))}
                </Select>
            </FormControl>
        </div>
    );
};

export default DiagnosesCodesSelector;
