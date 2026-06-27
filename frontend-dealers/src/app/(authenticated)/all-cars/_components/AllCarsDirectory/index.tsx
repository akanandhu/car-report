"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Car,
  ChevronLeft,
  ChevronRight,
  FileText,
  FilePen,
  Funnel,
  Search,
} from "lucide-react";
import Link from "next/link";
import { downloadVehicleReport } from "@/src/networks/reports";
import { fetchVehicles } from "@/src/networks/vehicles";
import type { VehicleResponse } from "@/src/networks/vehicles/types";
import type { CarRowI, CarStatusI } from "./types";

const PAGE_LIMIT = 10;
const DEBOUNCE_DELAY_MS = 300;
const TABLE_COLUMN_COUNT = 6;

const getStatusClasses = (status: CarStatusI) => {
  const normalizedStatus = status.toLowerCase();

  if (normalizedStatus === "completed") {
    return "bg-emerald-100 text-emerald-700";
  }

  if (normalizedStatus === "draft") {
    return "bg-amber-100 text-amber-700";
  }

  return "bg-slate-100 text-slate-700";
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatStatus = (status: string) => {
  return status
    .split(/[\s_-]+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const getErrorMessage = (error: unknown) => {
  if (
    error &&
    typeof error === "object" &&
    "message" in error &&
    typeof error.message === "string"
  ) {
    return error.message;
  }

  return "Unable to load vehicles. Please try again.";
};

const mapVehicleToRow = (vehicle: VehicleResponse): CarRowI => ({
  id: vehicle.id,
  evalId: vehicle.vehicleNumber || vehicle.id,
  vehicle: vehicle.name,
  type: vehicle.model,
  date: formatDate(vehicle.createdAt),
  evaluator: vehicle.creator?.name || vehicle.createdBy || "-",
  status: formatStatus(vehicle.status),
});

const AllCarsDirectory = () => {
  const requestSequence = useRef(0);
  const [vehicles, setVehicles] = useState<VehicleResponse[]>([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [retryCount, setRetryCount] = useState(0);
  const [reportLoadingIds, setReportLoadingIds] = useState<Set<string>>(
    () => new Set(),
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: PAGE_LIMIT,
    total: 0,
    totalPages: 1,
    hasPreviousPage: false,
    hasNextPage: false,
  });

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, DEBOUNCE_DELAY_MS);

    return () => window.clearTimeout(timeoutId);
  }, [search]);

  useEffect(() => {
    const currentRequest = requestSequence.current + 1;
    requestSequence.current = currentRequest;

    const loadVehicles = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetchVehicles(
          page,
          PAGE_LIMIT,
          debouncedSearch || undefined,
        );

        if (requestSequence.current !== currentRequest) {
          return;
        }

        setVehicles(response.data);
        setPagination({
          ...response.pagination,
          totalPages: Math.max(response.pagination.totalPages, 1),
        });
      } catch (loadError) {
        if (requestSequence.current !== currentRequest) {
          return;
        }

        setVehicles([]);
        setError(getErrorMessage(loadError));
      } finally {
        if (requestSequence.current === currentRequest) {
          setLoading(false);
        }
      }
    };

    loadVehicles();
  }, [page, debouncedSearch, retryCount]);

  const carRows = useMemo(() => vehicles.map(mapVehicleToRow), [vehicles]);
  const totalPages = pagination.totalPages || 1;

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleRetry = () => {
    setRetryCount((current) => current + 1);
  };

  const goToPreviousPage = () => {
    setPage((current) => Math.max(current - 1, 1));
  };

  const goToNextPage = () => {
    setPage((current) => Math.min(current + 1, totalPages));
  };

  const handleDownloadReport = async (vehicleId: string, name: string) => {
    setReportLoadingIds((current) => new Set(current).add(vehicleId));

    try {
      await downloadVehicleReport(vehicleId, name);
    } catch (reportError) {
      alert(getErrorMessage(reportError));
    } finally {
      setReportLoadingIds((current) => {
        const next = new Set(current);
        next.delete(vehicleId);
        return next;
      });
    }
  };

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
              value={search}
              onChange={(event) => handleSearchChange(event.target.value)}
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
              {loading ? (
                <tr>
                  <td
                    colSpan={TABLE_COLUMN_COUNT}
                    className="px-6 py-10 text-center text-sm text-slate-500"
                  >
                    Loading vehicles...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td
                    colSpan={TABLE_COLUMN_COUNT}
                    className="px-6 py-10 text-center text-sm text-slate-500"
                  >
                    <div className="flex flex-col items-center gap-3">
                      <span>{error}</span>
                      <button
                        type="button"
                        onClick={handleRetry}
                        className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                      >
                        Retry
                      </button>
                    </div>
                  </td>
                </tr>
              ) : carRows.length === 0 ? (
                <tr>
                  <td
                    colSpan={TABLE_COLUMN_COUNT}
                    className="px-6 py-10 text-center text-sm text-slate-500"
                  >
                    No vehicles found.
                  </td>
                </tr>
              ) : (
                carRows.map((row) => (
                  <tr
                    key={row.id}
                    className="transition-colors hover:bg-slate-50/50"
                  >
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-900">
                      {row.evalId}
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
                      {row.status.toLowerCase() === "draft" ? (
                        <Link
                          href={`/car-evaluation?vehicleId=${row.id}`}
                          className="ml-auto flex items-center justify-end gap-1 text-primary hover:text-primary/80"
                        >
                          <FilePen size={16} aria-hidden="true" />
                          Edit Draft
                        </Link>
                      ) : (
                        <button
                          type="button"
                          onClick={() =>
                            handleDownloadReport(
                              row.id,
                              `${row.vehicle} ${row.type}`,
                            )
                          }
                          disabled={reportLoadingIds.has(row.id)}
                          className="ml-auto flex items-center justify-end gap-1 text-primary hover:text-primary/80"
                        >
                          <FileText size={16} aria-hidden="true" />
                          {reportLoadingIds.has(row.id)
                            ? "Generating..."
                            : "View Report"}
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 sm:flex-row">
          <span>
            {pagination.total} {pagination.total === 1 ? "vehicle" : "vehicles"}
          </span>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={goToPreviousPage}
              disabled={loading || !pagination.hasPreviousPage}
              className="inline-flex items-center gap-1 rounded-md border border-slate-300 bg-white px-3 py-2 font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ChevronLeft size={16} aria-hidden="true" />
              Previous
            </button>

            <span className="font-medium text-slate-700">
              Page {pagination.currentPage} of {totalPages}
            </span>

            <button
              type="button"
              onClick={goToNextPage}
              disabled={loading || !pagination.hasNextPage}
              className="inline-flex items-center gap-1 rounded-md border border-slate-300 bg-white px-3 py-2 font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
              <ChevronRight size={16} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCarsDirectory;
