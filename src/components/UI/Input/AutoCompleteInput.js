import {Autocomplete, TextField} from "@mui/material";
import {makeStyles} from "@material-ui/core/styles";

const top100Films = [
    {label: 'The Shawshank Redemption', year: 1994},
    {label: 'The Godfather', year: 1972}]

const useStyles = makeStyles({
    selectBorder: {
        '& .MuiInputBase-input': {
            height: 20
        }
    }
});

const AutoCompleteInput = (props) => {

    const classes = useStyles();

    return (
        <Autocomplete
            placeholder="Combo box"
            className={classes.selectBorder}
            options={top100Films}
            style={{width: '80%'}}
            renderInput={
                (params) => <
                    TextField {...params}
                              InputProps={{style: { height: '2rem'}}}
                              InputLabelProps={{ shrink: true }}
                              label="Movie"
                />
            }

        />
    )
}

export default AutoCompleteInput