import { Favorite } from "@mui/icons-material";
import { SvgIcon } from "@mui/material";
import { useState } from "react";

const style = {
    disply: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: '5px'
};

const HealthRating = (props: { setHealthCheckRating: React.Dispatch<React.SetStateAction<number>>}) => {
    const { setHealthCheckRating } = props;
    const [selectedRating, setSelectedRating] = useState('');

    const mapRating = (newRating: string) => {
        if(newRating === 'Good') {
            setHealthCheckRating(2);
        }
        else if(newRating === 'Ok') {
            setHealthCheckRating(1);
        }
        else {
            setHealthCheckRating(0);
        }
    };
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedRating(event.target.value);
        mapRating(event.target.value);
    };
    
    return (
        <fieldset>
            <legend>Health Rating:</legend>

            <div style={style}>
                <input
                    type="radio"
                    id="Good"
                    name="healthCheckRating"
                    value="Good"
                    checked={selectedRating === "Good"}
                    onChange={handleChange}
                />
                <label htmlFor="Good">Good</label>
                <SvgIcon color={"success"} component={Favorite}/>
            </div>

            <div style={style}>
                <input
                    type="radio"
                    id="Ok"
                    name="healthCheckRating"
                    value="Ok"
                    checked={selectedRating === "Ok"}
                    onChange={handleChange}
                />
                <label htmlFor="Ok">Ok</label>
                <SvgIcon color={"warning"} component={Favorite}/>
            </div>

            <div  style={style}>
                <input
                    type="radio"
                    id="Bad"
                    name="healthCheckRating"
                    value="Bad"
                    checked={selectedRating === "Bad"}
                    onChange={handleChange}
                />
                <label htmlFor="Bad">Bad</label>
                <SvgIcon color={"error"} component={Favorite}/>
            </div>
        </fieldset>
    );
};

export default HealthRating;