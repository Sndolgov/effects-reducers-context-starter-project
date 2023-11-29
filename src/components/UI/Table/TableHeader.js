import styles from "./CustomTable.module.css";


const TableHeader = (props) => {
    return (
        <div className={styles["table-header"]}>
            Table header
            {props.children}
        </div>
    )
}