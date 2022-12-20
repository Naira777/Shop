import React from "react";
import {useWindowSize} from './../../CustomHooks/getWindowWidth';
import ProductsByType_Desktop from './ProductsByType_Desktop/index';
import ProductsByType_Mobile from './ProductsByType_Mobile/index';


function ProductsByType() {

    const [height, width] = useWindowSize();

    return (
        <div>
            {width > 500 ? <ProductsByType_Desktop/> : <ProductsByType_Mobile/>}
        </div>
    );
}

export default ProductsByType;
