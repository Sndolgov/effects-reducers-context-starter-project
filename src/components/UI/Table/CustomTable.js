import styles from './CustomTable.module.css'
import Row from "./Row";
import TableTitle from "./TableTitle";

const CustomTable = (props) => {

    const getRows = (rows, columnHeaders) => {
        return rows.map(row => {
            return <Row key={row.id} columns={columnHeaders} data={row}/>
        })
    }

    const fillTable = (data, columnHeaders, layer) => {
        // console.log("Array.isArray(data): " + Array.isArray(data))
        // console.log("data: " + JSON.stringify(data))
        // console.log("columnHeaders: " + JSON.stringify(columnHeaders))

        if (Array.isArray(data)) {
            return (
                <table key={data.id} className={styles.table}>
                    <tbody className={styles["data-table"]}>
                    <Row columns={columnHeaders}/>
                    {getRows(data, columnHeaders)}
                    </tbody>
                </table>)
        }
        return Object.keys(data).map((key, index) => {
            // console.log("key: " + key)
            // console.log("value: " + JSON.stringify(data[key]))
            const isArray = Array.isArray(data[key])
            // console.log("isArray: " + isArray)
            return (
                <TableTitle key={index + key} text={key} layer={layer}>
                    {fillTable(data[key], columnHeaders, layer+1)}
                </TableTitle>
            )
        })
    }

    return (
        <div className={styles["table-main"]}>
            {fillTable(props.data, props.columnHeaders, 0)}
            {/*<TableTitle text='Table header'>*/}
            {/*<table className={styles["table-fill"]}>*/}
            {/*<table className={styles.table}>*/}
            {/*<thead>*/}
            {/*<tr className={styles['header-row']}>*/}
            {/*    {getHeaders()}*/}
            {/*</tr>*/}
            {/*</thead>*/}
            {/*<tbody className={styles["table-hover"]}>*/}
            {/*<tbody className={styles["data-table"]}>*/}
            {/*<Row columns={visibleColumns}/>*/}
            {/*{getRows()}*/}
            {/*</tbody>*/}
            {/*</table>*/}
            {/*</TableTitle>*/}
        </div>
    )
}

export default CustomTable