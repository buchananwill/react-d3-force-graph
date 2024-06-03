import { OrganizationTypeDtoSchema } from "./OrganizationTypeDtoSchema";

import { z } from "zod";
import { WorkSeriesBundleAssignmentDtoSchema } from "./WorkSeriesBundleAssignmentDtoSchema";
export const OrganizationDtoSchema = z.object({
  id: z.number(),
  name: z.string(),
  type: OrganizationTypeDtoSchema,
  workSeriesBundleAssignment: WorkSeriesBundleAssignmentDtoSchema,
});
export type OrganizationDto = z.infer<typeof OrganizationDtoSchema>;
