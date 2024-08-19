import { z } from 'zod';
const createIssueSchema = z.object({
    title:z.string({required_error:"Title is required"}).min(1).max(255),
    description:z.string().min(1)
})

export {createIssueSchema}