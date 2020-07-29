export default ( param: number ): string => {
    if( param === 1 ){
        return `1.0`;
    }else( param === 0 ){
        return `0.0`;
    }
    return `${param}`;
};