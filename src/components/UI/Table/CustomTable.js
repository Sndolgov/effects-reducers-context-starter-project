import styles from './CustomTable.module.css'
import Row from "./Row";
import TableTitle from "./TableTitle";

const CustomTable = (props) => {

    // console.log("props.columnHeaders: " + JSON.stringify(props.columnHeaders))
    const getRows = (rows, columnHeaders) => {
        return rows.map(row => {
            // console.log('row: ' + JSON.stringify(row))
            // console.log('columnHeaders: ' + JSON.stringify(columnHeaders))
            const key = row.index ? row.index : row.id
            return <Row withButtonsCell={true} key={key} columns={columnHeaders} data={row}/>
        })
    }

    const fillTable = (data, columnHeaders, layer) => {
        if (Array.isArray(data)) {
            // console.log('row: ' + JSON.stringify(data))
            return (
                <table key={data.index} className={styles.table}>
                    <tbody className={styles["data-table"]}>
                    <Row withButtonsCell={true}  key={data.index} columns={columnHeaders}/>
                    {getRows(data, columnHeaders)}
                    </tbody>
                </table>)
        }

        return Object.keys(data).map((key, index) => {
            // console.log("key: " + key)
            // console.log("value: " + JSON.stringify(data[key]))
            // const isArray = Array.isArray(data[key])
            // console.log("isArray: " + isArray)
            return (
                <TableTitle key={index + key} text={key} layer={layer}>
                    {fillTable(data[key], columnHeaders, layer + 1)}
                </TableTitle>
            )
        })
    }


    // console.log('dataExists: ' + dataExists)
    // console.log('size: ' + Object.values(props.data).length)
    // console.log('props.data: ' + JSON.stringify(props.data))

    // const getContent = () => {
    //     if (Object.values(props.data)) {
    //         return <div className={styles["table-main"]}>
    //             {props.data && fillTable(props.data, props.columnHeaders, 0, [])}
    //         </div>
    //     }
    //     return <div/>
    // }

    return (
            <div className={styles["table-main"]}>
                {props.data && fillTable(props.data, props.columnHeaders, 0, [])}
            </div>
    )
}

export default CustomTable