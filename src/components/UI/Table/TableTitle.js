import styles from './TableTitle.module.css'
import ArrowButton from "../Button/ArrowButton";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";

const TableTitle = (props) => {
    const [collapsed, setCollapsed] = useState(true)

    const collapsedSelector = useSelector((state) => state.table.collapsed);

    useEffect(() => {
        setCollapsed(collapsedSelector)
    }, [collapsedSelector]);

    // console.log(props.text)
    const onClick = () => {
        // console.log("onClick")
        setCollapsed(!collapsed)
    }
    
    return (
        <div className={styles["title-content"]}>
            <div style={{paddingLeft:`${20 * props.layer}px`}} className={styles["title-header"]}>
                <ArrowButton downPosition={!collapsed} onClick={() => onClick()}/>
                <span className={styles["title-text"]}>{props.text}</span>
            </div>
            {collapsed && <div className={styles['title-children']}>
                {/*<TitlePanel/>*/}
                {props.children}
            </div>}
        </div>
    )
}

export default TableTitle