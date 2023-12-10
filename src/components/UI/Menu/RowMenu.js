import styles from './RowMenu.module.css'
import {useDispatch} from "react-redux";
import {dataActions} from "../../../store/data-slice";

const DUMMY_MENU_ITEMS = {
    'Delete line': (dispatchAction, index) => dispatchAction(dataActions.deleteRow(index)),
    // 'Delete line': (dispatchAction, id) => console.log('id: ' + id),
    'Add the line above': (dispatchAction, index) => dispatchAction(dataActions.addRow({index: index, above: true})),
    'Add the line below': (dispatchAction, index) => dispatchAction(dataActions.addRow({index: index, above: false}))
}



const RowMenu = (props) => {

    const dispatchAction = useDispatch()

    const getMenuItems = () => {
        return Object.keys(DUMMY_MENU_ITEMS).map((item, index) => {
            // return <div key={index} onClick={() => DUMMY_MENU_ITEMS[item](dispatchAction, props.id)}>
            return <div key={index}>
                <div className={styles.item}  onClick={() => DUMMY_MENU_ITEMS[item](dispatchAction, props.index)}>
                    {item}
                </div>
                {index < DUMMY_MENU_ITEMS.length - 1 && <hr className={styles['item-hr']}/>}
            </div>
        })
    }

    return (
        <div className={styles["dropdown"]}>
            <div id="myDropdown" className={styles["dropdown-content"]}>
                {getMenuItems()}
            </div>
        </div>
    )
}

export default RowMenu