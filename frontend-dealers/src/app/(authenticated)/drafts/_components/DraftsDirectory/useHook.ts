import { fetchVehicles } from "@/src/networks/vehicles";
import { VehicleResponse } from "@/src/networks/vehicles/types";
import { getErrorMessage } from "@/src/utils/error";
import { useEffect, useRef, useState } from "react";
const PAGE_LIMIT = 9;


const useDraftsDictionary = () => {
  const requestSequence = useRef(0);
  const [drafts, setDrafts] = useState<VehicleResponse[]>([]);
  const [page, setPage] = useState(1);
  const [retryCount, setRetryCount] = useState(0);
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

  const totalPages = pagination.totalPages || 1;

  useEffect(() => {
    const currentRequest = requestSequence.current + 1;
    requestSequence.current = currentRequest;

    const loadDrafts = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetchVehicles(
          page,
          PAGE_LIMIT,
          undefined,
          "draft",
        );

        if (requestSequence.current !== currentRequest) {
          return;
        }

        setDrafts(response.data);
        setPagination({
          ...response.pagination,
          totalPages: Math.max(response.pagination.totalPages, 1),
        });
      } catch (loadError) {
        if (requestSequence.current !== currentRequest) {
          return;
        }

        setDrafts([]);
        setError(getErrorMessage(loadError));
      } finally {
        if (requestSequence.current === currentRequest) {
          setLoading(false);
        }
      }
    };

    loadDrafts();
  }, [page, retryCount]);
  return {
    drafts,
    page,
    setPage,
    retryCount,
    setRetryCount,
    loading,
    error,
    pagination,
    totalPages,
  };
};

export default useDraftsDictionary;
