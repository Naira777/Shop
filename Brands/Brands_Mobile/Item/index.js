import {NavLink} from "react-router-dom";
import s from "./index.module.css";


function Item({url, id}) {

    return (

        <NavLink to={`/brand_products/${id}`}>
            <img src={url} className={s.pic}/>
        </NavLink>

    );

}

export default Item;
