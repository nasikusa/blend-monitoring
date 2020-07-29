import React from "react";
import GlViewContainer from "../../../container/GlViewContainer";

/**
 * glslでの描画するアイテム(glView)のラッパー。その他のinfoなど。
 */
export default (props : any ) => {
    const {itemKey} = props;
    return(
        <>
            <GlViewContainer itemKey={itemKey} />
        </>
    )
}