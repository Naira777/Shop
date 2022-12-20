import { useNavigate } from "react-router-dom";
import s from "./index.module.css";


function Item_Mobile({title, url, id}) {

const navigate = useNavigate()
const handleClick =()=> {
navigate(`${id}`)

}
  return (
    <div className={s.content} onClick={handleClick}>
      <img src={url} className={s.pic} />
      <p className={s.text}> {title} </p>
   
    </div>
  );
}

export default Item_Mobile;
