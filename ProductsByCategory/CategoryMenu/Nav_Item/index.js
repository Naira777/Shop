import React from 'react'
import {NavLink, useParams} from 'react-router-dom'
import s from './index.module.css'


const Nav_Item = ({name, id, desktop, all}) => {

    const {categoryId, filterId} = useParams()

    if (all && filterId) {
        return (
            <NavLink
                to={`/categories/${categoryId}/${id}`}
                className={s.link}
                style={({isActive}) => ({
                    color: isActive ? '#fff' : '#545e6f',
                    background: isActive ? '#3D9A85' : '#f0f0f0',
                    fontSize: desktop ? `16px` : null,
                })}
            >
                {name}
            </NavLink>
        )
    } else if (all && !filterId) {
        return (
            <NavLink
                to={`/categories/${categoryId}`}
                className={s.link}
                style={({isActive}) => ({
                    color: isActive ? '#fff' : '#545e6f',
                    background: isActive ? '#3D9A85' : '#f0f0f0',
                    fontSize: desktop ? `16px` : null,
                })}
            >
                {name}
            </NavLink>
        )
    } else {
        return (
            <NavLink
                to={`/categories/${categoryId}/${id}`}
                className={s.link}
                style={({isActive}) => ({
                    color: isActive ? '#fff' : '#545e6f',
                    background: isActive ? '#3D9A85' : '#f0f0f0',
                    fontSize: desktop ? `16px` : null,
                })}
            >
                {name}
            </NavLink>
        )
    }
}

export default Nav_Item
