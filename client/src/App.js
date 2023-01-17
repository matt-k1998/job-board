import { ApolloProvider } from '@apollo/client';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Route, Routes } from 'react-router-dom';
import { isLoggedIn } from './auth';
import CompanyDetail from './components/CompanyDetail';
import LoginForm from './components/LoginForm';
import JobBoard from './components/JobBoard';
import JobDetail from './components/JobDetail';
import CreateJobForm from './components/CreateJobForm';
import EditJobForm from './components/EditJobForm';
import NavBar from './components/NavBar';
import { client } from './graphql/queries';
import ProfileSettings from './components/ProfileSettings';

function App() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(isLoggedIn);

  const handleLogin = () => {
    setLoggedIn(true);
    navigate('/');
  };

  const handleLogout = () => {
    setLoggedIn(false);
    navigate('/login');
  };

  return (
    <ApolloProvider client={client}>
      <NavBar loggedIn={loggedIn} onLogout={handleLogout} />
      <main className="section">
        <Routes>
          <Route path="/"
            element={<JobBoard />}
          />
          <Route path="/companies/:companyId"
            element={<CompanyDetail />}
          />
          <Route path="/jobs/new"
            element={<CreateJobForm />}
          />
          <Route path="/jobs/:jobId"
            element={<JobDetail />}
          />
          <Route path="/jobs/:jobId/edit"
            element={<EditJobForm />}
          />
          <Route path="/login"
            element={<LoginForm onLogin={handleLogin} />}
          />
          <Route path="/profile"
            element={<ProfileSettings />}
          />
        </Routes>
      </main>
    </ApolloProvider>
  );
}

export default App;
