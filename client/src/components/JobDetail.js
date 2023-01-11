import { useParams, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useJob } from '../graphql/hooks';
import { deleteJob } from '../graphql/queries';

function JobDetail() {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const { job, loading, error } = useJob(jobId);

  if (loading) {
    return <p>Loading...</p>
  }

  if(error) {
    return <p>Something went wrong while fetching job details</p>
  }

  const deleteJobHandler = async (event) => {
    event.preventDefault();
    await deleteJob(jobId);
    console.log('job with id: ', jobId, 'deleted');
    navigate(`/`)
  }
  return (
    <div>
      <h1 className="title">
        {job.title}
      </h1>
      <h2 className="subtitle">
        <Link to={`/companies/${job.company.id}`}>
          {job.company.name}
        </Link>
      </h2>
      <div className="box">
        {job.description}
      </div>
      <div>
        <button
          style={{
            background: "red",
            color: "white"
          }}
          onClick={deleteJobHandler}>
          Delete Job
        </button>
      </div>
    </div>
  );
}

export default JobDetail;
