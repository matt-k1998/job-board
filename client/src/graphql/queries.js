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

const USER_DETAIL_FRAGMENT = gql`
    fragment UserDetail on User {
        id
        name
        email
        password
        companyId
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
            company {
                id
                name
            }
            companies {
                id
                name
            }
        }
    }
`;

export const UPDATE_USER_NAME_MUTATION = gql`
    mutation UpdateUserNameMutation($input: UpdateUserInput!){
        user: updateUserName(input: $input) {
            ...UserDetail
        }
    }
    ${USER_DETAIL_FRAGMENT}
`;

export const UPDATE_USER_EMAIL_MUTATION = gql`
    mutation UpdateUserEmailMutation($input: UpdateUserInput!){
        user: updateUserEmail(input: $input) {
            ...UserDetail
        }
    }
    ${USER_DETAIL_FRAGMENT}
`;

export const UPDATE_USER_PASSWORD_MUTATION = gql`
    mutation UpdateUserPasswordMutation($input: UpdateUserInput!){
        user: updateUserPassword(input: $input) {
            ...UserDetail
        }
    }
    ${USER_DETAIL_FRAGMENT}
`;

export const UPDATE_USER_COMPANY_MUTATION = gql`
    mutation UpdateUserCompanyMutation($input: UpdateUserInput!){
        user: updateUserCompany(input: $input) {
            ...UserDetail
        }
    }
    ${USER_DETAIL_FRAGMENT}
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
