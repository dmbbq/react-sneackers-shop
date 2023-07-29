function App() {
  return (
    <div className="wrapper clear">
      <div className="overlay">
        <div className="drawer">
          <h2 className="mb-20">Корзина</h2>

          <div className="cardItem d-flex align-center mb-20">
            <img
              className="mr-20"
              width={70}
              height={70}
              src="/img/sneakers/1.jpg"
              alt="Sneakers"
            />
            <div className="mr-20">
              <p className="mb-5">Мужские Кроссовки Nike Blazer Mid Suede</p>
              <b>12999 руб</b>
            </div>
            <img className="removeBtn" src="/img/btn-remove.svg" alt="remove" />
          </div>
          <div className="cardItem d-flex align-center mb-20">
            <img
              className="mr-20"
              width={70}
              height={70}
              src="/img/sneakers/2.jpg"
              alt="Sneakers"
            />
            <div className="mr-20">
              <p className="mb-5">Мужские Кроссовки Nike Blazer Mid Suede</p>
              <b>12999 руб</b>
            </div>
            <img className="removeBtn" src="/img/btn-remove.svg" alt="remove" />
          </div>
        </div>
      </div>

      <header className="d-flex justify-between align-center p-40">
        <div className="d-flex align-center">
          <img width={40} height={40} src="img/logo.png" alt="Logotype" />
          <div>
            <h3 className="text-uppercase">React Sneakers</h3>
            <p className="opacity-5">Магазин лучших кроссовок</p>
          </div>
        </div>
        <ul className="d-flex">
          <li className="mr-30 cu-p">
            <img width={18} height={18} src="img/cart.svg" alt="Корзина" />
            <span>1205 руб.</span>
          </li>
          <li className="mr-20 cu-p">
            <img width={18} height={18} src="img/heart.svg" alt="Закладки" />
          </li>
          <li>
            <img width={18} height={18} src="img/user.svg" alt="Пользователь" />
          </li>
        </ul>
      </header>
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1 className="">Все кроссовки</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            <input placeholder="Поиск..." />
          </div>
        </div>
        <div className="d-flex">
          <div className="card">
            <div className="favorite">
              <img src="/img/unliked.svg" />
            </div>
            <img width={133} height={112} src="/img/sneakers/1.jpg" />
            <h5>
              Мужские Кроссовки Nike Blazer Mid Suede
              <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column">
                  <p>Цена:</p>
                  <b>12 999 руб</b>
                </div>
                <button className="button">
                  <img width={11} height={11} src="/img/plus.svg" alt="plus" />
                </button>
              </div>
            </h5>
          </div>
          <div className="card">
            <img width={133} height={112} src="/img/sneakers/2.jpg" />
            <h5>
              Мужские Кроссовки Nike Blazer Mid Suede
              <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column">
                  <p>Цена:</p>
                  <b>12 999 руб</b>
                </div>
                <button className="button">
                  <img width={11} height={11} src="/img/plus.svg" alt="plus" />
                </button>
              </div>
            </h5>
          </div>
          <div className="card">
            <img width={133} height={112} src="/img/sneakers/3.jpg" />
            <h5>
              Мужские Кроссовки Nike Blazer Mid Suede
              <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column">
                  <p>Цена:</p>
                  <b>12 999 руб</b>
                </div>
                <button className="button">
                  <img width={11} height={11} src="/img/plus.svg" alt="plus" />
                </button>
              </div>
            </h5>
          </div>
          <div className="card">
            <img width={133} height={112} src="/img/sneakers/4.jpg" />
            <h5>
              Мужские Кроссовки Nike Blazer Mid Suede
              <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column">
                  <p>Цена:</p>
                  <b>12 999 руб</b>
                </div>
                <button className="button">
                  <img width={11} height={11} src="/img/plus.svg" alt="plus" />
                </button>
              </div>
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
