import Button from "@/src/components/Button";

type TemplateCard = {
  title: string;
  output: string;
  status?: string;
  accent: "blue" | "mint" | "slate";
};

const templates: TemplateCard[] = [
  {
    title: "Standard Dealership Report",
    output: "PDF Output",
    status: "Active",
    accent: "blue",
  },
  {
    title: "Premium Inspection",
    output: "Web & PDF Output",
    accent: "mint",
  },
  {
    title: "Auction Summary",
    output: "PDF Output",
    accent: "slate",
  },
];

const LayoutIcon = () => (
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
    <rect x="3" y="4" width="18" height="6" rx="1.5" />
    <rect x="3" y="14" width="8" height="7" rx="1.5" />
    <rect x="13" y="14" width="8" height="7" rx="1.5" />
  </svg>
);

const FileIcon = () => (
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
    <path d="M14 3H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7Z" />
    <path d="M14 3v4h4" />
    <path d="M9 13h6" />
    <path d="M9 17h6" />
  </svg>
);

const PaletteIcon = () => (
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
    <path d="M12 3a9 9 0 1 0 0 18h1.1a2.4 2.4 0 0 0 0-4.8h-.9a1.8 1.8 0 1 1 0-3.6H14a5 5 0 0 0 0-10Z" />
    <circle cx="7.5" cy="10" r="1" />
    <circle cx="10.5" cy="7.5" r="1" />
    <circle cx="15.5" cy="8.5" r="1" />
  </svg>
);

const SlidersIcon = () => (
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
    <path d="M4 6h16" />
    <path d="M4 18h16" />
    <path d="M10 6v6" />
    <path d="M14 12v6" />
    <circle cx="10" cy="14" r="2" />
    <circle cx="14" cy="10" r="2" />
  </svg>
);

const getPreviewClasses = (accent: TemplateCard["accent"]) => {
  if (accent === "mint") {
    return "bg-[linear-gradient(135deg,rgba(214,247,249,0.95),rgba(198,239,229,0.95))]";
  }

  if (accent === "slate") {
    return "bg-[linear-gradient(135deg,rgba(245,248,252,0.95),rgba(238,243,249,0.95))]";
  }

  return "bg-[linear-gradient(135deg,rgba(215,229,249,0.95),rgba(225,234,248,0.95))]";
};

const getHeaderAccent = (accent: TemplateCard["accent"]) => {
  if (accent === "mint") {
    return "bg-[#c5f2d9]";
  }

  if (accent === "slate") {
    return "bg-[#eef2f7]";
  }

  return "bg-[#d3e4fb]";
};

const TemplatePreview = ({ accent }: { accent: TemplateCard["accent"] }) => (
  <div
    className={`flex h-[240px] items-center justify-center ${getPreviewClasses(accent)}`}
  >
    <div className="w-[64%] rounded-[4px] bg-white px-4 py-4 shadow-[0_8px_20px_rgba(148,163,184,0.12)]">
      <div className={`h-3 w-16 rounded-full ${getHeaderAccent(accent)}`} />
      <div className="mt-3 h-1.5 w-full rounded-full bg-[#edf2f8]" />
      <div className="mt-2 h-1.5 w-[92%] rounded-full bg-[#edf2f8]" />
      <div className="mt-2 h-1.5 w-[74%] rounded-full bg-[#edf2f8]" />
      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="h-16 rounded-[4px] bg-[#edf2f8]" />
        <div className="h-16 rounded-[4px] bg-[#edf2f8]" />
      </div>
    </div>
  </div>
);

const DesignTemplateDirectory = () => {
  return (
    <>
      <section >
        <div className="flex w-full flex-col gap-5 px-4 pt-7 pb-5 sm:px-8 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h1 className="text-[22px] font-bold tracking-[-0.04em] text-[#081a43] sm:text-[24px]">
              Report Templates
            </h1>
            <p className="text-[13px] leading-7 text-[#5973a9] sm:text-[14px]">
              Customize how your final car evaluation reports look.
            </p>
          </div>

          <Button
            variant="filled"
            size="sm"
            className="rounded-[18px] bg-[#06081d] font-semibold"
            startAdornment={<LayoutIcon />}
          >
            Create New Template
          </Button>
        </div>
      </section>

      <section className="w-full px-4 py-1 sm:px-8">
        <div className="grid grid-cols-1 gap-7 xl:grid-cols-3">
          {templates.map((template) => (
            <article
              key={template.title}
              className="overflow-hidden rounded-[24px] border border-[#dbe4f0] bg-white shadow-[0_8px_24px_rgba(15,23,42,0.03)]"
            >
              <TemplatePreview accent={template.accent} />

              <div className="px-7 py-7">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="max-w-[220px] text-[24px] font-semibold tracking-[-0.04em] text-[#081a43]">
                    {template.title}
                  </h3>
                  {template.status ? (
                    <span className="inline-flex rounded-[12px] bg-[#f0f2f6] px-4 py-2 text-[13px] font-semibold text-[#081a43]">
                      {template.status}
                    </span>
                  ) : null}
                </div>

                <div className="mt-3 inline-flex items-center gap-2 text-[13px] text-[#5973a9]">
                  <FileIcon />
                  <span>{template.output}</span>
                </div>

                <div className="mt-8 flex items-center gap-3">
                  <button
                    type="button"
                    className="inline-flex h-12 flex-1 items-center justify-center gap-3 rounded-2xl border border-[#d7e2ef] bg-white text-[15px] font-semibold text-[#21355b] transition hover:bg-slate-50"
                  >
                    <PaletteIcon />
                    Customize
                  </button>

                  <button
                    type="button"
                    className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-[#d7e2ef] bg-white text-[#21355b] transition hover:bg-slate-50"
                    aria-label="Template settings"
                  >
                    <SlidersIcon />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
};

export default DesignTemplateDirectory;
