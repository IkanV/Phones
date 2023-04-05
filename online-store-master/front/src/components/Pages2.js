import React, {useContext,useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Pagination} from "@mui/material";
import {Grid} from "@mui/material";

const Pages2 =observer( (props) => {
    const pageCount = Math.ceil(props.totalCount / props.limit)
    const pages = []
    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1)
    }

    useEffect(()=>
    {

    },[props.pageO])

    return (

        <Pagination className={ "text-center my-3 " + props.className} style={{borderRadius: '50px'}}

                    showFirstButton showLastButton
                    variant="outlined"
                    page={props.pageO}
                    count={pages.length}
                    onChange={props.updateData}
        >
        </Pagination>
    );
})

export default Pages2