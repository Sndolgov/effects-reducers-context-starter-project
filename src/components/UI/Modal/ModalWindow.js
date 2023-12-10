import {Modal} from "@mui/material";

const ModalWindow = (props) => {
    return (
        <Modal
            open={props.visible}
            onClose={props.onClose}
            >
            {props.children}
        </Modal>
    )

}

export default ModalWindow