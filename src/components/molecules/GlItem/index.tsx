import React from "react";
import GlViewContainer from "../../../container/GlViewContainer";

export default (props : any ) => {
    return(
        <>
            <GlViewContainer itemKey={props.itemKey} />
        </>
    )
}