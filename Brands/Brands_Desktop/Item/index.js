import {NavLink} from 'react-router-dom'
import s from './index.module.css'

function Item({url, id}) {
    return (
        <NavLink to={`/brand_products/${id}`}>
            <div className={s.pic_box}>
                <img src={url} className={s.pic}/>
            </div>
        </NavLink>
    )
}

export default Item
