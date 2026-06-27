"use client";
import Link from "next/link";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock3,
  FilePen,
  RefreshCcw,
} from "lucide-react";
import useDraftsDictionary from "./useHook";
import { formatDate } from "@/src/utils/date";

const DraftsDirectory = () => {
  const {
    drafts,
    error,
    loading,
    totalPages,
    setPage,
    pagination,
    setRetryCount,
  } = useDraftsDictionary();

  return (
    <>
      <section>
        <div className="w-full px-4 py-10 sm:px-8">
          <h1 className="text-2xl font-bold text-slate-900">Saved Drafts</h1>
          <p className="mt-1 text-sm text-slate-500">
            Continue working on your incomplete car evaluations.
          </p>
        </div>
      </section>

      <section className="w-full px-4 pb-10 sm:px-8">
        {loading ? (
          <div className="rounded-xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-500">
            Loading drafts...
          </div>
        ) : error ? (
          <div className="flex flex-col items-center gap-3 rounded-xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-500">
            <span>{error}</span>
            <button
              type="button"
              onClick={() => setRetryCount((current) => current + 1)}
              className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
            >
              <RefreshCcw size={16} aria-hidden="true" />
              Retry
            </button>
          </div>
        ) : drafts.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-500">
            No saved drafts found.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-7 xl:grid-cols-3">
              {drafts.map((draft) => (
                <article
                  key={draft.id}
                  className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition-colors hover:border-primary/30"
                >
                  <div className="flex-1 p-6">
                    <div className="mb-4 flex items-start justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 text-slate-600">
                        <FilePen size={20} strokeWidth={2.2} />
                      </div>
                      <span className="rounded-md bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                        Draft
                      </span>
                    </div>

                    <h3 className="mb-1 text-lg font-semibold text-slate-900">
                      {draft.name}
                    </h3>
                    <p className="text-sm text-slate-500">{draft.model}</p>
                    <p className="mt-2 text-xs font-medium text-slate-400">
                      {draft.vehicleNumber || draft.id}
                    </p>

                    <div className="mt-4 flex items-center gap-4 text-sm text-slate-500">
                      <div className="flex items-center gap-1.5">
                        <Clock3 size={18} strokeWidth={2} />
                        <span>Updated {formatDate(draft.updatedAt)}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar size={18} strokeWidth={2} />
                        <span>Created {formatDate(draft.createdAt)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 border-t border-slate-100 bg-slate-50 p-4">
                    <Link
                      href={`/car-evaluation?vehicleId=${draft.id}`}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                    >
                      Resume
                      <ChevronRight size={18} strokeWidth={2.4} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-7 flex flex-col items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 sm:flex-row">
              <span>
                {pagination.total} {pagination.total === 1 ? "draft" : "drafts"}
              </span>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setPage((current) => Math.max(current - 1, 1))}
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
                  onClick={() =>
                    setPage((current) => Math.min(current + 1, totalPages))
                  }
                  disabled={loading || !pagination.hasNextPage}
                  className="inline-flex items-center gap-1 rounded-md border border-slate-300 bg-white px-3 py-2 font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Next
                  <ChevronRight size={16} aria-hidden="true" />
                </button>
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default DraftsDirectory;
