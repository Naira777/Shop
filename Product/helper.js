const getCatId =(catId)=> {
    const len= catId.length
    let id;
    for(let i = 0; i<len; i ++){
        id = {`${catId}`}.charAt(0,i) 
    }
}