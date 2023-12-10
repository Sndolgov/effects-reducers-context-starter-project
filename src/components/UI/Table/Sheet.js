import CustomTable from "./CustomTable";
import {useDispatch, useSelector} from "react-redux";
import {dataActions, getColumnHeaders, getDataForTables, getTotalRows} from "../../../store/data-slice";
import {useEffect, useState} from "react";
import ToolBar from "./ToolBar";

const Sheet = () => {

    const [data, setData] = useState({})

    // const [collapsed, setCollapsed] = useState(true)
    const totalColumns = useSelector((state) => state.data.totalColumns);
    const mainColumns = useSelector((state) => state.data.mainColumns);
    const rows = useSelector((state) => state.data.rows);
    const dispatchAction = useDispatch()


    useEffect(() => {
        dispatchAction(dataActions.updateNextIndex())
    }, [mainColumns, dispatchAction]);

    useEffect(() => {
        // console.log('updated rows: ' + JSON.stringify(rows))
        setData(rows)
    }, [rows]);



    return (
        <div>
            <ToolBar/>
            <CustomTable columnHeaders={getColumnHeaders(mainColumns)} data={getDataForTables(data)}/>
            <CustomTable columnHeaders={totalColumns} data={getTotalRows(data)}/>
        </div>
    )
}

export default Sheet