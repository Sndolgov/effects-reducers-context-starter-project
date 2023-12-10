import collapsed from '../../../asserts/collapse.jpg'
import expaned from '../../../asserts/expand.jpg'
import styles from './ExpandCollapseButton.module.css'
const ExpandCollapseButton = (props) => {
    const image = props.collapsed ? expaned : collapsed

    const classes = `${styles['image-button']}`

    return (
        <button className={classes} onClick={props.onClick}><img src={image} alt='collapse'/></button>
    )
}

export default ExpandCollapseButton