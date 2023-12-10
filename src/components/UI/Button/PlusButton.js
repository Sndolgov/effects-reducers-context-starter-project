import styles from './PlusButton.module.css'
import {useState} from "react";
import blackButton from '../../../asserts/black-circle.png'
import whiteButton from '../../../asserts/white-circle.png'

const PlusButton = (props) => {

    const [onFocus, setOnFocus] = useState(false)

    const onMouseEnterHandler = () => {
        console.log('onFocusHandler')
        setOnFocus(true)
    }
    const onMouseLiveHandler = () => {
        setOnFocus(false)
    }

    const image = onFocus ? blackButton : whiteButton


    return (
        <button
            className={styles['plus-button']}
            onClick={props.onClick}
            onMouseEnter={onMouseEnterHandler}
            onMouseLeave={onMouseLiveHandler}
        >
            <img src={image} alt='arrow'/>
        </button>
    )
}

export default PlusButton