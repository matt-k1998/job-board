import JobList from './JobList';
import { JOBS_QUERY } from '../graphql/queries';
import { useQuery } from '@apollo/client';

function JobBoard() {
  const { data, loading, error } = useQuery(JOBS_QUERY, {
    //The network-only fetch policy means that the data will always be fetched from the server and it will store the results in the cache
    fetchPolicy: 'network-only',
  });

  if (loading) {
    return <p>Loading...</p>
  }

  if(error) {
    return <p>Something went wrong, check your internet connection</p>
  }

  const { jobs } = data;

  return (
    <div>
      <h1 className="title">
        Job Board
      </h1>
      <JobList jobs={jobs} />
    </div>
  );
}

export default JobBoard;
