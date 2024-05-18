import {
  useGraphDispatchAndListener,
  useGraphListener,
} from "@/graph-tools/hooks/useGraphSelectiveContext";
import { MemoizedFunction } from "@/graph-tools/types/types";
import { GraphSelectiveContextKeys } from "@/graph-tools/hooks/graphSelectiveContextKeys";
import { undefinedEditNodeData } from "@/graph-tools/hooks/useNodeNameEditing";
import { OrganizationDto } from "@/app/demo/types/OrganizationDto";
import { ModalBody, ModalFooter, ModalHeader } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { ComponentUndefined } from "@/app/demo/react-flow/components/nodes/NodeDetailsModal";
import { ObjectPlaceholder } from "selective-context";
import FocusToEdit from "@/app/demo/react-flow/components/generic/FocusToEdit";

const listenerKey = "details-content";

export default function OrganizationDetailsContent({
  onClose,
}: {
  onClose: () => void;
}) {
  const {
    currentState: { memoizedFunction: commitEdit },
  } = useGraphListener<MemoizedFunction<OrganizationDto, void>>(
    GraphSelectiveContextKeys.editNodeData,
    listenerKey,
    undefinedEditNodeData,
  );
  const { dispatchWithoutControl, currentState } =
    useGraphDispatchAndListener<OrganizationDto>(
      GraphSelectiveContextKeys.nodeInModal,
      listenerKey,
      ObjectPlaceholder as OrganizationDto,
    );

  if (currentState === undefined)
    return <ComponentUndefined onClose={onClose} />;

  return (
    <>
      <ModalHeader className="flex flex-col gap-1">
        <FocusToEdit
          value={currentState.name}
          onValueChange={(value) =>
            dispatchWithoutControl((data) => ({ ...data, name: value }))
          }
        >
          {currentState.name}
        </FocusToEdit>
      </ModalHeader>
      <ModalBody>
        <FocusToEdit
          value={currentState.type.name}
          onValueChange={(value) =>
            dispatchWithoutControl((data) => ({
              ...data,
              type: { ...data.type, name: value },
            }))
          }
        >
          {currentState.type.name}
        </FocusToEdit>
      </ModalBody>
      <ModalFooter>
        <Button color="danger" variant="light" onPress={onClose}>
          Close
        </Button>
        <Button
          color="primary"
          onPress={() => {
            commitEdit(currentState);
            onClose();
          }}
        >
          Confirm Changes
        </Button>
      </ModalFooter>
    </>
  );
}
