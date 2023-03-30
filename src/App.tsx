import React, { useState } from "react";
import AddCart from "./components/AddCart";
import Carts from "./components/Carts";
import Chart from "./components/Chart";
import Sidebar from "./components/Sidebar";
import { Cart } from "./types";

function App() {
  const [selectedCart, setSelectedCart] = useState<Cart | null>(null);

  return (
    <div className="app">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="main">
        <div className="chart-and-add-cart">
          <Chart selectedCart={selectedCart} />
          <AddCart />
        </div>
        <div className="carts">
          <Carts
            selectedCart={selectedCart}
            setSelectedCart={setSelectedCart}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
