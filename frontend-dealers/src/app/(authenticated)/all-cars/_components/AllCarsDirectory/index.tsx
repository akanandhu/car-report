import { Car, FileText, Funnel, Search } from "lucide-react";

type CarStatus = "Completed" | "Draft" | "In Progress";

type CarRow = {
  id: string;
  vehicle: string;
  type: string;
  date: string;
  evaluator: string;
  status: CarStatus;
};

const carRows: CarRow[] = [
  {
    id: "EV-1029",
    vehicle: "2021 Toyota Camry",
    type: "Standard Eval",
    date: "Oct 24, 2023",
    evaluator: "John Doe",
    status: "Completed",
  },
  {
    id: "EV-1030",
    vehicle: "2019 Honda Civic",
    type: "Standard Eval",
    date: "Oct 25, 2023",
    evaluator: "Jane Smith",
    status: "Draft",
  },
  {
    id: "EV-1031",
    vehicle: "2022 Ford Mustang",
    type: "Standard Eval",
    date: "Oct 25, 2023",
    evaluator: "Mike Johnson",
    status: "Completed",
  },
  {
    id: "EV-1032",
    vehicle: "2023 Tesla Model 3",
    type: "Standard Eval",
    date: "Oct 26, 2023",
    evaluator: "Sarah Wilson",
    status: "In Progress",
  },
  {
    id: "EV-1033",
    vehicle: "2020 BMW 3 Series",
    type: "Standard Eval",
    date: "Oct 26, 2023",
    evaluator: "John Doe",
    status: "Completed",
  },
];

const getStatusClasses = (status: CarStatus) => {
  if (status === "Completed") {
    return "bg-emerald-100 text-emerald-700";
  }

  if (status === "In Progress") {
    return "bg-blue-100 text-blue-700";
  }

  return "bg-slate-100 text-slate-700";
};

const AllCarsDirectory = () => {
  return (
    <div className="mx-auto max-w-7xl space-y-6 p-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            All Cars Directory
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage and view all previously evaluated vehicles.
          </p>
        </div>
      </div>

      <div className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col justify-between gap-4 border-b border-slate-200 bg-slate-50/50 p-4 sm:flex-row">
          <div className="relative w-full max-w-md">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              aria-hidden="true"
            />
            <input
              type="text"
              placeholder="Search by ID, Make, or Model..."
              className="w-full rounded-md border border-slate-300 bg-white py-2 pl-10 pr-4 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
          >
            <Funnel size={16} aria-hidden="true" />
            Filter Results
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500">
                <th className="px-6 py-4">Eval ID</th>
                <th className="px-6 py-4">Vehicle</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Evaluator</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200">
              {carRows.map((row) => (
                <tr
                  key={row.id}
                  className="transition-colors hover:bg-slate-50/50"
                >
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-900">
                    {row.id}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-slate-100 text-slate-500">
                        <Car size={20} aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">
                          {row.vehicle}
                        </p>
                        <p className="text-xs text-slate-500">{row.type}</p>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                    {row.date}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                    {row.evaluator}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${getStatusClasses(
                        row.status,
                      )}`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                    <button
                      type="button"
                      className="ml-auto flex items-center justify-end gap-1 text-primary hover:text-primary/80"
                    >
                      <FileText size={16} aria-hidden="true" />
                      View Report
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
            </div>
      </div>
    </div>
  );
};

export default AllCarsDirectory;
