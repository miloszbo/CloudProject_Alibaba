// app/routes/Oszczednosci.tsx (lub gdzie go masz)

import React from "react";
import {
  getBudget,
  type BudgetData,
  type IncomeCategory,
  type Category,
} from "../../api/expensesApi";
import { SavingsChart } from "../charts/Chart";

export function Oszczednosci() {
  const [data, setData] = React.useState<BudgetData>({
    periods: [],
    expenses: [],
    incomes: [],
  });

  const [selectedPeriodId, setSelectedPeriodId] = React.useState<number | null>(
    null,
  );
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      try {
        const bd = await getBudget();
        setData(bd);
        if (bd.periods.length > 0) {
          setSelectedPeriodId(bd.periods[0].id);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return <div className="p-6 text-black">Ładowanie…</div>;
  }

  const periods = data.periods;
  const currentPeriod =
    periods.find((p) => p.id === selectedPeriodId) ?? null;

  if (!currentPeriod) {
    return (
      <div className="p-6 text-black">
        Brak okresów. Dodaj okres w zakładce wydatki.
      </div>
    );
  }


  const expenses = data.expenses.filter((e) => e.period_id === currentPeriod.id);
  const incomes = data.incomes.filter((i) => i.period_id === currentPeriod.id);

  const totalExpenses = expenses.reduce((s, e) => s + (e.amount || 0), 0);
  const totalIncomes = incomes.reduce((s, i) => s + (i.amount || 0), 0);

  const saldoMiesiaca = totalIncomes - totalExpenses;
  const savingsRate =
    totalIncomes > 0 ? Math.max(0, (saldoMiesiaca / totalIncomes) * 100) : 0;

  const byExpenseCategory: Record<Category, number> = {
    rachunki: 0,
    zakupy: 0,
    hobby: 0,
    inne: 0,
  };
  expenses.forEach((e) => {
    byExpenseCategory[e.category] += e.amount || 0;
  });

  const cheapestCategoryEntry = Object.entries(byExpenseCategory).sort(
    (a, b) => a[1] - b[1],
  )[0];
  const cheapestCategoryLabelMap: Record<Category, string> = {
    rachunki: "Rachunki",
    zakupy: "Zakupy",
    hobby: "Hobby",
    inne: "Inne",
  };
  const cheapestCategoryLabel = cheapestCategoryEntry
    ? cheapestCategoryLabelMap[cheapestCategoryEntry[0] as Category]
    : "—";

  const byIncomeCategory: Record<IncomeCategory, number> = {
    praca: 0,
    social: 0,
    dodatkowy: 0,
    inne: 0,
  };
  incomes.forEach((i) => {
    byIncomeCategory[i.category] += i.amount || 0;
  });


  return (
    <div className="p-6 h-full text-black">
      <div className="bg-[#005f4e] text-white rounded-t-2xl px-6 py-4 flex items-center gap-3">
        <span className="text-3xl">💰</span>
        <h3 className="text-2xl font-semibold">Oszczędności</h3>
      </div>

      <div className="bg-[#e0e0e0] rounded-b-2xl px-6 py-4 flex gap-6 h-[360px]">
        <div className="w-1/2 flex flex-col gap-3 text-sm">
          <div>
            <select
              className="select select-sm rounded-full bg-white text-black mb-2"
              value={selectedPeriodId ?? undefined}
              onChange={(e) => setSelectedPeriodId(Number(e.target.value))}
            >
              {periods.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <p className="font-semibold">Saldo miesiąca</p>
            <p>{saldoMiesiaca.toFixed(2)} zł</p>
          </div>

          <div>
            <p className="font-semibold">Poziom oszczędności</p>
            <p>
              Oszczędzasz{" "}
              {Number.isFinite(savingsRate)
                ? savingsRate.toFixed(1)
                : "0"}
              % swoich przychodów
            </p>
          </div>

          <div>
            <p className="font-semibold">Źródło oszczędności</p>
            <p>
              Najwięcej oszczędzasz na kategorii:{" "}
              <span className="font-semibold">{cheapestCategoryLabel}</span>
            </p>
          </div>

        </div>

        <div className="w-1/2 flex flex-col">
          <div className="bg-[#f2f2f2] rounded-2xl flex-1 flex flex-col p-4">
            <div className="text-sm font-semibold mb-2">
              Poziom oszczędności w skali
            </div>
            <div className="text-[10px] text-slate-600 mb-1 flex justify-between px-6">
              <span>Źródła dochodu</span>
            </div>
            <div className="flex-1">
              <SavingsChart byIncomeCategory={byIncomeCategory} />
            </div>
            <div className="mt-2 text-[11px] text-center text-slate-600">
              Praca • Social • Dodatkowe • Inne
            </div>
          </div>

          <div className="mt-2 h-6 rounded-b-2xl bg-[#747474]" />
        </div>
      </div>
    </div>
  );
}
