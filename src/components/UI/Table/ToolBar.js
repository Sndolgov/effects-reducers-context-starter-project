import ExpandCollapseButton from "../Button/ExpandCollapseButton";
import {tableActions} from "../../../store/table-slice";
import {useDispatch, useSelector} from "react-redux";
import React, {useState} from "react";
import styles from './ToolBar.module.css'
import ModalWindow from "../Modal/ModalWindow";
import MenuButton from "../Button/MenuButton";
import Row from "./Row";
import {getDefaultRow} from "../../../store/data-slice";
import MaterialButton from "../Button/MaterialButton";


const ToolBar = () => {

    const [modalVisible, setModalVisible] = useState(false)

    const [menuVisible, setMenuVisible] = useState(false)

    const onMenuClickHandler = () => {
        console.log('onMenuClickHandler')
        setMenuVisible(!menuVisible)
        setModalVisible(!modalVisible)
        // console.log('menuVisible: ' + menuVisible)
    }

    const closeModalWindow = () => {
        console.log('closeModalWindow')
        setModalVisible(false)
    }

    const dispatchAction = useDispatch()
    const collapsedSelector = useSelector((state) => state.table.collapsed);
    const invalidCells = useSelector((state) => state.table.invalidCells);
    const mainColumns = useSelector((state) => state.data.mainColumns);

    const addButtonColor = invalidCells.length === 0 ? 'green' : 'gray'

    return (
        <div className={styles['tool-bar']}>
            <ExpandCollapseButton collapsed={collapsedSelector}
                                  onClick={() => dispatchAction(tableActions.setCollapse(!collapsedSelector))}/>
            <MenuButton
                style={{width: '1.7rem'}}
                visible={true}
                onClick={onMenuClickHandler}
                open={menuVisible}
            >
            </MenuButton>
            <ModalWindow visible={modalVisible}>
                <div>
                    <table className={styles['default-row']}>
                        <tbody>
                        <Row key={'modal-row-columns'} columns={mainColumns}/>
                        <Row key={'modal-row-data'} columns={mainColumns} data={getDefaultRow()}
                             withButtonsCell={false}/>
                        </tbody>
                    </table>
                    <div className={styles['buttons-section']}>
                        <MaterialButton color={'red'} onClick={closeModalWindow}>
                            Cancel
                        </MaterialButton>
                        <MaterialButton color={addButtonColor} disabled={invalidCells.length !== 0}>
                            Add
                        </MaterialButton>
                    </div>
                </div>
            </ModalWindow>
        </div>
    )
}

export default ToolBar