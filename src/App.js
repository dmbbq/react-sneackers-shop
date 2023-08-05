import { useState, useEffect } from "react";
import axios from 'axios'
import Card from "./components/Card/Card";
import Drawer from "./components/Drawer";
import Header from "./components/Header";

function App() {
  const api = "https://64ca4fe7700d50e3c704b309.mockapi.io/items";

  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [cartOpened, setCartOpened] = useState(false);

  useEffect(() => {
    axios.get(api).then((res) => {
      setItems(res.data);
    });
  
    axios.get('https://64ce18750c01d81da3ee83ad.mockapi.io/cart').then((res) => {
      setCartItems(res.data);
    });
  }, []);

  

  const onAddToCart = (obj) => {
    axios.post('https://64ce18750c01d81da3ee83ad.mockapi.io/cart',obj)
    setCartItems((prev) => [...prev, obj]);
  };


  const onRemoveItem = (id) => {
    axios.delete(`https://64ce18750c01d81da3ee83ad.mockapi.io/cart/${id}`)
    setCartItems((prev) => prev.filter(item => item.id !== id));
  }

  const onChangeSearhInput = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="wrapper clear">
      {cartOpened && (
        <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} />
      )}
      <Header onClickCart={() => setCartOpened(true)} />
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1 className="">
            {searchValue
              ? `Поиск по запросу: "${searchValue}"`
              : "Все кроссовки"}
          </h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            {searchValue &&
            <img onClick={() => setSearchValue('') }
              className="clear cu-p"
              src="/img/btn-remove.svg"
              alt="clear"
            />}
            <input
              onChange={onChangeSearhInput}
              value={searchValue}
              placeholder="Поиск..."
            />
          </div>
        </div>
        <div className="d-flex flex-wrap">
          {items
          .filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()) )
          .map((item, index) => (
            <Card
              key={index}
              title={item.title}
              price={item.price}
              imageUrl={item.imageUrl}
              onClickAdd={onAddToCart}
              onClickFav={() => console.log("Нажали на сердечко")}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
