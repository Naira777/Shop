import React from "react";
import { NavLink, useParams } from "react-router-dom";
import s from "./index.module.css";

const Nav_Item = ({ name, id, url, all}) => {

  const { filtertype } = useParams();

if( filtertype == undefined && all){
  return (
  <NavLink 
      to={`${url}`}
      className={s.link}
      style={({ isActive }) => ({
        color: isActive ? "#fff" : "#545e6f",
        background: isActive ? "#3D9A85" : "#f0f0f0",
       
      })}
    > 
      {name}
    </NavLink>
    )}

    if( filtertype == 'all' && all){
      return (
      <NavLink 
          to={`${url}/${id}`}
          className={s.link}
          style={({ isActive }) => ({
            color: isActive ? "#fff" : "#545e6f",
            background: isActive ? "#3D9A85" : "#f0f0f0",
           
          })}
        > 
          {name}
        </NavLink>
        )}

 else { 
 return(
    <NavLink 
      to={`${url}/${id}`}
      className={s.link}
      style={({ isActive }) => ({
        color: isActive ? "#fff" : "#545e6f",
        background: isActive ? "#3D9A85" : "#f0f0f0",
       
      })}
    > 
      {name}
    </NavLink>
    
    )}

 
 
};

export default Nav_Item;
