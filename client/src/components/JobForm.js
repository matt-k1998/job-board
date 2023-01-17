import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useCreateJob, useUpdateJob } from '../graphql/hooks';
import { useLocation } from 'react-router-dom';

function JobForm() {
  const { state } = useLocation();

  const navigate = useNavigate();
  const [title, setTitle] = useState(!state ? '' : state.title);
  const [description, setDescription] = useState(!state ? '' : state.description);
  const { createJob } = useCreateJob();
  const { updateJob, loading } = useUpdateJob();
  const formTitleText = !state ? `Create Job` : `Edit Job`;
  const formSubmitText = !state ? `Add Job` : `Update Job`;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (state) {
      const job = await updateJob(state.id, title, description);
      navigate(`/jobs/${job.id}`);
    }
    else {
      const job = await createJob(title, description);
      navigate(`/jobs/${job.id}`);
    }
  };

  return (
    <div>
      <h1 className="title">
        {formTitleText}
      </h1>
      <div className="box">
        <form>
          <div className="field">
            <label className="label">
              Job Title
            </label>
            <div className="control">
              <input className="input" type="text" defaultValue={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">
              Job Description
            </label>
            <div className="control">
              <textarea className="textarea" rows={10} defaultValue={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button className="button is-link" disabled={loading}
                onClick={handleSubmit}>
                {formSubmitText}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default JobForm;
