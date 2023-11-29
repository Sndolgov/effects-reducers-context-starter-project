import styles from './Cell.module.css'

const Cell = (props) => {
    return (
        <td className={styles.cell}>{props.value}</td>
    )
}

export default Cell