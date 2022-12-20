import React from 'react'
import s from './index.module.css'
import {NavLink} from 'react-router-dom'

function Menu({title}) {

    return (
        <div className={s.Box}>
            <NavLink
                to={`/discountproducts/${title}`}
                className={s.link}
                style={({isActive}) => ({
                    color: isActive ? '#fff' : '#545e6f',
                    background: isActive ? '#3D9A85' : '#f0f0f0',
                })}
            >
                {title}
            </NavLink>

        </div>
    )
}
export default Menu
