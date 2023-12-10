import styles from './Cell.module.css'
import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {dataActions} from "../../../store/data-slice";
import {tableActions} from "../../../store/table-slice";
import SelectInput from "../Input/SelectInput";
import AutoCompleteInput from "../Input/AutoCompleteInput";

const Cell = (props) => {
    const [editing, setEditing] = useState(false);
    const [value, setValue] = useState("")
    const [validCell, setValidCell] = useState(true)
    const dispatchAction = useDispatch()
    const cellInputRef = useRef();
    const mainColumns = useSelector((state) => state.data.mainColumns);

    const isDataRow = !!props.data
    const rowIndex = isDataRow ? props.data['index'] : 0
    const column = props.columns[props.columnName]
    const editable = isDataRow && column.editable
    const type = isDataRow ? column.type : 'text'

    useEffect(() => {
        const hasValue = !!(value && value.length > 0)
        const cellValid = !editable || !mainColumns[props.columnName].aggregator || hasValue
        if (editable && mainColumns[props.columnName].aggregator) {
            if (cellValid !== validCell) {
                if (!cellValid) {
                    dispatchAction(tableActions.addInvalidCell(props.columnName))
                } else {
                    dispatchAction(tableActions.removeInvalidCell(props.columnName))
                }
            }
        }
        setValidCell(cellValid)
    }, [mainColumns, value, editable, dispatchAction, props.columnName]);

    useEffect(() => {
        const value = isDataRow ? props.data[props.columnName] : column.displayName
        setValue(value)
    }, [props.columnName, props.columns, props.columnName, isDataRow]);

    const onClickHandler = () => {
        if (!validCell) {
            setEditing(true)
        }
    }

    const onCellDoubleClick = () => {
        // console.log('onCellDoubleClick: ' + props.index)
        if (editable) {
            setEditing(true)
        }
    }

    const onChangeHandle = (event) => {
        console.log('handleChange: ' + event.target.value)
        setValue(event.target.value)
    }
    const handleBlur = (event) => {
        console.log('handleBlur')
        if (parseInt(props.id) !== 0 && validCell) {
            dispatchAction(dataActions.updateField({
                    index: rowIndex,
                    field: `${props.columnName}`,
                    value: `${event.target.value}`
                }
            ))
        }
    }

    const classesInput = editing ? styles['input-editing']
        : validCell ? styles['input-read-only'] : styles.invalid;

    const getContent = () => {
        if (editable && column.aggregator) {
            return column.values
                ? <SelectInput values={column.values} value={value} label={column.displayName}
                                onChange={onChangeHandle}/>
                : <AutoCompleteInput/>
        }
        else {
            return (<input className={classesInput}
                           ref={cellInputRef}
                           id='value'
                           type={type}
                           value={value}
                           onClick={onClickHandler}
                           onChange={onChangeHandle}
                           onBlur={handleBlur}
                           readOnly={!editing}
            />)
        }
    }

    return (
        <td className={styles.cell} onDoubleClick={onCellDoubleClick}>
            {getContent()}
        </td>
    )
}

export default Cell