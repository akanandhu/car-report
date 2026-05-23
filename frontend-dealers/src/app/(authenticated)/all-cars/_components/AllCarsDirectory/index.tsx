"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useDeferredValue, useEffect, useState } from "react";

import { fetchVehicles } from "@/src/networks/vehicles";

const PAGE_SIZE = 10;

const STATUS_OPTIONS = [
  { label: "All Statuses", value: "" },
  { label: "Draft", value: "draft" },
  { label: "Completed", value: "completed" },
  { label: "In Sale", value: "in_sale" },
  { label: "Sold", value: "sold" },
  { label: "Pending", value: "pending" },
  { label: "Rejected", value: "rejected" },
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

const formatStatusLabel = (status: string) =>
  status
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");

const getStatusClasses = (status: string) => {
  const normalized = status.toLowerCase();

  if (normalized === "completed") {
    return "bg-[#d6f6e4] text-[#00a76f]";
  }

  if (normalized === "in_sale") {
    return "bg-[#dce8ff] text-[#2254f4]";
  }

  if (normalized === "pending") {
    return "bg-[#fff1d6] text-[#c07a00]";
  }

  if (normalized === "rejected") {
    return "bg-[#ffe0e0] text-[#cc3d3d]";
  }

  if (normalized === "sold") {
    return "bg-[#e2e8f0] text-[#475569]";
  }

  return "bg-[#eef2f7] text-[#364a63]";
};

const formatVehicleName = (name: string, model: string) => {
  if (!model) {
    return name;
  }

  return `${name}`.trim();
};

const formatDate = (value: string) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

const AllCarsDirectory = () => {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const deferredSearchInput = useDeferredValue(searchInput);
  const search = deferredSearchInput.trim();

  useEffect(() => {
    setPage(1);
  }, [search, statusFilter]);

  const { data, error, isFetching, isLoading } = useQuery({
    queryKey: ["vehicles", page, PAGE_SIZE, search, statusFilter],
    queryFn: () => fetchVehicles(page, PAGE_SIZE, search, statusFilter),
    placeholderData: keepPreviousData,
  });

  const vehicles = data?.data ?? [];
  const pagination = data?.pagination;
  const totalItems = pagination?.total ?? 0;
  const totalPages = pagination?.totalPages ?? 1;
  const hasVehicles = vehicles.length > 0;
  const hasActiveFilters = Boolean(search || statusFilter);
  const from = totalItems === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const to = totalItems === 0 ? 0 : Math.min(page * PAGE_SIZE, totalItems);
  return (
    <>
      <section >
        <div className="w-full px-4 pt-7 pb-5 sm:px-8">
          <h1 className="text-[22px] font-bold tracking-[-0.04em] text-[#081a43] sm:text-[24px]">
            All Cars Directory
          </h1>
          <p className="text-[13px] leading-7 text-[#5973a9] sm:text-[14px]">
            Manage and view all previously evaluated vehicles.
          </p>
        </div>
      </section>

      <section className="w-full px-4 py-1 sm:px-8">
        <div className="overflow-hidden rounded-2xl border border-[#dbe4f0] bg-white shadow-[0_8px_24px_rgba(15,23,42,0.03)]">
          <div className="flex flex-col gap-4 border-b border-[#dbe4f0] px-5 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex w-full flex-col gap-4 lg:flex-row justify-between">
              <div className="relative w-full max-w-[560px]">
                <input
                  type="search"
                  value={searchInput}
                  onChange={(event) => setSearchInput(event.target.value)}
                  placeholder="Search by vehicle name or model..."
                  className="h-11 w-full rounded-2xl border border-[#c8d5e6] bg-white pl-12 pr-4 text-[15px] text-[#334155] outline-none transition placeholder:text-[#8aa0c0] focus:border-[#b7c8e0]"
                />
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#94a3b8]">
                  <SearchIcon />
                </span>
              </div>

              <div className="relative w-full max-w-[240px]">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#94a3b8]">
                  <FilterIcon />
                </span>
                <select
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value)}
                  className="h-11 w-full appearance-none rounded-2xl border border-[#c8d5e6] bg-white pl-12 pr-10 text-[15px] font-medium text-[#21355b] outline-none transition focus:border-[#b7c8e0]"
                >
                  {STATUS_OPTIONS.map((option) => (
                    <option key={option.value || "all"} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {/* <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#94a3b8]">
                  <ChevronRight className="h-4 w-4 rotate-90" />
                </span> */}
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-[980px] w-full border-collapse">
              <thead>
                <tr className="border-b border-[#dbe4f0] bg-[#fbfcfe] text-left">
                  <th className="w-32 px-8 py-5 text-[13px] font-bold uppercase tracking-[0.02em] text-[#56739c]">
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
                {isLoading ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-8 py-16 text-center text-[15px] text-[#5973a9]"
                    >
                      Loading vehicles...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-8 py-16 text-center text-[15px] text-[#c2410c]"
                    >
                      Unable to load vehicles right now.
                    </td>
                  </tr>
                ) : !hasVehicles ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-8 py-16 text-center text-[15px] text-[#5973a9]"
                    >
                      {hasActiveFilters
                        ? "No vehicles matched your search or status filter."
                        : "No vehicles found yet."}
                    </td>
                  </tr>
                ) : (
                  vehicles.map((vehicle) => (
                    <tr
                      key={vehicle.id}
                      className="border-b border-[#dbe4f0] last:border-b-0"
                    >
                      <td className="px-8 py-5 text-[15px] font-semibold text-[#081a43]">
                        {vehicle.id}
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <div className="flex h-[52px] w-[52px] items-center justify-center rounded-2xl bg-[#f0f4fa] text-[#64748b]">
                            <CarIcon />
                          </div>
                          <div>
                            <p className="text-[16px] font-semibold text-[#081a43]">
                              {formatVehicleName(vehicle.name, vehicle.model)}
                            </p>
                            <p className="mt-1 text-[13px] text-[#5973a9]">
                              {vehicle.vehicleNumber}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-[15px] text-[#334155]">
                        {formatDate(vehicle.updatedAt || vehicle.createdAt)}
                      </td>
                      <td className="px-8 py-5 text-[15px] text-[#334155]">
                        {vehicle.lastModifiedBy || vehicle.createdBy || "-"}
                      </td>
                      <td className="px-8 py-5">
                        <span
                          className={`inline-flex rounded-full px-4 py-2 text-[13px] font-semibold ${getStatusClasses(
                            vehicle.status,
                          )}`}
                        >
                          {formatStatusLabel(vehicle.status)}
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
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-4 border-t border-[#dbe4f0] px-5 py-5 text-[14px] text-[#5973a9] sm:px-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              Showing {from}-{to} of {totalItems} vehicles
              {isFetching && !isLoading ? " Updating..." : ""}
            </div>

            <div className="flex items-center gap-3 self-end lg:self-auto">
              <button
                type="button"
                onClick={() => setPage((currentPage) => Math.max(1, currentPage - 1))}
                disabled={page === 1 || isLoading}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-2xl border border-[#c8d5e6] bg-white px-4 font-semibold text-[#21355b] transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </button>

              <div className="rounded-2xl border border-[#dbe4f0] bg-[#fbfcfe] px-4 py-2 font-semibold text-[#081a43]">
                Page {page} of {totalPages}
              </div>

              <button
                type="button"
                onClick={() => setPage((currentPage) => currentPage + 1)}
                disabled={!pagination?.hasNextPage || isLoading}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-2xl border border-[#c8d5e6] bg-white px-4 font-semibold text-[#21355b] transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AllCarsDirectory;
