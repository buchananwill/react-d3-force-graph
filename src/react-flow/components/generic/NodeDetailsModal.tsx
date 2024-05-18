import { Modal, ModalContent, ModalProps } from "@nextui-org/modal";
import {
  useGraphDispatchAndListener,
  useGraphListener,
} from "@/graph-tools/hooks/useGraphSelectiveContext";
import { GraphSelectiveContextKeys } from "@/graph-tools/hooks/graphSelectiveContextKeys";
import { MemoizedFunction } from "@/graph-tools/types/types";
import { ReactNode } from "react";

export type NodeDetailsModalProps = Omit<
  ModalProps,
  "onOpenChange" | "isOpen" | "scrollBehavior" | "children"
>;

const listenerKey = "modal";
export default function NodeDetailsModal<T>(
  nodeDetailsModalProps: NodeDetailsModalProps,
) {
  const { currentState: isOpen, dispatchWithoutControl: onOpenChange } =
    useGraphDispatchAndListener(
      GraphSelectiveContextKeys.nodeDetailsModalOpen,
      listenerKey,
      false,
    );

  const {
    currentState: { memoizedFunction: NodeModalContent },
  } = useGraphListener<MemoizedFunction<{ onClose: () => void }, ReactNode>>(
    GraphSelectiveContextKeys.nodeModalContent,
    listenerKey,
    fallback,
  );

  return (
    <Modal
      {...nodeDetailsModalProps}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      scrollBehavior={"inside"}
    >
      <ModalContent className={"p-2"}>
        {(onClose) => (
          <>
            {NodeModalContent === undefined ? (
              <ComponentUndefined onClose={onClose} />
            ) : (
              <NodeModalContent onClose={onClose} />
            )}
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

// eslint-disable-next-line no-unused-vars
export function ComponentUndefined(props: { onClose: () => void }): ReactNode {
  return <p className={"p-2"}>Content undefined...</p>;
}

export const fallback = { memoizedFunction: ComponentUndefined };
