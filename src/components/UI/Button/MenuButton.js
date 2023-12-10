import styles from './MenuButton.module.css'
import menuIcon from '../../../asserts/menu_icon.png'

const MenuButton = (props) => {
    return (
        props.visible
            ?
            <div onClick={props.onClick}
                 onMouseLeave={props.onMouseLeave}>
                <button className={styles['menu-button']}>
                    <img style={props.style} src={menuIcon} alt='arrow'/>
                </button>
                {props.open && props.children}
            </div>
            :
            <></>
    )
}

export default MenuButton