import React, { useEffect, useState } from "react";
import axios from "axios";

import Card from "../components/Card/Card";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          "https://64df78a971c3335b2582b10e.mockapi.io/orders/orders"
        );
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
        setIsLoading(false);
      } catch (error) {
        alert("Помилка при запиті замовлення");
        console.log(error);
      }
    })();
  }, []);
  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Мої замовлення</h1>
      </div>
      <div className="d-flex flex-wrap">
        {orders.map((item, index) => (
          <Card key={index} loading={isLoading} {...item} />
        ))}
      </div>
    </div>
  );
}
export default Orders;
