import { Company, Job } from './db.js';

function rejectIf(condition){
    if (condition) {
        throw new Error('Unauthorised');
    }
}

export const resolvers = {
    Query: {
        job: (_root, args) => Job.findById(args.id),
        jobs: () => Job.findAll(),
        company: (_root, args) => Company.findById(args.id),
    },

    Mutation: {
        createJob: (_root, { input }, { user }) => {
            rejectIf(!user);
            return Job.create({...input, companyId: user.companyId });
        },
        deleteJob: async (_root, { id }, { user }) => {
            rejectIf(!user);
            const job = await Job.findById(id);
            //The following prevents the user from deleting another company's jobs
            rejectIf(job.companyId !== user.companyId);
            return Job.delete(id);
        },
        updateJob: async (_root, { input }, { user }) => {
            rejectIf(!user);
            const job = await Job.findById(input.id);
            rejectIf(job.companyId !== user.companyId);
            return Job.update({...input, companyId: user.companyId });
        },
    },

    // The following finds all the jobs for a company by comparing the id of the company
    // to the companyId that is stored in the jobs table:
    Company: {
        jobs: (company) => Job.findAll((job) => job.companyId === company.id)
    },

    // The following finds the company for a given job:
    Job: {
        company: (job) => Company.findById(job.companyId),
    },
};