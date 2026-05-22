import { Calendar, ChevronRight, Clock3, FilePen, Trash2, SquarePen, ClockIcon } from "lucide-react";

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

const DraftsDirectory = () => {
  return (
    <>
          <section>
            <div className="w-full px-4 py-6 sm:px-8">
              <h1 className="text-[22px] font-bold tracking-[-0.04em] text-[#081a43] sm:text-[24px]">
                Saved Drafts
              </h1>
              <p className="text-sm text-slate-500 mt-1 font-medium">
                Continue working on your incomplete car evaluations.
              </p>
            </div>
          </section>

          <section className="w-full px-4 sm:px-8 py-1">
            <div className="grid grid-cols-1 gap-7 xl:grid-cols-3">
              {drafts.map((draft) => (
                <article
                  key={draft.title}
                  className="overflow-hidden rounded-2xl border border-[#dbe4f0] bg-white shadow-[0_8px_24px_rgba(15,23,42,0.03)]"
                >
                  <div className="px-5 py-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f7f9fc] text-[#64748b]">
                        <SquarePen size={19}/>
                      </div>
                      <span className="inline-flex rounded-[12px] bg-[#f0f2f6] px-4 py-1 text-[12px] font-semibold text-[#081a43]">
                        {draft.progress}% Complete
                      </span>
                    </div>

                    <h3 className="mt-5 text-[18px] font-semibold tracking-[-0.04em] text-[#081a43]">
                      {draft.title}
                    </h3>

                    <div className="mt-4 flex flex-wrap items-center gap-6 text-[13px] text-[#5973a9]">
                      <div className="inline-flex items-center gap-2">
                        <ClockIcon />
                        <span>{draft.lastSaved}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar size={18} strokeWidth={2} />
                        <span>{draft.step}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 border-t border-[#e7edf5] bg-[#fbfcfe] px-5 py-4 sm:flex-row">
                    <button
                      type="button"
                      className="inline-flex h-10 md:flex-1 items-center justify-center gap-3 rounded-xl border border-[#d7e2ef] bg-white text-[14px] font-semibold text-[#21355b] transition hover:bg-slate-50"
                    >
                      <span className="text-[#ff5d66]">
                        <Trash2 size={17} strokeWidth={2.2} />
                      </span>
                      Discard
                    </button>

                    <button
                      type="button"
                      className="inline-flex h-10 md:flex-1 items-center justify-center gap-3 rounded-xl bg-[#06081d] text-[14px] font-semibold text-white transition hover:bg-[#101534]"
                    >
                      Resume
                      <ChevronRight size={18} strokeWidth={2.4} />
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
