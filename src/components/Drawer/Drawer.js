import { useState, useRef } from "react";
import axios from "axios";

import Info from "../Info";
import { useCart } from "../../hooks/useCart";

import s from "./Drawer.module.scss";

const delay = (ms) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

function Drawer({ onClose, onRemove, items = [], opened }) {
  const { cartItems, setCartItems, totalPrice } = useCart();

  const [isOrderComplite, setIsOrderComplite] = useState(false);
  const [odrerId, setOdrerId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        "https://64df78a971c3335b2582b10e.mockapi.io/orders/orders",
        { items: cartItems }
      );

      setOdrerId(data.id);
      setIsOrderComplite(true);
      setCartItems([]);

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete(
          `https://64ce18750c01d81da3ee83ad.mockapi.io/cart/${item.id}`
        );

        await delay(1000);
      }
    } catch (error) {
      alert("Помилка при створенні замовлення :(");
    }
    setIsLoading(false);
  };

  const overlayRef = useRef(null);
  const handleClickOverlay = (event) => {
    if (overlayRef.current === event.target) {
      onClose();
    }
  };

  return (
    <div
      ref={overlayRef}
      className={`${s.overlay} ${opened ? s.overlayVisible : ""}`}
      onClick={handleClickOverlay}
    >
      <div className={s.drawer}>
        <h2 className="d-flex justify-between mb-20 ">
          Корзина
          <img
            onClick={onClose}
            className="removeBtn cu-p"
            src="img/btn-remove.svg"
            alt="close"
          />
        </h2>

        {items.length > 0 ? (
          <div className="d-flex flex-column flex">
            <div className="items">
              {items.map((obj) => (
                <div
                  key={obj.id}
                  className="cardItem d-flex align-center mb-20"
                >
                  <img
                    className="mr-20"
                    width={70}
                    height={70}
                    src={obj.imageUrl}
                    alt="Sneakers"
                  />
                  <div className="mr-20">
                    <p className="mb-5">{obj.title}</p> <b>{obj.price} грн</b>{" "}
                  </div>
                  <img
                    onClick={() => onRemove(obj.id)}
                    className="removeBtn"
                    src="img/btn-remove.svg"
                    alt="remove"
                  />
                </div>
              ))}
            </div>
            <div className="cardTotalBlock">
              <ul>
                <li className="d-flex">
                  <span>Загалом:</span>
                  <div></div>
                  <b>{totalPrice} грн. </b>
                </li>
                <li className="d-flex">
                  <span>Податок 5%</span>
                  <div></div>
                  <b>{((totalPrice / 100) * 5).toFixed(2)} грн. </b>
                </li>
              </ul>
              <button
                disabled={isLoading}
                onClick={onClickOrder}
                className="greenBtn"
              >
                Оформити замовлення
                <img src="img/arrow.svg" alt="Arrow" />
              </button>
            </div>{" "}
          </div>
        ) : (
          <Info
            title={isOrderComplite ? "Замовлення оформлено" : "Корзина порожня"}
            description={
              isOrderComplite
                ? `Ваше замовлення ${odrerId}# буде передане кур'єру`
                : "Добавте хоча б одну пару кросівок,щоб зробити замолення."
            }
            image={
              isOrderComplite
                ? "img/complete-order.jpg"
                : "img/empty-cart.jpg"
            }
          />
        )}
      </div>
    </div>
  );
}
export default Drawer;
