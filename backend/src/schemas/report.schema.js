import { z } from 'zod';

export const createReportSchema = z.object({
  author: z.string({ message: 'Author is required' }),
  project: z.string({ message: 'Project is required' }),
  link: z.string({ message: 'Link is required' }),
  creationDate: z.date({ message: 'Creation date is required' }),
});
