import { request, gql } from 'graphql-request';
import { getAccessToken } from '../auth';

const GRAPHQL_URL = 'http://localhost:9000/graphql';

export async function createJob(input) {
    // We still call this "query", even though this is a mutation
    const query = gql`
        mutation CreateJobMutation($input: CreateJobInput!){
            job: createJob(input: $input) {
                id
            }
        }
    `;
    const variables = { input };
    const headers = { 'Authorization': 'Bearer ' + getAccessToken() };
    const { job } = await request(GRAPHQL_URL, query, variables, headers);
    return job;
}

//This does not work anymore, need to add the bearer token to the header in order to complete the request
export async function deleteJob(id) {
    const query = gql`
        mutation DeleteJobMutation($id: ID!){
            deleteJob(id: $id) {
                id
            }
        }
    `;
    const variables = { id };
    const { job } = await request(GRAPHQL_URL, query, variables);
    return job;
}

export async function getJobs() {
    const query = gql`
        query {
            jobs {
                id
                title
                company {
                    name
                }
            }
        }
    `;
    const { jobs } = await request(GRAPHQL_URL, query);
    return jobs;
}

export async function getJob(id) {
    const query = gql`
       query JobQuery($id: ID!) {
            job(id: $id) {
                id
                title
                company {
                    id
                    name
                }
                description
            }
        }
    `;
    const variables = { id };
    const { job } = await request(GRAPHQL_URL, query, variables);
    return job;
}

export async function getCompany(id) {
    const query = gql`
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
    const variables = { id };
    const { company } = await request(GRAPHQL_URL, query, variables);
    return company;
}