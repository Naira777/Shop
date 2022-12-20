import React from 'react'
import s from './index.module.css'
import {NavLink} from 'react-router-dom'


function Menu({desktop}) {
    return (
        <div className={s.content}>
            <NavLink
                to="/aboutus"
                className={s.link}
                style={({isActive}) => ({
                    color: isActive ? '#fff' : '#545e6f',
                    background: isActive ? '#3D9A85' : '#f0f0f0',
                    fontSize: desktop ? `16px` : null,
                })}
            >

                Մեր մասին
            </NavLink>

            <NavLink
                to="/advantages"
                className={s.link}
                style={({isActive}) => ({
                    color: isActive ? '#fff' : '#545e6f',
                    background: isActive ? '#3D9A85' : '#f0f0f0',
                    fontSize: desktop ? `16px` : null,

                })}
            >
                Առավելությունները
            </NavLink>

            <NavLink
                to="/ourwork"
                className={s.link}
                style={({isActive}) => ({
                    color: isActive ? '#fff' : '#545e6f',
                    background: isActive ? '#3D9A85' : '#f0f0f0',
                    fontSize: desktop ? `16px` : null,
                })}
            >
                Ինչպես ենք մենք աշխատում
            </NavLink>

            <NavLink
                to="/brands"
                className={s.link}
                style={({isActive}) => ({
                    color: isActive ? '#fff' : '#545e6f',
                    background: isActive ? '#3D9A85' : '#f0f0f0',
                    fontSize: desktop ? `16px` : null,
                })}
            >
                Բրենդներ
            </NavLink>

            <NavLink
                to="/products/discountedproducts"
                className={s.link}
                style={({isActive}) => ({
                    color: isActive ? '#fff' : '#545e6f',
                    background: isActive ? '#3D9A85' : '#f0f0f0',
                    fontSize: desktop ? `16px` : null,
                })}
            >
                Զեղչեր
            </NavLink>

            <NavLink
                to="/reviews"
                className={s.link}
                style={({isActive}) => ({
                    color: isActive ? '#fff' : '#545e6f',
                    background: isActive ? '#3D9A85' : '#f0f0f0',
                    fontSize: desktop ? `16px` : null,
                })}
            >
                Կարծիքներ
            </NavLink>

            <NavLink
                to="/vacancies"
                className={s.link}
                style={({isActive}) => ({
                    color: isActive ? '#fff' : '#545e6f',
                    background: isActive ? '#3D9A85' : '#f0f0f0',
                    fontSize: desktop ? `16px` : null,
                })}
            >
                Աշխատանք
            </NavLink>

            <NavLink
                to="/contacts"
                className={s.link}
                style={({isActive}) => ({
                    color: isActive ? '#fff' : '#545e6f',
                    background: isActive ? '#3D9A85' : '#f0f0f0',
                    fontSize: desktop ? `16px` : null,
                })}
            >
                Կոնտակտներ
            </NavLink>


        </div>
    )
}

export default Menu
