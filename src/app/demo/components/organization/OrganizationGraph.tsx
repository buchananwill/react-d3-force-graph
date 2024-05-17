"use client";
import React, { PropsWithChildren, useContext, useEffect } from "react";

import { cloneOrganizationNode } from "./cloneOrganizationNode";
import { useNodeEditing } from "@/graph-tools/hooks/useNodeEditing";
import { getGraphUpdaterWithNameDeDuplication } from "./getGraphUpdaterWithNameDeDuplication";
import { putGraph } from "@/app/demo/components/organization/mockPutServerAction";
import { OrganizationDto } from "@/app/demo/types/OrganizationDto";
import { NodeDetailsComponentDispatchContext } from "@/app/demo/components/details-component-context/nodeDetailsComponentContextCreator";
import { DataNode } from "@/graph-tools/types/types";

import { useGraphRefs } from "@/graph-tools/hooks/useGraphRefs";

export const cloneFunctionWrapper = { memoizedFunction: cloneOrganizationNode };

export const organizationGraphUpdater =
  getGraphUpdaterWithNameDeDuplication(putGraph);

export default function OrganizationGraph({ children }: PropsWithChildren) {
  const setDetailsState = useContext(NodeDetailsComponentDispatchContext);

  const unsavedGraphChanges = useNodeEditing<OrganizationDto>(
    cloneFunctionWrapper,
    organizationGraphUpdater,
  );

  useEffect(() => {
    setDetailsState((state) => ({
      ...state,
      labelAccessor: (n: DataNode<OrganizationDto>) => n.data.name,
    }));
  }, [setDetailsState]);

  return <>{children}</>;
}
