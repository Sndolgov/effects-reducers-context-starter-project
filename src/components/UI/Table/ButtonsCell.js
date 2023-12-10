import styles from "./ButtonsCell.module.css";
import MenuButton from "../Button/MenuButton";
import RowMenu from "../Menu/RowMenu";
import {useState} from "react";


const ButtonsCell = (props) => {

    const [menuVisible, setMenuVisible] = useState(false)

    const onMenuClickHandler = () => {
        // console.log('onMenuClickHandler')
        setMenuVisible(!menuVisible)
        // console.log('menuVisible: ' + menuVisible)
    }

    const onMouseLeaveHandler = () => {
        // console.log('onMouseLeaveHandler')
        setMenuVisible(false)
    }

    return (
        <td className={styles['button-cell']}>
            <MenuButton
                style={{width: '1.2rem'}}
                visible={props.data}
                open={menuVisible}
                data={props.data}
                onClick={onMenuClickHandler}
                onMouseLeave={onMouseLeaveHandler}
            >
                <RowMenu index={props.data ? props.data.index : 0}/>
            </MenuButton>
        </td>
    )
}

export default ButtonsCell