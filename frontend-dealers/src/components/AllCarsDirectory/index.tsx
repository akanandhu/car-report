import AppSidebar from "@/src/components/AppSidebar";
import Navbar from "@/src/components/Navbar";

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

const SearchIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5"
    aria-hidden="true"
  >
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);

const FilterIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5"
    aria-hidden="true"
  >
    <path d="M4 5h16l-6 7v6l-4-2v-4Z" />
  </svg>
);

const CarIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5"
    aria-hidden="true"
  >
    <path d="M5 16.5h14" />
    <path d="M7 16.5v1.5" />
    <path d="M17 16.5v1.5" />
    <path d="M3 13.5v-2.3a2 2 0 0 1 1.23-1.85l1.47-.62L7.4 6.3A2 2 0 0 1 9.25 5h5.5a2 2 0 0 1 1.85 1.3l1.7 2.43 1.47.62A2 2 0 0 1 21 11.2v2.3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
    <circle cx="7.5" cy="14.5" r="1" fill="currentColor" stroke="none" />
    <circle cx="16.5" cy="14.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const ReportIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5"
    aria-hidden="true"
  >
    <path d="M14 3H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7Z" />
    <path d="M14 3v4h4" />
    <path d="M9 13h6" />
    <path d="M9 17h6" />
    <path d="M9 9h1" />
  </svg>
);

const getStatusClasses = (status: CarStatus) => {
  if (status === "Completed") {
    return "bg-[#d6f6e4] text-[#00a76f]";
  }

  if (status === "In Progress") {
    return "bg-[#dce8ff] text-[#2254f4]";
  }

  return "bg-[#eef2f7] text-[#364a63]";
};

const AllCarsDirectory = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <AppSidebar />
      <div className="flex min-h-screen flex-1 flex-col md:pl-[280px]">
        <Navbar />

        <main className="flex-1">
          <section className="border-b border-slate-200 bg-white">
            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-8">
              <h1 className="text-[22px] font-bold tracking-[-0.04em] text-[#081a43] sm:text-[24px]">
                All Cars Directory
              </h1>
              <p className="text-[13px] leading-7 text-[#5973a9] sm:text-[14px]">
                Manage and view all previously evaluated vehicles.
              </p>
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-4 py-10 sm:px-8">
            <div className="overflow-hidden rounded-[24px] border border-[#dbe4f0] bg-white shadow-[0_8px_24px_rgba(15,23,42,0.03)]">
              <div className="flex flex-col gap-4 border-b border-[#dbe4f0] px-5 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="relative w-full max-w-[560px]">
                  <input
                    type="search"
                    placeholder="Search by ID, Make, or Model..."
                    className="h-11 w-full rounded-2xl border border-[#c8d5e6] bg-white pl-12 pr-4 text-[15px] text-[#334155] outline-none transition placeholder:text-[#8aa0c0] focus:border-[#b7c8e0]"
                  />
                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#94a3b8]">
                    <SearchIcon />
                  </span>
                </div>

                <button
                  type="button"
                  className="inline-flex h-11 items-center justify-center gap-3 rounded-2xl border border-[#c8d5e6] bg-white px-5 text-[15px] font-semibold text-[#21355b] transition hover:bg-slate-50"
                >
                  <FilterIcon />
                  Filter Results
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-[980px] w-full border-collapse">
                  <thead>
                    <tr className="border-b border-[#dbe4f0] bg-[#fbfcfe] text-left">
                      <th className="px-8 py-5 text-[13px] font-bold uppercase tracking-[0.02em] text-[#56739c]">
                        Eval ID
                      </th>
                      <th className="px-8 py-5 text-[13px] font-bold uppercase tracking-[0.02em] text-[#56739c]">
                        Vehicle
                      </th>
                      <th className="px-8 py-5 text-[13px] font-bold uppercase tracking-[0.02em] text-[#56739c]">
                        Date
                      </th>
                      <th className="px-8 py-5 text-[13px] font-bold uppercase tracking-[0.02em] text-[#56739c]">
                        Evaluator
                      </th>
                      <th className="px-8 py-5 text-[13px] font-bold uppercase tracking-[0.02em] text-[#56739c]">
                        Status
                      </th>
                      <th className="px-8 py-5 text-right text-[13px] font-bold uppercase tracking-[0.02em] text-[#56739c]">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {carRows.map((row) => (
                      <tr
                        key={row.id}
                        className="border-b border-[#dbe4f0] last:border-b-0"
                      >
                        <td className="px-8 py-5 text-[15px] font-semibold text-[#081a43]">
                          {row.id}
                        </td>
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-4">
                            <div className="flex h-[52px] w-[52px] items-center justify-center rounded-2xl bg-[#f0f4fa] text-[#64748b]">
                              <CarIcon />
                            </div>
                            <div>
                              <p className="text-[16px] font-semibold text-[#081a43]">
                                {row.vehicle}
                              </p>
                              <p className="mt-1 text-[13px] text-[#5973a9]">
                                {row.type}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-5 text-[15px] text-[#334155]">
                          {row.date}
                        </td>
                        <td className="px-8 py-5 text-[15px] text-[#334155]">
                          {row.evaluator}
                        </td>
                        <td className="px-8 py-5">
                          <span
                            className={`inline-flex rounded-full px-4 py-2 text-[13px] font-semibold ${getStatusClasses(
                              row.status,
                            )}`}
                          >
                            {row.status}
                          </span>
                        </td>
                        <td className="px-8 py-5 text-right">
                          <button
                            type="button"
                            className="inline-flex items-center gap-2 text-[16px] font-semibold text-[#081a43] transition hover:text-[#21355b]"
                          >
                            <ReportIcon />
                            View Report
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default AllCarsDirectory;
