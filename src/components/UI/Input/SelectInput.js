import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import React from "react";
import { makeStyles } from "@material-ui/core/styles";



const SelectInput = (props) => {

    const useStyles = makeStyles({
        selectBorder: {
            '& .MuiOutlinedInput-notchedOutline': {
                // border: 'none'
            }
        }
    });
    const getMenuItems = () => {
        return props.values.map((value, index) => {
            return <MenuItem key={index} value={value}>{value}</MenuItem>
        })
    }

    const classes = useStyles();

    return (<Box style={{width: '80%'}}>
        {/*<FormControl style={{width: '80%'}}>*/}
        <FormControl fullWidth>
            <InputLabel shrink={true} id="demo-simple-select-label">{props.label}</InputLabel>
            <Select
                // className={classes.selectBorder}
                notched={true}
                label={props.label}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={props.value}
                onChange={props.onChange}
                style={{height: '2rem'}}
            >
                {getMenuItems()}
            </Select>
        </FormControl>
    </Box>)
}

export default SelectInput