import { Email } from '@mui/icons-material';
import { request } from 'express';
import { z } from 'zod';
export const createProjectBankSchema = z.object({
  projectName: z.string({ message: 'Project name is required' }),
  requestingCompany: z.string({ message: 'Requesting company is required' }),
  year: z.number({ message: 'Year is required' }).min(2000).max(2100),
  semester: z.number({ message: 'Semester is required' }).min(1).max(13),
  managetName: z.string({ message: 'Manager name is required' }),
  email: z.string({ message: 'Email is required' }).email(),
  contactPhone: z.string({ message: 'Contact phone is required' }),
  location: z.string({ message: 'Location is required' }),
  shortDescription: z
    .string({ message: 'Short description is required' })
    .max(500),
  descriptionPDF: z.string({ message: 'Description PDF is required' }),
});
