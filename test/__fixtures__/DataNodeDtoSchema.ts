import { z } from "zod";
import { OrganizationDtoSchema } from "./OrganizationDtoSchema";

import { Organization } from "./adaptors";
import { reMapNodeIdWithoutValidating } from "../../src";
import { DataNode } from "../../src";

export function createDataNodeDtoSchema<T extends z.ZodTypeAny>(dataSchema: T) {
  return z.object({
    id: z.number(),
    distanceFromRoot: z.number(),
    data: dataSchema, // Use the passed schema here
  });
}

const OrganizationNodeDtoSchema = createDataNodeDtoSchema(
  OrganizationDtoSchema,
);

export type OrganizationNodeDto = z.infer<typeof OrganizationNodeDtoSchema>;

export function revalidateOrganizationNode(node: DataNode<Organization>) {
  const remappedNode = reMapNodeIdWithoutValidating(node);
  try {
    return OrganizationNodeDtoSchema.parse(remappedNode);
  } catch (error) {
    console.error(error);
  }
}
