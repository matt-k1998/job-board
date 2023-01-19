import { useParams, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useJob } from '../graphql/hooks';
import { deleteJob } from '../graphql/queries';
import classes from './JobDetail.module.css'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

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
  const editJobHandler = (event) => {
    event.preventDefault();
    navigate(`/jobs/${jobId}/edit`, { state: job });
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
        <button className={classes.buttons}>
          <EditIcon onClick={editJobHandler}/>
        </button>
        <button className={classes.buttons}>
          <DeleteIcon onClick={deleteJobHandler}/>
        </button>
      </div>
    </div>
  );
}

export default JobDetail;
