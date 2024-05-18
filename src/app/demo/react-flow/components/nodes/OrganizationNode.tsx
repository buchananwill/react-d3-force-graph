import BaseNode from "@/app/demo/react-flow/components/nodes/BaseNode";
import { NodeProps } from "reactflow";
import { OrganizationDto } from "@/app/demo/types/OrganizationDto";
import React from "react";
import clsx from "clsx";

function OrganizationNode(nodeProps: NodeProps<OrganizationDto>) {
  const { selected, dragging, data } = nodeProps;

  const {
    type: { name },
  } = data;

  return (
    <BaseNode
      {...nodeProps}
      className={clsx(
        "relative flex flex-col gap-1 rounded-md border-black p-2 transition-colors-opacity",
        selected ? "border-2" : "border",
        dragging ? "opacity-50" : "",
        orgTypeBgColors[name as OrgType],
      )}
    ></BaseNode>
  );
}

export default React.memo(OrganizationNode);

// eslint-disable-next-line no-unused-vars
const orgTypeBgColors: { [key in OrgType]: string } = {
  "Year Group": "bg-white",
  Maths: "bg-sky-100",
  DT: "bg-teal-100",
  Other: "bg-amber-100",
  "Student Group": "bg-gray-100",
};

export const OrgTypes = [
  "Year Group",
  "Maths",
  "DT",
  "Other",
  "Student Group",
] as const;

type OrgType = (typeof OrgTypes)[number];
