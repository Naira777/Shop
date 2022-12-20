
import s from "./index.module.css";


function Item({url, title}) {

  return (
    <div className={s.content}>
      <img src={url} className={s.pic} />
      <p className={s.text}>{title}</p>
   
    </div>
  );
}

export default Item;
