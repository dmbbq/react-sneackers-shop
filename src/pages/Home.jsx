import React, { useContext } from "react";

import AppContext from "../context";
import Card from "../components/Card/Card";

function Home({
  cartItems,
  items,
  searchValue,
  setSearchValue,
  onChangeSearhInput,
  onAddToFavorite,
  onAddToCart,
  isLoading,
}) {
  const { isItemAdded } = useContext(AppContext);

  const renderItems = () => {
    const filteredItems = items.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    return (isLoading ? [...Array(10)] : filteredItems).map((item, index) => (
      <Card
        key={index}
        onClickAdd={(obj) => onAddToCart(obj)}
        onClickFav={(obj) => onAddToFavorite(obj)}
        added={isItemAdded(item && item.id)}
        cartItems={cartItems}
        loading={isLoading}
        {...item}
      />
    ));
  };
  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1 className="">
          {searchValue ? `Поиск по запросу: "${searchValue}"` : "Всі кросівки"}
        </h1>
        <div className="search-block d-flex">
          <img src="img/search.svg" alt="Search" />
          {searchValue && (
            <img
              onClick={() => setSearchValue("")}
              className="clear cu-p"
              src="img/btn-remove.svg"
              alt="clear"
            />
          )}
          <input
            onChange={onChangeSearhInput}
            value={searchValue}
            placeholder="Поиск..."
          />
        </div>
      </div>
      <div className="d-flex flex-wrap">{renderItems()}</div>
    </div>
  );
}
export default Home;
