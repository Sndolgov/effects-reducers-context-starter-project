import {createSlice} from "@reduxjs/toolkit";

const EXPENSES = 'Expenses'
const INCOME = 'Income'

const DUMMY_COLUMNS = {
    id: {displayName: 'ID', visible: true, aggregator: false, index: 1, type: 'number', defaultValue: 0, editable: false},
    index: {displayName: 'Index', visible: true, aggregator: false, index: 0, type: 'number', defaultValue: 0, editable: false},
    cashFlow: {displayName: 'Cash flow', visible: true, aggregator: true, index: 2, type: 'text', defaultValue: "", editable: true, values: [EXPENSES, INCOME]},
    person: {displayName: 'Person', visible: true, aggregator: true, index: 3, type: 'text', defaultValue: "", editable: true},
    bank: {displayName: 'Bank', visible: true, aggregator: true, index: 4, type: 'text', defaultValue: "", editable: true},
    date: {displayName: 'Payment date', visible: true, aggregator: false, index: 5, type: 'number', defaultValue: 10, editable: true},
    expenseName: {displayName: 'Expenses name', visible: true, aggregator: false, index: 6, type: 'text', defaultValue: "", editable: true},
    amount: {displayName: 'Amount', visible: true, aggregator: false, index: 7, type: 'number', defaultValue: 0, editable: true}
}



const DUMMY_ROWS = {
    1: {
        id: 11,
        index: 1,
        cashFlow: EXPENSES,
        person: 'Sergey',
        bank: 'Discount',
        date: 10,
        expenseName: 'Loan',
        amount: 600
    }/*,
    8: {
        id: 2,
        index: 8,
        cashFlow: EXPENSES,
        date: 12,
        person: 'Sergey',
        bank: 'Discount',
        expenseName: 'Morgage',
        amount: 5600
    },
    7: {
        id: 3,
        index: 7,
        cashFlow: EXPENSES,
        date: 11,
        person: 'Varya',
        bank: 'Discount',
        expenseName: 'Fuel',
        amount: 350
    },
    6: {
        id: 5,
        index: 6,
        cashFlow: EXPENSES,
        date: 10,
        person: 'Varya',
        bank: 'Leumi',
        expenseName: 'Cell phone',
        amount: 50
    },
    5: {
        id: 4,
        index: 5,
        cashFlow: EXPENSES,
        date: 11,
        person: 'Varya',
        bank: 'Leumi',
        expenseName: 'David',
        amount: 400
    },
    4: {
        id: 6,
        index: 4,
        cashFlow: EXPENSES,
        date: 10,
        person: 'Sergey',
        bank: 'Leumi',
        expenseName: 'Shopping',
        amount: 5000
    },
    3: {
        id: 7,
        index: 3,
        cashFlow: INCOME,
        date: 10,
        person: 'Sergey',
        bank: 'Leumi',
        expenseName: 'Ribbon',
        amount: 18000
    },
    2: {
        id: 8,
        index: 2,
        cashFlow: INCOME,
        date: 10,
        person: 'Varya',
        bank: 'Discount',
        expenseName: 'BA Studio',
        amount: 10000
    }*/
}

const TOTAL_COLUMNS = {
    person: {displayName: 'Person', type: 'text'},
    income: {displayName: 'Income', type: 'number'},
    expenses: {displayName: 'Amount', type: 'number'}
}

const initialState = {
    mainColumns: DUMMY_COLUMNS,
    rows: DUMMY_ROWS,
    totalColumns: TOTAL_COLUMNS,
    nextIndex: 0
    // aggregateColumns: []
}

const dataSlice = createSlice({
    name: "table",
    initialState,
    reducers: {
        setCollapse(state, action) {
            state.collapsed = action.payload
        },
        updateField(state, action) {
            // console.log('action.payload:' + JSON.stringify(action.payload))
            let{index, field, value} = action.payload
            state.rows[index][field] = value
        },
        updateNextIndex(state) {
            let maxIndex = 0
            Object.keys(state.rows).forEach(index => {
                if (maxIndex < index) {
                    maxIndex = index
                }
            })
            state.nextIndex = parseInt(maxIndex) + 1
        },
        // updateAggregateColumns(state, action) {
        //     const columns = action.payload
        //     state.aggregateColumns = Object.values(getAggregatorColumns(columns))
        // },
        deleteRow(state, action) {
            const id = action.payload
            delete state.rows[id]
        },
        addRow(state, action) {
            const index = action.payload.index
            const above = action.payload.above
            console.log('index: ' + index)
            addRow(index, above, state);
        }
    }
})

function putNewRow(state, index, newRow) {
    newRow['index'] = index
    let indexes = Object.keys(state.rows).reverse();
    indexes.forEach(indexRow => {
        if (parseInt(indexRow) >= index) {
            let row = state.rows[indexRow]
            indexRow = parseInt(indexRow) + 1
            row['index'] = indexRow
            state.rows[indexRow] = row
        }
    })
    state.rows[index] = newRow
}

function addRow(index, above, state) {
    let row = state.rows[index];
    let newRow = {};
    // console.log('row: ' + JSON.stringify(row))
    // console.log('state.nextIndex: ' + state.nextIndex)
    Object.keys(state.mainColumns).forEach(field => {
        if (state.mainColumns[field].aggregator) {
            newRow[field] = row[field]
        } else {
            newRow[field] = state.mainColumns[field].defaultValue
        }
    })
    if (above) {
        putNewRow(state, index, newRow);
        // newRow['index'] = row['index']
        // row['index'] = state.nextIndex
    } else {
        putNewRow(state, index +1, newRow)
    }
    // console.log('row: ' + JSON.stringify(row))
    // console.log('newRow: ' + JSON.stringify(newRow))
    state.rows[row.index] = row
    state.rows[newRow.index] = newRow
    state.nextIndex = parseInt(state.nextIndex) + 1
}

const getAggregatorColumns = (columns) => {
    let aggregatorColumns = {}
    Object.keys(columns).forEach(column => {
        const columnValue = DUMMY_COLUMNS[column]
        if (columnValue.visible && columnValue.aggregator) {
            aggregatorColumns[columnValue.index] = column
        }
    })
    // console.log('aggregatorColumns: ' + JSON.stringify(aggregatorColumns))
    return aggregatorColumns
}

const fillMap = (field, rows) => {
    let data = {}
    rows.forEach(row => {
        const value = row[field]
        if (!value) {
            // console.log("row[field]: " + field)
            // console.log("row: " + JSON.stringify(row))
        }
        if (!data[value]) {
            data[value] = []
        }
        data[value].push(row)
    })
    return data
}

function sort(rows) {
    let sortedRows = {}
    rows.forEach(row => {
        sortedRows[row.index] = row;
    })
    return Object.values(sortedRows);
}

const aggregate = (fields, indexField, rows) => {
    // console.log('fields: ' + JSON.stringify(fields))
    if (fields.length - 1 < indexField) {
        rows = sort(rows)
        return rows
    }
    let data = fillMap(fields[indexField], rows)
    Object.keys(data).forEach(key => {
        data[key] = aggregate(fields, indexField + 1, data[key])
    })
    return data;
}

export const getDataForTables = (rows) => {
    const data = aggregate(Object.values(getAggregatorColumns(DUMMY_COLUMNS)), 0, Object.values(rows))
    // console.log('getDataForTables: ' + JSON.stringify(data))
    return data
}

// getDataForTables()

export const getColumnHeaders = (columns) => {
    let displayColumns = {}
    Object.keys(columns).forEach(header => {
        const columnHeader = DUMMY_COLUMNS[header]
        // console.log('columnHeader.type:' + JSON.stringify(columnHeader.type))
        if (columnHeader.visible && !columnHeader.aggregator) {
            displayColumns[columnHeader.index] = {name: `${header}`, displayName: `${columnHeader.displayName}`
                , type: `${columnHeader.type}`, editable: `${columnHeader.editable}`}
        }
    })
    let result = {}
    Object.keys(displayColumns).forEach(key => {
        const column = displayColumns[key]
        // console.log("column: " + JSON.stringify(column))
        result[`${column.name}`] = column
    })
    // console.log("displayColumns: " + JSON.stringify(displayColumns))
    return result
}

export const getTotalRows = (rows) => {
    let data = {}
    if (Object.keys(rows).length === 0) {
        return data
    }
    Object.values(rows).forEach(row => {
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

export const getDefaultRow = () => {
    let row = {}
    Object.keys(DUMMY_COLUMNS).forEach(column => {

        row[`${column}`] = `${DUMMY_COLUMNS[column].defaultValue}`
    })
    // console.log('row: ' + JSON.stringify(row))
    return row;
}

export const dataActions = dataSlice.actions
export default dataSlice.reducer



