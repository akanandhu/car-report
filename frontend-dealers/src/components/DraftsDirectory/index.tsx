type DraftCard = {
  title: string;
  progress: number;
  lastSaved: string;
  step: string;
};

const drafts: DraftCard[] = [
  {
    title: "Honda Civic 2021",
    progress: 45,
    lastSaved: "2 hours ago",
    step: "Step 4",
  },
  {
    title: "Toyota Camry 2019",
    progress: 15,
    lastSaved: "Yesterday",
    step: "Step 2",
  },
  {
    title: "Ford F-150 2022",
    progress: 80,
    lastSaved: "3 days ago",
    step: "Step 8",
  },
];

const DraftIcon = () => (
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
    <path d="m9 15 2 2 4-4" />
  </svg>
);

const ClockIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="8" />
    <path d="M12 8v5l3 2" />
  </svg>
);

const CalendarIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4"
    aria-hidden="true"
  >
    <path d="M8 3v3" />
    <path d="M16 3v3" />
    <rect x="4" y="5" width="16" height="15" rx="2" />
    <path d="M4 10h16" />
  </svg>
);

const TrashIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4"
    aria-hidden="true"
  >
    <path d="M3 6h18" />
    <path d="M8 6V4h8v2" />
    <path d="M19 6l-1 14H6L5 6" />
    <path d="M10 11v6" />
    <path d="M14 11v6" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4"
    aria-hidden="true"
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);

const DraftsDirectory = () => {
  return (
    <>
          <section className="border-b border-slate-200 bg-white">
            <div className="w-full px-4 py-10 sm:px-8">
              <h1 className="text-[22px] font-bold tracking-[-0.04em] text-[#081a43] sm:text-[24px]">
                Saved Drafts
              </h1>
              <p className="text-[13px] leading-7 text-[#5973a9] sm:text-[14px]">
                Continue working on your incomplete car evaluations.
              </p>
            </div>
          </section>

          <section className="w-full px-4 py-10 sm:px-8">
            <div className="grid grid-cols-1 gap-7 xl:grid-cols-3">
              {drafts.map((draft) => (
                <article
                  key={draft.title}
                  className="overflow-hidden rounded-[24px] border border-[#dbe4f0] bg-white shadow-[0_8px_24px_rgba(15,23,42,0.03)]"
                >
                  <div className="px-7 py-8">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f7f9fc] text-[#64748b]">
                        <DraftIcon />
                      </div>
                      <span className="inline-flex rounded-[12px] bg-[#f0f2f6] px-4 py-2 text-[13px] font-semibold text-[#081a43]">
                        {draft.progress}% Complete
                      </span>
                    </div>

                    <h3 className="mt-8 text-[22px] font-semibold tracking-[-0.04em] text-[#081a43]">
                      {draft.title}
                    </h3>

                    <div className="mt-8 flex flex-wrap items-center gap-6 text-[13px] text-[#5973a9]">
                      <div className="inline-flex items-center gap-2">
                        <ClockIcon />
                        <span>{draft.lastSaved}</span>
                      </div>
                      <div className="inline-flex items-center gap-2">
                        <CalendarIcon />
                        <span>{draft.step}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 border-t border-[#e7edf5] bg-[#fbfcfe] px-5 py-5 sm:flex-row">
                    <button
                      type="button"
                      className="inline-flex h-12 flex-1 items-center justify-center gap-3 rounded-2xl border border-[#d7e2ef] bg-white text-[15px] font-semibold text-[#21355b] transition hover:bg-slate-50"
                    >
                      <span className="text-[#ff5c63]">
                        <TrashIcon />
                      </span>
                      Discard
                    </button>

                    <button
                      type="button"
                      className="inline-flex h-12 flex-1 items-center justify-center gap-3 rounded-2xl bg-[#06081d] text-[15px] font-semibold text-white transition hover:bg-[#101534]"
                    >
                      Resume
                      <ChevronRightIcon />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
    </>
  );
};

export default DraftsDirectory;
