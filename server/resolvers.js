import { Company, Job, User } from './db.js';

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
        companies: () => Company.findAll(),
        user: (_root, args) => User.findById(args.id),
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
        updateUserName: async (_root, { input }, { user }) => {
            rejectIf(!user);
            const userFromDb = await User.findById(input.id);
            rejectIf(userFromDb.id !== user.id);
            return User.update({
                ...input,
                email: user.email,
                password: user.password,
                companyId: user.companyId,
            });
        },
        updateUserEmail: async (_root, { input }, { user }) => {
            rejectIf(!user);
            const userFromDb = await User.findById(input.id);
            rejectIf(userFromDb.id !== user.id);
            return User.update({
                ...input,
                name: user.name,
                password: user.password,
                companyId: user.companyId,
            });
        },
        updateUserPassword: async (_root, { input }, { user }) => {
            rejectIf(!user);
            const userFromDb = await User.findById(input.id);
            rejectIf(userFromDb.id !== user.id);
            return User.update({
                ...input,
                name: user.name,
                email: user.email,
                companyId: user.companyId,
            });
        },
    },

    // The following finds all the jobs for a company by comparing the id of the company
    // to the companyId that is stored in the jobs table:
    Company: {
        jobs: (company) => Job.findAll((job) => job.companyId === company.id)
    },

    // The following finds all the jobs for a user by comparing the companyId of a user
    // to the companyId that is stored in the jobs table:
    User: {
        jobs: (user) => Job.findAll((job) => job.companyId === user.companyId),
        company: (user) => Company.findById(user.companyId),
        companies: () => Company.findAll(),
    },

    // The following finds the company for a given job:
    Job: {
        company: (job) => Company.findById(job.companyId),
    },
};