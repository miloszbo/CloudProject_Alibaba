import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import type { IncomeCategory } from "../../api/expensesApi";

type Props = {
  byIncomeCategory: Record<IncomeCategory, number>;
};

export function SavingsChart({ byIncomeCategory }: Props) {
  const data = [
    { name: "Praca", value: byIncomeCategory.praca },
    { name: "Social", value: byIncomeCategory.social },
    { name: "Dodatkowe", value: byIncomeCategory.dodatkowy },
    { name: "Inne", value: byIncomeCategory.inne },
  ];

  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
