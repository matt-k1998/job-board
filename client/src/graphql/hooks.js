import { useQuery } from "@apollo/client";
import { COMPANY_QUERY, JOBS_QUERY, JOB_QUERY } from "./queries";

export function useJob(id) {
    const { data, loading, error } = useQuery(JOB_QUERY, {
        variables: { id },
    });
    return {
        job: data?.job,
        loading,
        error: Boolean(error),
    };
}

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

export function useCompany(id) {
    const { data, loading, error } = useQuery(COMPANY_QUERY, {
        variables: { id },
    });
    return {
        company: data?.company,
        loading,
        error: Boolean(error),
    };
}