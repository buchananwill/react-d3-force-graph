"use client";
import { cloneOrganizationNode } from "./cloneOrganizationNode";
import { getGraphUpdaterWithNameDeDuplication } from "./getGraphUpdaterWithNameDeDuplication";
import { putGraph } from "@/app/demo/components/organization/mockPutServerAction";

export const cloneFunctionWrapper = { memoizedFunction: cloneOrganizationNode };

export const organizationGraphUpdater =
  getGraphUpdaterWithNameDeDuplication(putGraph);
