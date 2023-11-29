import CustomTable from "./CustomTable";
import {useDispatch, useSelector} from "react-redux";
import {tableActions} from "../../../store/table-slice";
import ExpandCollapseButton from "../Button/ExpandCollapseButton";


const DUMMY_COLUMNS = {
    id: {displayName: 'ID', visible: true, aggregator: false, index: 0},
    cashFlow: {displayName: 'Cash flow', visible: true, aggregator: true, index: 1},
    person: {displayName: 'Person', visible: true, aggregator: true, index: 2},
    bank: {displayName: 'Bank', visible: true, aggregator: true, index: 3},
    date: {displayName: 'Payment date', visible: true, aggregator: false, index: 4},
    expenseName: {displayName: 'expenseName name', visible: true, aggregator: false, index: 5},
    amount: {displayName: 'Amount', visible: true, aggregator: false, index: 6}
}

const EXPENSES = 'Expenses'
const INCOME = 'Income'

const DUMMY_ROWS = [
    {
        id: 1,
        cashFlow: EXPENSES,
        person: 'Sergey',
        bank: 'Discount',
        date: 10,
        expenseName: 'Loan',
        amount: 600
    },
    {
        id: 2,
        cashFlow: EXPENSES,
        date: 12,
        person: 'Sergey',
        bank: 'Discount',
        expenseName: 'Morgage',
        amount: 5600
    },
    {
        id: 3,
        cashFlow: EXPENSES,
        date: 11,
        person: 'Varya',
        bank: 'Discount',
        expenseName: 'Fuel',
        amount: 350
    },
    {
        id: 4,
        cashFlow: EXPENSES,
        date: 10,
        person: 'Varya',
        bank: 'Leumi',
        expenseName: 'Cell phone',
        amount: 50
    },
    {
        id: 5,
        cashFlow: EXPENSES,
        date: 11,
        person: 'Varya',
        bank: 'Leumi',
        expenseName: 'David',
        amount: 400
    },
    {
        id: 6,
        cashFlow: EXPENSES,
        date: 10,
        person: 'Sergey',
        bank: 'Leumi',
        expenseName: 'Shopping',
        amount: 5000
    },
    {
        id: 7,
        cashFlow: INCOME,
        date: 10,
        person: 'Sergey',
        bank: 'Leumi',
        expenseName: 'Ribbon',
        amount: 18000
    },
    {
        id: 8,
        cashFlow: INCOME,
        date: 10,
        person: 'Varya',
        bank: 'Discount',
        expenseName: 'BA Studio',
        amount: 10000
    }
]

const TOTAL_COLUMNS = {
    person: 'Person',
    income: 'Income',
    expenses: 'Amount'
}

const Sheet = (props) => {

    // const [collapsed, setCollapsed] = useState(true)
    const collapsedSelector = useSelector((state) => state.table.collapsed);
    const dispatchAction = useDispatch()


    const getAggregatorColumns = () => {
        let aggregatorColumns = {}
        Object.keys(DUMMY_COLUMNS).forEach(column => {
            const columnValue = DUMMY_COLUMNS[column]
            if (columnValue.visible && columnValue.aggregator) {
                aggregatorColumns[columnValue.index] = column
            }
        })
        return aggregatorColumns
    }

    const fillMap = (field, rows) => {
        let data = {}
        rows.forEach(row => {
            const value = row[field]
            if (!value) {
                console.log("row[field]: " + field)
                console.log("row: " + JSON.stringify(row))
            }
            if (!data[value]) {
                data[value] = []
            }
            data[value].push(row)
        })
        return data
    }

    const aggregate = (fields, indexField, rows) => {
        // console.log('fields: ' + JSON.stringify(fields))
        if (fields.length - 1 < indexField) {
            return rows
        }
        let data = fillMap(fields[indexField], rows)
        Object.keys(data).forEach(key => {
            data[key] = aggregate(fields, indexField + 1, data[key])
        })
        return data;
    }

    const getDataForTables = () => {
        const data =  aggregate(Object.values(getAggregatorColumns()), 0, DUMMY_ROWS)
        // console.log('getDataForTables: ' + JSON.stringify(data))
        return data
    }

    // getDataForTables()

    const getColumnHeaders = () => {
        let displayColumns = {}
        Object.keys(DUMMY_COLUMNS).forEach(header => {
            const columnHeader = DUMMY_COLUMNS[header]
            if (columnHeader.visible && !columnHeader.aggregator) {
                displayColumns[columnHeader.index] = {name: `${header}`, displayName: `${columnHeader.displayName}`}
            }
        })
        let result = {}
        Object.keys(displayColumns).forEach(key => {
            const column = displayColumns[key]
            // console.log("column: " + JSON.stringify(column))
            result[`${column.name}`] = `${column.displayName}`
        })
        // console.log("displayColumns: " + JSON.stringify(displayColumns))
        return result
    }

    const getTotal = () => {
        let data = {}
        DUMMY_ROWS.forEach(row => {
            const person = row['person']
            const cashFlow = row['cashFlow']
            if (!data[person]) {
                if (cashFlow === INCOME) {
                    data[person] = {id: `${row.id}`, person: `${person}`, income: parseInt(`${row['amount']}`), expenses: 0}
                } else {
                    data[person] = {id: `${row.id}`, person: `${person}`, income: 0, expenses: parseInt(`${row['amount']}`)}
                }
            } else {
                if (cashFlow === INCOME) {
                    let currentData = data[person];
                    currentData['income'] = currentData['income'] + parseInt(row['amount'])
                    data[person] = currentData
                } else {
                    let currentData = data[person];
                    currentData['expenses'] = currentData['expenses'] + parseInt(row['amount'])
                    data[person] = currentData
                }
            }
        })
        const values = Object.values(data)
        let result = {}
        result['Total'] = values
        // return Object.values(data)
        // return {Total :[{"person":"Sergey","income":18000,"expenses":11200},{"person":"Varya","income":10000,"expenses":800}]}
        return result
    }

    getTotal()

    return (
        <div>
            <ExpandCollapseButton collapsed={collapsedSelector} onClick={() => dispatchAction(tableActions.setCollapse(!collapsedSelector))}/>
            <CustomTable columnHeaders={getColumnHeaders()} data={getDataForTables()}/>
            <CustomTable columnHeaders={TOTAL_COLUMNS} data={getTotal()}/>
        </div>
    )
}

export default Sheet