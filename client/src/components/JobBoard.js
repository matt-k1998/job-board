import JobList from './JobList';
import { getJobs } from '../graphql/queries';
import { useEffect, useState } from 'react';

function JobBoard() {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(false);
  useEffect(() => {
    // getJobs().then((jobs) => setJobs(jobs));
    //The line above can be simplified to:
    getJobs().then(setJobs)
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  }, []);

  if(error) {
    return <p>Something went wrong, check your internet connection</p>
  }

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
