import styles from './Row.module.css'
import Cell from "./Cell";
import ButtonsCell from "./ButtonsCell";


const Row = (props) => {
    // console.log("props.columns: " + JSON.stringify(props.columns))
    const getCells = () => {
        // console.log("props.columns: " + JSON.stringify(props.columns))
        // console.log("props.data: " + JSON.stringify(props.data))

        return Object.keys(props.columns).map((columnName, index) => {
            const isDataRow = !!props.data
            const id = isDataRow ? props.data['id'] : 0
            return <Cell
                key={index+id}
                id={id}
                columnName={columnName}
                data={props.data}
                columns={props.columns}
            />
        })
    }


    const rowClass = props.data ? `${styles['data-row']}` : `${styles['header-row']}`
    const classes = `${styles.row} ${rowClass}`


    return (
        <tr className={classes}>
            {props.withButtonsCell && <ButtonsCell data={props.data}/>}
            {getCells()}
        </tr>
    )
}

export default Row