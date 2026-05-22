import { Calendar, ChevronRight, Clock3, FilePen, Trash2 } from "lucide-react";

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
            <div className="w-full px-4 py-10 sm:px-8">
              <h1 className="text-2xl font-bold text-slate-900">
                Saved Drafts
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Continue working on your incomplete car evaluations.
              </p>
            </div>
          </section>

          <section className="w-full px-4 sm:px-8">
            <div className="grid grid-cols-1 gap-7 xl:grid-cols-3">
              {drafts.map((draft) => (
                <article
                  key={draft.title}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col transition-colors hover:border-primary/30 group"
                >
                  <div className="p-6 flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600">
                        <FilePen size={20} strokeWidth={2.2} />
                      </div>
                      <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-md">
                        {draft.progress}% Complete
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold text-slate-900 mb-1">
                      {draft.title}
                    </h3>

                    <div className="flex items-center gap-4 text-sm text-slate-500 mt-4">
                      <div className="flex items-center gap-1.5">
                        <Clock3 size={18} strokeWidth={2} />
                        <span>{draft.lastSaved}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar size={18} strokeWidth={2} />
                        <span>{draft.step}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50 border-t border-slate-100 p-4 flex gap-3">
                    <button
                      type="button"
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-50 hover:text-slate-900 transition-colors"
                    >
                      <span className="text-[#ff5d66]">
                        <Trash2 size={17} strokeWidth={2.2} />
                      </span>
                      Discard
                    </button>

                    <button
                      type="button"
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors"
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
