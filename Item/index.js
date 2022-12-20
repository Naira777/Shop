import s from "./index.module.css";

function Item(props) {
  return (
    <div className={s.content}>
      <img src={props.url} className={s.pic} />
      <p className={s.text}> {props.text} </p>
      
    </div>
  );
}

export default Item;
