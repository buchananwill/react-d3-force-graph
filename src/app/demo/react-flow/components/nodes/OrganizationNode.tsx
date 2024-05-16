import { OrganizationDto } from "@/app/demo/types/OrganizationDto";
import { Button } from "@nextui-org/button";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
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
      <div className="border border-black p-2 rounded-md bg-white flex flex-col">
        {data.name}
        <Popover>
          <PopoverTrigger>
            <Button size={"sm"}>Details</Button>
          </PopoverTrigger>
          <PopoverContent>{data.type.name}</PopoverContent>
        </Popover>
      </div>
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
