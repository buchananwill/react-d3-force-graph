import { z } from "zod";
import { DataLink } from "../../src";
import { Organization } from "./adaptors";
import { mapLinkBackToClosureDto } from "../../src/functions/mapLinkBackToClosureDto";
export const ClosureDtoSchema = z.object({
  id: z.number(),
  closureType: z.string(),
  source: z.number(),
  target: z.number(),
  value: z.number(),
  weighting: z.number(),
});
export type ClosureDto = z.infer<typeof ClosureDtoSchema>;

export function reMapAndValidateLinkToClosure(link: DataLink<Organization>) {
  const closureDto = mapLinkBackToClosureDto(link);
  try {
    return ClosureDtoSchema.parse(closureDto);
  } catch (error) {
    console.error(error);
  }
}
