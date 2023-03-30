import React, { useMemo } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Cart } from "../types";

interface Props {
  selectedCart: Cart | null;
}

const Charts: React.FC<Props> = ({ selectedCart }) => {
  const allProducts = useMemo(
    () => selectedCart?.products || [],
    [selectedCart]
  );

  const itemsMap = useMemo(
    () => [
      ...new Map(allProducts.map((item) => [item["title"], item])).values(),
    ],
    [allProducts]
  );

  const itemsWithDiscount = useMemo(
    () =>
      itemsMap.map((v) => ({
        ...v,
        discountedItemPrice:
          v.price -
          parseFloat(((v.price * v.discountPercentage) / 100).toFixed(2)),
      })),
    [itemsMap]
  );

  return (
    <div className="chart-container">
      <h2>Chart of a chosen cart</h2>
      <div className="chart">
        <LineChart width={600} height={300} data={itemsWithDiscount}>
          <Line
            type="monotone"
            dataKey="price"
            stroke="#FFCA29"
            strokeWidth={3}
          />
          <Line
            type="monotone"
            dataKey="discountedItemPrice"
            stroke="#F44236"
            strokeWidth={3}
          />

          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="title" />
          <YAxis />
          <Tooltip />
          <Legend />
        </LineChart>
      </div>
    </div>
  );
};

export default Charts;
