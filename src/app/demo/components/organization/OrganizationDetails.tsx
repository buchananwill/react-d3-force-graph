'use client';

import {useNodeNameEditing} from "@/graph-tools/hooks/useNodeNameEditing";
import {Button} from "@nextui-org/button";
import {PencilSquareIcon} from "@heroicons/react/24/outline";
import RenameModal from "@/app/demo/components/RenameModal";
import {useDisclosure} from "@nextui-org/modal";
import React, {useCallback} from "react";
import {NodeDetailsProps} from "@/app/demo/components/details-component-context/nodeDetailsComponentContextCreator";
import {useGraphListener} from "@/graph-tools/hooks/useGraphSelectiveContext";
import {GraphSelectiveContextKeys} from "@/graph-tools/hooks/graphSelectiveContextKeys";

export const LeftCol =
    'text-xs w-full text-center h-full flex items-center justify-center';
export const CurriculumDetailsListenerKey = 'curriculum-details';

export default function OrganizationDetails({
                                                      node
                                                  }: NodeDetailsProps<any>): React.JSX.Element {
    const {id} = node;
    const componentListenerKey = `${CurriculumDetailsListenerKey}:${id}`;

    let {onClose, onOpen, isOpen} = useDisclosure();


    const {handleCancelRename, handleConfirmRename, contextKey} = useNodeNameEditing(
        node,
        componentListenerKey
    );

    const handleCancel = useCallback(() => {
        handleCancelRename()
        onClose()
    }, [onClose, handleCancelRename]);

    const handleConfirm = useCallback(() => {
        handleConfirmRename()
        onClose()
    }, [onClose, handleConfirmRename]);


    return (
        <div className={'mt-1'}>
            <div className={'grid grid-cols-6 gap-1 mb-1'}>
                <div className={LeftCol}>Block:</div>
                <div className={'col-start-2 col-span-5'}>
                    <Button className={'w-full '} onPress={onOpen} size={'sm'}>
                        <PencilSquareIcon className={'w-4 h-4'}></PencilSquareIcon>
                        {node.data.name}
                    </Button>
                </div>
            </div>
            <RenameModal onCancel={handleCancel} onConfirm={handleConfirm} isOpen={isOpen} onClose={onClose}
                         contextKey={contextKey} listenerKey={'modal'}/>
        </div>
    );
}
