export default ( param: number ): string => {
    if( param === 1 ){
        return `1.0`;
    }else if( param === 0 ){
        return `0.0`;
    }else{
        return `${param}`;
    }
};