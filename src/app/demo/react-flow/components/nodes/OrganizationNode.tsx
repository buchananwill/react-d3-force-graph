import { OrganizationDto } from "@/app/demo/types/OrganizationDto";
import React from "react";
import { Handle, Position } from "reactflow";

function OrganizationNode({
  data,
  isConnectable,
}: {
  data: OrganizationDto;
  isConnectable: boolean;
}) {
  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: "#0000cc" }}
        onConnect={(params) => console.log(params)}
        isConnectable={isConnectable}
      />
      <div>{data.name}</div>
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: "#cc0000" }}
        onConnect={(params) => console.log(params)}
        isConnectable={isConnectable}
      />
    </>
  );
}

export default React.memo(OrganizationNode);
