'use client';
import { DataNode } from '../../../api/zod-mods';
import React, { forwardRef, Fragment } from 'react';
import { CheckIcon, PencilSquareIcon } from '@heroicons/react/20/solid';
import { WorkProjectSeriesSchemaDto } from '../../../api/dtos/WorkProjectSeriesSchemaDtoSchema';
import { Listbox } from '@headlessui/react';
import { OrganizationDto } from '../../../api/dtos/OrganizationDtoSchema';

import { useNodeNameEditing } from '../../editing/functions/use-node-name-editing';
import { useSumAllSchemasMemo } from '../../../curriculum/delivery-models/functions/use-sum-all-schemas-memo';
import RenameModal from '../../../generic/components/modals/rename-modal';
import { Button, ButtonProps } from '@nextui-org/button';
import {
  useSelectiveContextAnyDispatch,
  useSelectiveContextGlobalListener
} from '../../../selective-context/components/global/selective-context-manager-global';
import { WorkSeriesBundleAssignmentDto } from '../../../api/dtos/WorkSeriesBundleAssignmentDtoSchema';
import { isNotUndefined, ObjectPlaceholder } from '../../../api/main';
import { useSelectiveContextListenerReadAll } from '../../../selective-context/components/base/generic-selective-context-creator';
import { SelectiveContextGlobal } from '../../../selective-context/components/global/selective-context-creator-global';
import { getNameSpacedKey } from '../../../selective-context/components/controllers/dto-id-list-controller';
import { WorkSeriesSchemaBundleDto } from '../../../api/dtos/WorkSeriesSchemaBundleDtoSchema';
import { getEntityNamespaceContextKey } from '../../../selective-context/hooks/dtoStores/get-entity-namespace-context-key';
import { EntityNamesMap } from '../../../api/entity-names-map';
import { useEntityListReader } from '../../../curriculum/delivery-models/[yearGroup]/useEntityListReader';
import { StringMap } from '../../../contexts/string-map-context/string-map';

export const LeftCol =
  'text-xs w-full text-center h-full flex items-center justify-center';
export const CurriculumDetailsListenerKey = 'curriculum-details';

export default function CurriculumDeliveryDetails({
  node
}: {
  node: DataNode<OrganizationDto>;
}) {
  const { id } = node;
  const componentListenerKey = `${CurriculumDetailsListenerKey}:${id}`;

  const { currentState, dispatchWithoutControl: updateAssignment } =
    useSelectiveContextAnyDispatch<WorkSeriesBundleAssignmentDto>({
      contextKey: getEntityNamespaceContextKey(
        'workSeriesBundleAssignment',
        node.data.workSeriesBundleAssignmentId
      ),
      listenerKey: componentListenerKey,
      initialValue: ObjectPlaceholder as WorkSeriesBundleAssignmentDto
    });

  const schemaIdList: string[] =
    currentState.workSeriesSchemaBundle.workProjectSeriesSchemaIds;

  const selectiveContextReadAll =
    useSelectiveContextListenerReadAll<WorkProjectSeriesSchemaDto>(
      SelectiveContextGlobal
    );

  const workSeriesSchemaBundleDtos =
    useEntityListReader<WorkSeriesSchemaBundleDto>(
      EntityNamesMap.workSeriesSchemaBundle,
      componentListenerKey
    );

  const schemaList = schemaIdList
    .map((id) => getEntityNamespaceContextKey('workProjectSeriesSchema', id))
    .map(selectiveContextReadAll)
    .filter(isNotUndefined);

  const { openModal, renameModalProps } = useNodeNameEditing(
    node,
    componentListenerKey
  );
  const bundleRowSpan = `span ${Math.max(schemaList.length, 1) + 1}`;

  const totalAllocation = useSumAllSchemasMemo(schemaList);

  const elements = schemaList.map((workProjectSeriesSchema) => {
    return (
      <CourseSummary
        key={`${node.data.id}-${workProjectSeriesSchema.id}`}
        course={workProjectSeriesSchema}
      />
    );
  });

  const handleAssignmentChange = (bundleID: number) => {
    const find = workSeriesSchemaBundleDtos.find(
      (bundle) => bundle.id === bundleID
    );
    if (find === undefined) throw new Error('bundle missing');
    updateAssignment((assignment) => ({
      ...assignment,
      workSeriesSchemaBundle: find
    }));
  };

  return (
    <div className={'mt-1'}>
      <div className={'grid grid-cols-6 gap-1 mb-1'}>
        <div className={LeftCol}>Block:</div>
        <div className={'col-start-2 col-span-5'}>
          <Button className={'w-full '} onClick={openModal} size={'sm'}>
            <PencilSquareIcon className={'w-4 h-4'}></PencilSquareIcon>
            {node.data.name} - Total Periods: {totalAllocation}
          </Button>
        </div>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(6, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${
            Math.max(elements.length, 1) + 1
          }, minmax(0, 1fr))`,
          marginBottom: '0.25rem'
        }}
      >
        <div
          className={LeftCol}
          style={{
            gridRow: bundleRowSpan
          }}
        >
          Bundle:
        </div>
        <div
          style={{
            gridColumn: `span 5`,
            gridRow: bundleRowSpan
          }}
        >
          <Listbox
            value={currentState?.workSeriesSchemaBundle?.id}
            onChange={handleAssignmentChange}
          >
            <Listbox.Button as={NodeDetailsListBoxButton}>
              <div className={' w-full '}>
                <table className={'text-left table-fixed max-w-full'}>
                  <thead className={'text-sm border-b-2 text-center'}>
                    <tr className={'text-xs'}>
                      <th>Periods</th>
                      <th>Item</th>
                    </tr>
                  </thead>
                  <tbody>{...elements}</tbody>
                </table>
              </div>
            </Listbox.Button>
            <Listbox.Options as={NodeDetailsListBoxOptions}>
              {workSeriesSchemaBundleDtos.map((bundle) => (
                <Listbox.Option
                  value={bundle.id}
                  key={`bundle-${bundle.id}`}
                  as={Fragment}
                >
                  {({ selected, active }) => (
                    <NodeDetailsListBoxOption
                      selected={selected}
                      active={active}
                    >
                      Bundle {bundle.name}
                    </NodeDetailsListBoxOption>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Listbox>
        </div>
      </div>
      <RenameModal {...renameModalProps} />
    </div>
  );
}

function CourseSummary({
  course
}: {
  course: WorkProjectSeriesSchemaDto;
}): React.JSX.Element {
  return (
    <tr className={'text-xs border-b last:border-0 text-left'}>
      <td>
        {course.deliveryAllocations
          .map((da) => da.count * da.deliveryAllocationSize)
          .reduce((prev, curr) => prev + curr, 0)}
      </td>
      <td>
        <span className={'truncate w-[240px] max-w-[240px] inline-block'}>
          {course.name}
        </span>
      </td>
    </tr>
  );
}

export const NodeDetailsListBoxButton = forwardRef(
  function NodeDetailsListBoxButton(
    { children, ...props }: Omit<ButtonProps, 'className'>,
    ref: React.ForwardedRef<HTMLButtonElement>
  ) {
    return (
      <Button
        className={
          'w-full h-full relative px-1 text-xs text-left overflow-ellipsis'
        }
        radius={'sm'}
        {...props}
        ref={ref}
      >
        {children}
      </Button>
    );
  }
);

type GenericUListProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLUListElement>,
  HTMLUListElement
>;
type GenericLIProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLLIElement>,
  HTMLLIElement
>;

export type optionsWidth = 'w-48' | 'w-60' | 'w-72' | 'w-96';

export const NodeDetailsListBoxOptions = forwardRef(
  function NodeDetailsListBoxOptions(
    {
      children,
      optionsWidth = 'w-72',
      ...props
    }: Omit<GenericUListProps, 'className'> & { optionsWidth?: optionsWidth },
    ref: React.ForwardedRef<HTMLUListElement>
  ) {
    return (
      <div className={optionsWidth + ' absolute z-10 pt-2'}>
        <ul
          className={
            ' bg-gray-50 bottom drop-shadow-xl rounded-lg p-1 max-h-60 overflow-auto'
          }
          {...props}
          ref={ref}
        >
          {children}
        </ul>
      </div>
    );
  }
);

export const NodeDetailsListBoxOption = forwardRef(
  function NodeDetailsListBoxOption(
    {
      children,
      active,
      selected,
      disabled,
      ...props
    }: Omit<GenericLIProps, 'className'> & {
      active?: boolean;
      selected?: boolean;
      disabled?: boolean;
    },
    ref: React.ForwardedRef<HTMLLIElement>
  ) {
    return (
      <li
        className={`w-full grid grid-cols-6 items-center cursor-pointer ${
          active ? 'bg-emerald-300' : ''
        }`}
        {...props}
        ref={ref}
      >
        {' '}
        <span className={'flex justify-center w-full'}>
          {selected ? <CheckIcon className={'w-5 h-5 '}></CheckIcon> : null}
        </span>
        <span className={'col-span-5'}>{children}</span>
      </li>
    );
  }
);
