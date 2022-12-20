import s from "./index.module.css";
import heartgreen from "../../../assets/heartgreen.png";
import heart from '../../../assets/heart.png'
import {useRef, useState} from "react";
import {useSelector, useDispatch} from 'react-redux';
import {createLike} from "../../../redux/offersReducer";

function Item({text, url, header, time, id, green}) {

    const ref_heart = useRef();
    const [mode, setMode] = useState(false);
    const {lang} = useSelector(state => state.CategoryPage)
    const dispatch = useDispatch()
    const handleClick = () => {
        if (!mode) {
            ref_heart.current.src = `${heartgreen}`;
        } else {
            ref_heart.current.src = `${heart}`;
        }
        setMode(!mode);
        dispatch(createLike(id))
    };

    return (
        <div className={s.content}>
            <p className={s.time}> {time} </p>
            <div className={s.box1}>
                <img src={url} className={s.pic}/>
                <div className={s.box}>
                    <p className={s.header}> {header} </p>
                    <p className={s.text}> {text} </p>
                    {!green && localStorage.getItem('user') && <div className={s.heart} onClick={handleClick}>
                        <img src={heart} ref={ref_heart}/>
                    </div>}
                    {green && localStorage.getItem('user') && <div className={s.heart}>
                        <img src={heartgreen}/>
                    </div>}

                </div>
            </div>
        </div>
    );
}

export default Item;
