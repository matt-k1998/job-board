import { useLocation } from 'react-router-dom';
import { useUpdateJob } from '../graphql/hooks';
import { useNavigate } from 'react-router';
import { useState } from 'react';

function EditJobForm() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [title, setTitle] = useState(state.title);
    const [description, setDescription] = useState(state.description);
    const { updateJob, loading } = useUpdateJob();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const job = await updateJob(state.id, title, description);
        navigate(`/jobs/${job.id}`);
      };

    return (
        <div>
          <h1 className="title">
            Edit Job
          </h1>
          <div className="box">
            <form>
              <div className="field">
                <label className="label">
                  Job Title
                </label>
                <div className="control">
                  <input className="input" type="text" defaultValue={state.title}
                    onChange={(event) => setTitle(event.target.value)}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">
                  Job Description
                </label>
                <div className="control">
                  <textarea className="textarea" rows={10} defaultValue={state.description}
                    onChange={(event) => setDescription(event.target.value)}
                  />
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <button className="button is-link" disabled={loading}
                    onClick={handleSubmit}>
                    Update Job
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      );
}

export default EditJobForm;