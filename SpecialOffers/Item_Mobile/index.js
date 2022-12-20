import s from "./index.module.css";
import heartgreen from "../../../assets/heartgreen.png";
import heart from "../../../assets/heart.png";
import {useRef, useState} from "react";
import { createLike } from "../../../redux/offersReducer";
import { useDispatch } from 'react-redux';

function Item_Mobile({text, url, header, time, id, green}) {
    const ref_heart = useRef();
    const [mode, setMode] = useState(false);
    const dispatch = useDispatch()
    const handleClick = () => {
        !mode ? ref_heart.current.src = `${heartgreen}` : ref_heart.current.src = `${heart}`;
        setMode(!mode);
          dispatch(createLike(id))
    };


    return (
        <div className={s.content}>
            <p className={s.time}> {time} </p>
            <p className={s.header}> {header} </p>
            <div className={s.box}>
                <img src={url} className={s.pic}/>
                <p className={s.text}> {text} </p>
                {!green && localStorage.getItem('user') && <div className={s.heart} onClick={handleClick}>
                    <img src={heart} ref={ref_heart}/>
                </div>}

                {green && localStorage.getItem('user') && <div className={s.heart} onClick={handleClick}>
                    <img src={heartgreen} ref={ref_heart}/>
                </div>}


            </div>
        </div>
    );
}

export default Item_Mobile;
