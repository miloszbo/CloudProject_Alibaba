import React from "react";
import { getBudget, type BudgetData, type Period } from "../../api/expensesApi";

export function Obrazy() {
  const [budget, setBudget] = React.useState<BudgetData>({
    periods: [],
    expenses: [],
    incomes: [],
  });

  const [loading, setLoading] = React.useState(true);
  const [selectedPeriodId, setSelectedPeriodId] = React.useState<number | null>(null);

  const [photosByPeriod, setPhotosByPeriod] = React.useState<Record<number, number[]>>({});

  React.useEffect(() => {
    (async () => {
      try {
        const data = await getBudget();
        setBudget(data);
        if (data.periods.length > 0) {
          setSelectedPeriodId(data.periods[0].id);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleAddPhoto = () => {
    if (!selectedPeriodId) return;
    setPhotosByPeriod((prev) => {
      const current = prev[selectedPeriodId] ?? [];
      return {
        ...prev,
        [selectedPeriodId]: [...current, current.length + 1],
      };
    });
  };

  if (loading) {
    return <div className="p-6 text-black">Ładowanie…</div>;
  }

  const periods = budget.periods;
  const hasPeriods = periods.length > 0;

  const currentPhotos =
    selectedPeriodId && photosByPeriod[selectedPeriodId]
      ? photosByPeriod[selectedPeriodId]
      : [];

  return (
    <div className="p-6 h-full text-black">
      <div className="flex justify-between items-start mb-4">
        <div>
          <select
            disabled={!hasPeriods}
            value={selectedPeriodId ?? ""}
            onChange={(e) => setSelectedPeriodId(Number(e.target.value))}
            className="select select-sm rounded-xl border border-[#1A6558] text-black bg-white px-3 py-2 min-w-[260px]"
          >
            {!hasPeriods && <option>Brak okresów</option>}
            {periods.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleAddPhoto}
          disabled={!selectedPeriodId}
          className="btn btn-sm rounded-xl bg-[#1A6558] text-white px-4 py-2 hover:bg-[#268d7c] disabled:opacity-50"
        >
          Dodaj zdjęcie
        </button>
      </div>

      <div className="bg-[#e0e0e0] rounded-2xl px-6 py-4 h-[360px]">
        {!hasPeriods && (
          <p className="text-sm text-gray-700">
            Brak okresów. Dodaj okres w panelu Wydatki / Przychody.
          </p>
        )}

        {hasPeriods && (
          <div className="grid grid-cols-5 gap-3 mt-2">
            {currentPhotos.length === 0 && (
              <p className="col-span-5 text-center text-gray-600 text-sm">
                Brak zdjęć w tym okresie — kliknij „Dodaj zdjęcie.”
              </p>
            )}

            {currentPhotos.map((id) => (
              <div
                key={id}
                className="w-full h-[100px] bg-gray-300 rounded-lg border border-gray-400"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
