import React  from 'react'
import s from './index.module.css'
import {NavLink, useParams} from 'react-router-dom'


function RecipesMenu({title, cat_id, desktop, all}) {

    const {filtertype} = useParams()


    if( filtertype == undefined && all){
        return (
        <NavLink 
           to={`/recipes`}
            className={s.link}
            style={({ isActive }) => ({
              color: isActive ? "#fff" : "#545e6f",
              background: isActive ? "#3D9A85" : "#f0f0f0",
              fontSize: desktop ? '16px' : null,
            })}
          > 
            {title}
          </NavLink>
          )}
      
          if( cat_id ==='all' ){
            return (
            <NavLink 
                 to={`/recipes/all`}
                className={s.link}
                style={({ isActive }) => ({
                  color: isActive ? "#fff" : "#545e6f",
                  background: isActive ? "#3D9A85" : "#f0f0f0",
                  fontSize: desktop ? '16px' : null,
                })}
              > 
              {title}
              </NavLink>
              )}
  
    else {
    return (
        <NavLink
            to={`/recipes/${cat_id}`}
            className={s.link}
            style={({isActive}) => ({
                color: isActive ? '#fff' : '#545e6f',
                background: isActive ? '#3D9A85' : '#f0f0f0',
                fontSize: desktop ? '16px' : null,


            })}
        >
            {title}
        </NavLink>


    ) 


    }

}

export default RecipesMenu
