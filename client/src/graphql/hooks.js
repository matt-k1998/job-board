import { useQuery } from "@apollo/client";
import { JOBS_QUERY } from "./queries";

export function useJobs() {
    const { data, loading, error } = useQuery(JOBS_QUERY, {
      //The network-only fetch policy means that the data will always be fetched from the server and it will store the results in the cache
      fetchPolicy: 'network-only',
    });
    return {
      jobs: data?.jobs,
      loading,
      error: Boolean(error),
    };
  }