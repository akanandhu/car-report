"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { Calendar, ChevronRight, ClockIcon, SquarePen, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useRef } from "react";

import { fetchVehicles } from "@/src/networks/vehicles";

const PAGE_SIZE = 9;

const formatVehicleTitle = (name: string, model: string) => {
  if (!model) {
    return name;
  }

  return `${name} ${model}`.trim();
};

const formatRelativeDate = (value: string) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Recently updated";
  }

  const diffMs = Date.now() - date.getTime();
  const diffMinutes = Math.max(1, Math.floor(diffMs / (1000 * 60)));

  if (diffMinutes < 60) {
    return `${diffMinutes} minute${diffMinutes === 1 ? "" : "s"} ago`;
  }

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) {
    return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
  }

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) {
    return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

const formatDate = (value: string) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Saved draft";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

const DraftsDirectory = () => {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["vehicles", "drafts", PAGE_SIZE],
    queryFn: ({ pageParam }) =>
      fetchVehicles(pageParam, PAGE_SIZE, undefined, "draft"),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.pagination.hasNextPage
        ? lastPage.pagination.page + 1
        : undefined,
  });

  const drafts = useMemo(
    () => data?.pages.flatMap((page) => page.data) ?? [],
    [data],
  );

  useEffect(() => {
    const sentinel = loadMoreRef.current;

    if (!sentinel || !hasNextPage) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        if (entry?.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: "240px 0px" },
    );

    observer.observe(sentinel);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <>
      <section>
        <div className="w-full px-4 py-6 sm:px-8">
          <h1 className="text-[22px] font-bold tracking-[-0.04em] text-[#081a43] sm:text-[24px]">
            Saved Drafts
          </h1>
          <p className="mt-1 text-sm font-medium text-slate-500">
            Continue working on your incomplete car evaluations.
          </p>
        </div>
      </section>

      <section className="w-full px-4 py-1 sm:px-8">
        {isLoading ? (
          <div className="rounded-2xl border border-[#dbe4f0] bg-white px-6 py-14 text-center text-[15px] text-[#5973a9] shadow-[0_8px_24px_rgba(15,23,42,0.03)]">
            Loading drafts...
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-[#f3d1d1] bg-white px-6 py-14 text-center text-[15px] text-[#c2410c] shadow-[0_8px_24px_rgba(15,23,42,0.03)]">
            Unable to load drafts right now.
          </div>
        ) : drafts.length === 0 ? (
          <div className="rounded-2xl border border-[#dbe4f0] bg-white px-6 py-14 text-center text-[15px] text-[#5973a9] shadow-[0_8px_24px_rgba(15,23,42,0.03)]">
            No draft evaluations found.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-7 xl:grid-cols-3">
              {drafts.map((draft) => (
                <article
                  key={draft.id}
                  className="overflow-hidden rounded-2xl border border-[#dbe4f0] bg-white shadow-[0_8px_24px_rgba(15,23,42,0.03)]"
                >
                  <div className="px-5 py-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f7f9fc] text-[#64748b]">
                        <SquarePen size={19} />
                      </div>
                      <span className="inline-flex rounded-[12px] bg-[#eef2f7] px-4 py-1 text-[12px] font-semibold text-[#081a43]">
                        Draft
                      </span>
                    </div>

                    <h3 className="mt-5 text-[18px] font-semibold tracking-[-0.04em] text-[#081a43]">
                      {formatVehicleTitle(draft.name, draft.model)}
                    </h3>

                    <p className="mt-2 text-[13px] font-medium text-[#5973a9]">
                      {draft.vehicleNumber}
                    </p>

                    <div className="mt-4 flex flex-wrap items-center gap-6 text-[13px] text-[#5973a9]">
                      <div className="inline-flex items-center gap-2">
                        <ClockIcon size={18} />
                        <span>{formatRelativeDate(draft.updatedAt)}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar size={18} strokeWidth={2} />
                        <span>{formatDate(draft.updatedAt)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 border-t border-[#e7edf5] bg-[#fbfcfe] px-5 py-4 sm:flex-row">
                    <button
                      type="button"
                      disabled
                      className="inline-flex h-10 items-center justify-center gap-3 rounded-xl border border-[#d7e2ef] bg-white text-[14px] font-semibold text-[#9aa9bf] md:flex-1"
                    >
                      <span className="text-[#ff9da3]">
                        <Trash2 size={17} strokeWidth={2.2} />
                      </span>
                      Discard
                    </button>

                    <Link
                      href={`/car-evaluation?vehicleId=${draft.id}`}
                      className="inline-flex h-10 items-center justify-center gap-3 rounded-xl bg-[#06081d] text-[14px] font-semibold text-white transition hover:bg-[#101534] md:flex-1"
                    >
                      Resume
                      <ChevronRight size={18} strokeWidth={2.4} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            <div ref={loadMoreRef} className="h-6 w-full" />

            <div className="py-6 text-center text-[14px] text-[#5973a9]">
              {isFetchingNextPage
                ? "Loading more drafts..."
                : hasNextPage
                  ? "Scroll to load more drafts"
                  : "You've reached the end of your drafts"}
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default DraftsDirectory;
