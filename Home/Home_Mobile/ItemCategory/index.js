import s from "./index.module.css";

function ItemCategory({title, url}) {
      return (
        <div className={s.content}>
            <div className={s.pic_box}>
            <img src={url} className={s.pic}/>
            </div>
            <p className={s.text}> {title} </p>
        </div>
    );
 }
export default ItemCategory;
