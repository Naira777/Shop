import {useWindowSize} from './../../CustomHooks/getWindowWidth';
import Product_Desktop from './Product_Desktop/index';
import Product_Mobile from './Product_Mobile/index';


function Product() {

    const [height, width] = useWindowSize();

    return (
        <div>
            {width > 500 ? <Product_Desktop/> : <Product_Mobile/>}
        </div>
    );
}

export default Product;
