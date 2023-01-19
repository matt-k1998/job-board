import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
import { getAccessToken } from '../auth';

const GRAPHQL_URL = 'http://localhost:9000/graphql';

export const client = new ApolloClient({
    uri: GRAPHQL_URL,
    cache: new InMemoryCache(),
});

const JOB_DETAIL_FRAGMENT = gql`
    fragment JobDetail on Job {
        id
        title
        company {
            id
            name
        }
        description
    }
`;

export const JOB_QUERY = gql`
    query JobQuery($id: ID!) {
        job(id: $id) {
            ...JobDetail
        }
    }
    ${JOB_DETAIL_FRAGMENT}
`;

export const JOBS_PER_COMPANY_QUERY = gql`
    query SearchJobs($userId: ID!) {
        user(id: $userId) {
            id
            companyId
            jobs {
                id
                title
                description
                company {
                    id
                    name
                }
            }
        }
    }
`;

export const ALL_JOBS_QUERY = gql`
    query JobsQuery {
        jobs {
            id
            title
            company {
                id
                name
            }
        }
    }
`;

export const COMPANY_QUERY = gql`
    query CompanyQuery($id: ID!) {
        company(id: $id) {
            id
            name
            description
            jobs {
                id
                title
            }
        }
    }
`;

export const USER_QUERY = gql`
    query UserQuery($id: ID!) {
        user(id: $id) {
            id
            name
            email
            password
            companyId
            company{
                name
            }
        }
    }
`;

export const UPDATE_USER_NAME_MUTATION = gql`
    mutation UpdateUserNameMutation($input: UpdateUserNameInput!){
        user: updateUserName(input: $input) {
            id
            name
            email
            password
        }
    }
`;

export const CREATE_JOB_MUTATION = gql`
    mutation CreateJobMutation($input: CreateJobInput!){
        job: createJob(input: $input) {
            ...JobDetail
        }
    }
    ${JOB_DETAIL_FRAGMENT}
`;

export const UPDATE_JOB_MUTATION = gql`
    mutation UpdateJobMutation($input: UpdateJobInput!){
        job: updateJob(input: $input) {
            ...JobDetail
        }
    }
    ${JOB_DETAIL_FRAGMENT}
`;

export const DELETE_JOB_MUTATION = gql`
    mutation DeleteJobMutation($id: ID!){
        deleteJob(id: $id) {
            id
        }
    }
`;

export async function deleteJob(id) {
    const variables = { id };
    const context = {
        headers: { 'Authorization': 'Bearer ' + getAccessToken() },
    };
    const { data: { job } } = await client.mutate({
        mutation: DELETE_JOB_MUTATION,
        variables,
        context
    });
    return job;
}
