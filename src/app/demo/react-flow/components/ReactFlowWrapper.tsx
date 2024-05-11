'use client'
import React, {useState} from 'react';
import {Background, BackgroundVariant, Controls, MiniMap, Panel, ReactFlowProvider,} from 'reactflow';

import 'reactflow/dist/style.css';
import graphDto from '@/app/demo/data/graphDto.json'
import {convertDataLinkListToEdgeList, convertDataNodeListToNodeList} from "@/app/demo/react-flow/utils/adaptors";
import {LayoutFlowWithForces} from "@/app/demo/react-flow/components/LayoutFlowWithForces";
import {Card, CardBody, CardHeader} from "@nextui-org/card";
import GraphForceSliders from "@/graph-tools/components/GraphForceSliders";
import {Button} from "@nextui-org/button";
import {ChevronLeftIcon} from "@heroicons/react/24/solid";

export const initialNodes = convertDataNodeListToNodeList(graphDto.nodes)
export const initialEdges = convertDataLinkListToEdgeList(graphDto.closureDtos)


export default function ReactFlowWrapper() {
    const [showSliders, setShowSliders] = useState(false)

    return (
        <div style={{width: '100vw', height: '100vh'}}>
            <ReactFlowProvider>
                <LayoutFlowWithForces
                >
                    <Controls/>
                    <MiniMap/>
                    <Background variant={BackgroundVariant.Dots} gap={12} size={1}/>
                    <Panel position={'top-left'}>
                        <Card classNames={{base: 'w-56'}}>
                            <CardHeader className={'p-0'}>
                                <Button
                                    className={'w-full relative'}
                                    variant={'light'}
                                    onPress={() => setShowSliders(show => !show)}
                                >
                                    Forces <ChevronLeftIcon className={`p-1 absolute right-2 transition-transform ${showSliders ? '-rotate-90' : ''}`}/>
                                </Button>
                            </CardHeader>
                            <CardBody className={`${showSliders ? 'h-fit': 'h-0 overflow-hidden p-0'}`}>
                                <GraphForceSliders/>
                            </CardBody>
                        </Card>
                    </Panel>
                </LayoutFlowWithForces>
            </ReactFlowProvider>
        </div>
    );
}