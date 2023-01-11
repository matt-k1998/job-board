import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
import { getAccessToken } from '../auth';

const GRAPHQL_URL = 'http://localhost:9000/graphql';

const client = new ApolloClient({
    uri: GRAPHQL_URL,
    cache: new InMemoryCache(),
});

export async function createJob(input) {
    const mutation = gql`
        mutation CreateJobMutation($input: CreateJobInput!){
            job: createJob(input: $input) {
                id
            }
        }
    `;
    const variables = { input };
    const context = {
        headers: { 'Authorization': 'Bearer ' + getAccessToken() },
    };
    const { data: { job } } = await client.mutate({ mutation, variables, context });
    return job;
}

export async function deleteJob(id) {
    const mutation = gql`
        mutation DeleteJobMutation($id: ID!){
            deleteJob(id: $id) {
                id
            }
        }
    `;
    const variables = { id };
    const context = {
        headers: { 'Authorization': 'Bearer ' + getAccessToken() },
    };
    const { data: { job } } = await client.mutate({ mutation, variables, context });
    return job;
}

export async function getJobs() {
    const query = gql`
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
    // const result = await client.query({ query });
    // return result.data.jobs;

    //You can use destructuring to extract "data" from "result"
    //Therefore, the two lines of code above can be replaced with:
    const { data: { jobs } } = await client.query({
        query,
        fetchPolicy: 'network-only',
     });
     //The network-only fetch policy means that the data will always be fetched from the server and it will store the results in the cache
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
    const { data: { job } } = await client.query({ query, variables });
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
    const { data: { company } } = await client.query({ query, variables });
    return company;
}