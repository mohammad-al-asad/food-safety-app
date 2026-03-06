import { ChevronLeft, ChevronRight } from "lucide-react";

type TablePaginationProps = {
  summaryText?: string;
  className?: string;
};

export default function TablePagination({
  summaryText = "Showing 1-8 of 250",
  className = "",
}: TablePaginationProps) {
  return (
    <div
      className={`flex flex-col md:flex-row justify-between items-center px-6 py-4 gap-4 border-t border-gray-100 ${className}`.trim()}
    >
      <p className="text-sm font-bold text-main uppercase tracking-wider">
        {summaryText}
      </p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          className="p-1.5 text-[#94A3B8] hover:text-main transition-colors"
          aria-label="Previous page"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          type="button"
          className="w-6 h-6 rounded bg-main text-white text-xs font-semibold"
        >
          1
        </button>
        <button
          type="button"
          className="w-6 h-6 rounded text-xs text-[#64748B] hover:bg-gray-100"
        >
          2
        </button>
        <button
          type="button"
          className="w-6 h-6 rounded text-xs text-[#64748B] hover:bg-gray-100"
        >
          3
        </button>
        <span className="px-1 text-xs text-[#94A3B8]">4....30</span>
        <button
          type="button"
          className="w-8 h-6 rounded text-xs text-[#64748B] hover:bg-gray-100"
        >
          60
        </button>
        <button
          type="button"
          className="w-8 h-6 rounded text-xs text-[#64748B] hover:bg-gray-100"
        >
          120
        </button>
        <button
          type="button"
          className="p-1.5 text-[#94A3B8] hover:text-main transition-colors"
          aria-label="Next page"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
