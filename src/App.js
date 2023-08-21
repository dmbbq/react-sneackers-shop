import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

import Drawer from "./components/Drawer/Drawer";
import Header from "./components/Header";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import AppContext from "./context";
import Orders from "./pages/Orders";

function App() {
  const apiItems = "https://64ca4fe7700d50e3c704b309.mockapi.io/items";
  const apiFav = "https://64d33b7067b2662bf3dbe03d.mockapi.io/favorites";
  const apiCart = "https://64ce18750c01d81da3ee83ad.mockapi.io/cart";

  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [cartOpened, setCartOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [cartResponse, favoritesResponse, itemsResponse] =
          await Promise.all([
            axios.get(apiCart),
            axios.get(apiFav),
            axios.get(apiItems),
          ]);

        setIsLoading(false);
        setCartItems(cartResponse.data);
        setFavorites(favoritesResponse.data);
        setItems(itemsResponse.data);
      } catch (error) {
        console.error("Помилка при завантаженні даних:", error);
      }
    }

    fetchData();
  }, []);

  const onAddToCart = async (obj) => {
    try {
      if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
        setCartItems((prev) =>
          prev.filter((item) => Number(item.id) !== Number(obj.id))
        );

        await axios.delete(`${apiCart}/${obj.id}`);
      } else {
        setCartItems((prev) => [...prev, obj]);
        await axios.post(apiCart, obj);
      }
    } catch (error) {
      alert("Помилка при додаванні в корзину");
      console.error(error);
    }
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => favObj.id === obj.id)) {
        await axios.delete(`${apiFav}/${obj.id}`);
        // setFavorites((prev) => prev.filter((item) => item.id !== obj.id));
      } else {
        const { data } = await axios.post(apiFav, obj);
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("Не вдалось добавити в обрані");
    }
  };

  const onRemoveItem = (id) => {
    try {
      axios.delete(`${apiCart}/${id}`);
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      alert("Не вдалось видалити з корзини");
    }
  };

  const onChangeSearhInput = (event) => {
    setSearchValue(event.target.value);
  };
  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.id) === Number(id));
  };
  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        isItemAdded,
        setCartOpened,
        setCartItems,
        onAddToCart,
      }}
    >
      <div className="wrapper clear">
        <Drawer
          items={cartItems}
          onClose={() => setCartOpened(false)}
          onRemove={onRemoveItem}
          opened={cartOpened}
        />
        <Header onClickCart={() => setCartOpened(true)} />

        <Routes>
          <Route
            path="/"
            element={
              <Home
                cartItems={cartItems}
                items={items}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearhInput={onChangeSearhInput}
                onAddToFavorite={onAddToFavorite}
                onAddToCart={onAddToCart}
                isLoading={isLoading}
              />
            }
          />
          <Route
            path="/favorites"
            element={
              <Favorites items={favorites} onAddToFavorite={onAddToFavorite} />
            }
          />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
