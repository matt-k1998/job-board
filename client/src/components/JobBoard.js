import JobList from './JobList';
import { useJobsPerComany } from '../graphql/hooks';
import { useState } from 'react';
import { getUser } from '../auth';

function JobBoard() {
  const [currentUser] = useState(getUser);
  const { jobs, loading, error } = useJobsPerComany(currentUser.id);

  if (!currentUser) {
    return <p>Sign in first</p>
  }

  if (loading) {
    return <p>Loading...</p>
  }

  if(error) {
    return <p>Something went wrong while fetching jobs</p>
  }

  if(jobs) {
    return (
      <div>
        <h1 className="title">
          Job Board
        </h1>
        <JobList jobs={jobs} />
      </div>
    );
  }
}

export default JobBoard;
