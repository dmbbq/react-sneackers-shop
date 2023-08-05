import { useState } from 'react';
import s from './Card.module.scss'




function Card({title,imageUrl,price,onClickFav,onClickAdd}) {

  const[isAdded,setIsAdded] = useState(false);
  const[isFavorite,setIsFavorite] = useState(false);


  const onClickPlus = () => {
    onClickAdd({title,imageUrl,price})
    setIsAdded(!isAdded)
  }
  const onClickFavorite = () => {
    setIsFavorite(!isFavorite)
  }


  return (
    <div className={s.card}>
      <div className={s.favorite} onClick={onClickFavorite} >
        <img alt='unliked' src={isFavorite ? "/img/liked.svg" : "/img/unliked.svg"}   />
      </div>
      <img width={133} height={112} src={imageUrl} alt='unliked'  />
      <h5>
        {title}
        <div className="d-flex justify-between align-center">
          <div className="d-flex flex-column">
            <p>Цена:</p>
            <b>{price} руб</b>
          </div>
          <img className={s.plus} onClick={onClickPlus}  src={isAdded ? "/img/btn-checked.svg" : "/img/btn-plus.svg"} alt="plus" />
          
           
      
        </div>
      </h5>
    </div>
  );
}
export default Card;
