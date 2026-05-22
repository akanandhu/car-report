
const CarEvaluationShimmer = () => {
  return (
    <div className="min-h-screen bg-slate-100 px-0 py-0 md:p-4">
      <div className="mx-auto min-h-screen max-w-[1440px] overflow-hidden bg-white md:min-h-[calc(100vh-2rem)] md:rounded-[28px] md:border md:border-slate-200/70 md:shadow-sm">
        <div className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 backdrop-blur">
          <div className="px-5 py-5 sm:px-8">
            <div className="mb-3 h-3 w-28 rounded-full bg-gray-200 animate-pulse" />
            <div className="mb-5 h-8 w-56 rounded-lg bg-gray-200 animate-pulse" />
            <div className="mb-4 h-14 w-full rounded-2xl bg-gray-100 p-2">
              <div className="flex gap-3 overflow-hidden">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-10 w-32 shrink-0 rounded-xl bg-gray-200 animate-pulse"
                  />
                ))}
              </div>
            </div>
            <div className="h-2 w-full rounded-full bg-gray-200 animate-pulse" />
          </div>
        </div>
        <div className="px-4 pb-28 pt-6 sm:px-8">
          <div className="mx-auto max-w-screen-2xl space-y-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i}>
                <div className="mb-2 h-4 w-32 rounded bg-gray-200 animate-pulse" />
                <div className="h-14 w-full rounded-xl bg-gray-200 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarEvaluationShimmer;
