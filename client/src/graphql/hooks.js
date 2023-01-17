import { useMutation, useQuery } from "@apollo/client";
import { getAccessToken } from "../auth";
import { ALL_JOBS_QUERY, COMPANY_QUERY, CREATE_JOB_MUTATION, JOBS_PER_COMPANY_QUERY, JOB_QUERY, UPDATE_JOB_MUTATION, USER_QUERY } from "./queries";

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

export function useJobsPerComany(userId) {
    const { data, loading, error } = useQuery(JOBS_PER_COMPANY_QUERY, {
        variables: { userId },
        fetchPolicy: 'network-only',
        onError: (error) =>
            console.log(error)
    });
    return {
        jobs: data?.user.jobs,
        loading,
        error,
    }
}

export function useUser(id) {
    const { data, loading, error } = useQuery(USER_QUERY, {
        variables: { id },
    });
    return {
        user: data?.user,
        loading,
        error: Boolean(error),
    };
}

export function useJobs() {
    const { data, loading, error } = useQuery(ALL_JOBS_QUERY, {
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

export function useCreateJob() {
    const [mutate, { loading, error }] = useMutation(CREATE_JOB_MUTATION);
    return {
        createJob: async (title, description) => {
            const { data: { job } } = await mutate({
                variables: { input: { title, description } },
                context: {
                  headers: { 'Authorization': 'Bearer ' + getAccessToken() },
                },
                update: (cache, { data: { job } }) => {
                  cache.writeQuery({
                      query: JOB_QUERY,
                      variables: { id: job.id },
                      data: { job },
                  });
                },
            });
            return job;
        },
        loading,
        error: Boolean(error),
    }
}

export function useUpdateJob() {
    const [mutate, { loading, error }] = useMutation(UPDATE_JOB_MUTATION);
    return {
        updateJob: async (id, title, description) => {
            const { data: { job } } = await mutate({
                variables: { input: { id, title, description } },
                context: {
                  headers: { 'Authorization': 'Bearer ' + getAccessToken() },
                },
                update: (cache, { data: { job } }) => {
                  cache.writeQuery({
                      query: JOB_QUERY,
                      variables: { id: job.id },
                      data: { job },
                  });
                },
            });
            return job;
        },
        loading,
        error: Boolean(error),
    }
}