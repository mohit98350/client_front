import { useRef, useState } from "react";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createPaper, fetchPaperLibrary } from "@/api/paperApi";
import { LibraryFilters } from "@/components/papers/LibraryFilters";
import { PaperForm } from "@/components/papers/PaperForm";
import { PaperLibraryTable } from "@/components/papers/PaperLibraryTable";

const defaultFilters = {
  readingStage: [],
  researchDomain: [],
  impactScore: [],
  dateRange: "all",
};

export function LibraryPage() {
  const [filters, setFilters] = useState(defaultFilters);
  const resultsSectionRef = useRef(null);
  const queryClient = useQueryClient();

  const scrollToResultsTop = () => {
    if (resultsSectionRef.current) {
      resultsSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFiltersChange = (nextFilters) => {
    setFilters(nextFilters);
    scrollToResultsTop();
  };

  const handleClearFilters = () => {
    setFilters(defaultFilters);
    scrollToResultsTop();
  };

  const paperLibraryQuery = useQuery({
    queryKey: ["papers", filters],
    queryFn: () => fetchPaperLibrary(filters),
    placeholderData: keepPreviousData,
  });

  const createPaperMutation = useMutation({
    mutationFn: createPaper,
    onSuccess: () => {
      toast.success("Paper added successfully");
      queryClient.invalidateQueries({ queryKey: ["papers"] });
      queryClient.invalidateQueries({ queryKey: ["analytics"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleCreatePaper = async (payload) => {
    await createPaperMutation.mutateAsync(payload);
  };

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-[360px_1fr]">
      <div className="space-y-6">
        <PaperForm onCreatePaper={handleCreatePaper} isSubmitting={createPaperMutation.isPending} />
        <LibraryFilters filters={filters} onFiltersChange={handleFiltersChange} onClearFilters={handleClearFilters} />
      </div>

      <div ref={resultsSectionRef}>
        <PaperLibraryTable
          papers={paperLibraryQuery.data || []}
          isLoading={paperLibraryQuery.isPending}
          isFetching={paperLibraryQuery.isFetching}
        />
      </div>
    </div>
  );
}
