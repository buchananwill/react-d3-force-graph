'use client';
import React, { FC, Fragment, PropsWithChildren } from 'react';

import { ChevronDownIcon } from '@heroicons/react/20/solid';

import SelectionOutline from '../../../graph-tools/components/SelectionOutline';
import {
  useNodeInteractionContext,
  useNodeSelectedListener
} from '@/graph-tools/nodes/NodeInteractionContext';
import { StarIcon as StarIconOutline } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';

import { Button } from '@nextui-org/button';
import { NodeDetailsUiComponentProps } from '@/app/demo/graphs/work-task-types/work-task-type-dto-details';
import {DataNode, HasNumberId} from "@/graph-tools/types/types";
import { Disclosure } from '@headlessui/react';

export function NodeDetailWrapper<T extends HasNumberId>({
  label,
  node,
  detailsUiComponent: Details
}: {
  label: string;
  node: DataNode<T>;
  detailsUiComponent?: FC<NodeDetailsUiComponentProps<T>>;
} & PropsWithChildren) {
  const { dispatch } = useNodeInteractionContext();
  const isSelected = useNodeSelectedListener(node.id);

  const handleDispatch = () => {
    dispatch({ type: 'toggleSelect', payload: node.id });
  };
  return (
    <Disclosure>
      {({ open }) => (
        <>
          <div className={'p-0.5'}>
            <SelectionOutline showOutline={isSelected}>
              <div className={'flex w-full items-center'}>
                <Button
                  onPress={() => handleDispatch()}
                  className={'border-0 m-0'}
                  isIconOnly
                >
                  {isSelected ? (
                    <StarIcon className={'h-4 w-4 fill-amber-300'}></StarIcon>
                  ) : (
                    <StarIconOutline className={'h-4 w-4'}></StarIconOutline>
                  )}
                </Button>
                <StandardDisclosureButton
                  open={open}
                  label={label}
                ></StandardDisclosureButton>
              </div>
            </SelectionOutline>
          </div>

          <Disclosure.Panel>
            {Details && <Details node={node} />}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

function StandardDisclosureButton({
  open,
  label
}: {
  open: boolean;
  label: string;
}) {
  return (
    <Disclosure.Button as={Fragment}>
      {({ open }) => (
        <Button
          color={`${open ? 'primary' : 'default'}`}
          className={`max-w-full w-[300px] grow flex justify-between`}
        >
          <span className={'w-5/6 h-fit leading-6 text-left truncate ...'}>
            {label}
          </span>
          <ChevronDownIcon
            className={`w-6 h-6 ${
              !open ? 'rotate-90 transform' : ''
            } transition-transform duration-500`}
          ></ChevronDownIcon>
        </Button>
      )}
    </Disclosure.Button>
  );
}
