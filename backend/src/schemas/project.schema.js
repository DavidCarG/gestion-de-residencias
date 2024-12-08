import { z } from 'zod';

export const createProjectSchema = z.object({
  name: z.string({ message: 'Name is required' }),
  student: z.object({ message: 'Student is required' }),
  advisor: z.object({ message: 'Advisor is required' }),
  realizationDate: z.date({ message: 'Realization date is required' }),
  releaseDate: z.date({ message: 'Release date is required' }),
  type: z.string({ message: 'Type is required' }),
  grade: z.number({ message: 'Grade is required' }),
  summary: z.string({ message: 'Summary is required' }),
  reportfile: z.string({ message: 'Report file is required' }),
  degreeCandidate: z.boolean({ message: 'Degree candidate is required' }),
  checklist: z.array(z.string({ message: 'Checklist is required' })),
});
