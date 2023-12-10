
import {Button} from "@mui/material";

const MaterialButton = (props) => {
    return (
        <Button
            onClick={props.onClick}
            style={{backgroundColor: `${props.color}`, width: '10rem'}} variant="contained"
            disabled={props.disabled}
        >{props.children}
        </Button>

    )

}

export default MaterialButton