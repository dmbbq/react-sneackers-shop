import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Drawer from "./components/Drawer";
import Header from "./components/Header";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";

function App() {
  const api = "https://64ca4fe7700d50e3c704b309.mockapi.io/items";

  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [cartOpened, setCartOpened] = useState(false);

  useEffect(() => {
    axios.get(api).then((res) => {
      setItems(res.data);
    });

    axios
      .get("https://64ce18750c01d81da3ee83ad.mockapi.io/cart")
      .then((res) => {
        setCartItems(res.data);
      });
    axios
      .get("https://64d33b7067b2662bf3dbe03d.mockapi.io/favorites")
      .then((res) => {
        setFavorites(res.data);
      });
  }, []);



  const onAddToCart = async (obj) => {
    if (cartItems.find((item) => item.id === obj.id)) {
      await axios.delete(
        `https://64ce18750c01d81da3ee83ad.mockapi.io/cart/${obj.id}`
      );
      setCartItems((prev) => prev.filter((item) => item.id !== obj.id));
    } else {
      const { data } = await axios.post("https://64ce18750c01d81da3ee83ad.mockapi.io/cart", obj);
      setCartItems((prev) => [...prev, data]);
    }
  };
   

  const onAddToFavorite = async (obj) => {
   try {
    if (favorites.find(favObj => favObj.id === obj.id)) {
      await axios.delete(`https://64d33b7067b2662bf3dbe03d.mockapi.io/favorites/${obj.id}`);
      // setFavorites((prev) => prev.filter((item) => item.id !== obj.id));

    } else {
      const { data } = await axios.post("https://64d33b7067b2662bf3dbe03d.mockapi.io/favorites", obj);
      setFavorites((prev) => [...prev, data]);
    }
    
   } catch (error) {
    alert('Не вдалось добавити в обрані')
   }
  };

  const onRemoveItem = (id) => {
    axios.delete(`https://64ce18750c01d81da3ee83ad.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const onChangeSearhInput = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="wrapper clear">
      {cartOpened && (
        <Drawer
          items={cartItems}
          onClose={() => setCartOpened(false)}
          onRemove={onRemoveItem}
        />
      )}
      <Header onClickCart={() => setCartOpened(true)} />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              items={items}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSearhInput={onChangeSearhInput}
              onAddToFavorite={onAddToFavorite}
              onAddToCart={onAddToCart}
            />
          }
        />
        <Route
          path="/favorites"
          element={
            <Favorites items={favorites} onAddToFavorite={onAddToFavorite} />
          }
        />
      </Routes>
    </div>
  );
}

export default App;




// const onAddToCart = async (obj) => {
//   try {
//     const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id));
//     if (findItem) {
//       setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)));
//       await axios.delete(`https://60d62397943aa60017768e77.mockapi.io/cart/${findItem.id}`);
//     } else {
//       setCartItems((prev) => [...prev, obj]);
//       const { data } = await axios.post('https://60d62397943aa60017768e77.mockapi.io/cart', obj);
//       setCartItems((prev) =>
//         prev.map((item) => {
//           if (item.parentId === data.parentId) {
//             return {
//               ...item,
//               id: data.id,
//             };
//           }
//           return item;
//         }),
//       );
//     }
//   } catch (error) {
//     alert('Ошибка при добавлении в корзину');
//     console.error(error);
//   }
// };