import arrowRight from '../../../asserts/arrow-right-s.svg'
import arrowDown from '../../../asserts/arrow-down-s.svg'
import styles from './ArrowButton.module.css'
const ArrowButton = (props) => {
    const image = props.downPosition ? arrowDown : arrowRight

    const classes = `${styles['arrow-button']}`

    return (
        <button className={classes} onClick={props.onClick}><img src={image} alt='arrow'/></button>
    )
}

export default ArrowButton