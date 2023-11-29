import styles from './Row.module.css'
import Cell from "./Cell";

const DUMMY = {
    month: 'May',
    sales: '$ 98,000.00'
}

const Row = (props) => {
    // console.log('columns: ' + props.columns)
    const getCells = () => {
        // console.log("props.columns: " + JSON.stringify(props.columns))
        // console.log("props.columns: " + JSON.stringify(props.data))

        return Object.keys(props.columns).map((column, index) => {
            // console.log("props.data[column]: " + props.data[column])
            const value = props.data ? props.data[column] : props.columns[column]
            return <Cell key={index} value={value}/>
        })

        // return Object.keys(props.data).map(key => {
        //     return <Cell value={props.data[key]}/>
        // })
    }
    // const getCells = () => {
    //     return Object.keys(DUMMY).map(key => {
    //         return <Cell value={DUMMY[key]}/>
    //     })
    // }

    const rowClass = props.data ? `${styles['data-row']}` : `${styles['header-row']}`
    const classes = `${styles.row} ${rowClass}`

    return (
        <tr className={classes}>
            {getCells()}
        </tr>
    )
}

export default Row