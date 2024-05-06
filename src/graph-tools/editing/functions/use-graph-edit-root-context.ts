import { useSelectiveContextControllerNumber } from '../../../selective-context/components/typed/selective-context-manager-number';
import { useGraphSelectiveContextController } from '../../graph/graph-context-creator';
import { useSelectiveContextControllerNumberList } from '../../../selective-context/components/typed/selective-context-manager-number-list';
import { useDirectSimRefEditsController } from './use-graph-edit-button-hooks';
import { OrganizationDto } from '../../../api/dtos/OrganizationDtoSchema';
import { TransientIdOffset } from '../../../api/main';

const rootListenerKey = 'root-listener-key';
const transientLinkStaticArray: number[] = [];
const transientNodeStaticArray: number[] = [];
const deletedLinkStaticArray: number[] = [];
const deletedNodeStaticArray: number[] = [];
const dimensionsStaticArray: number[] = [1800, 1200];

export function useGraphEditRootContext() {
  useGraphSelectiveContextController(
    'nextLinkId',
    rootListenerKey,
    TransientIdOffset,
    useSelectiveContextControllerNumber
  );
  useGraphSelectiveContextController(
    'nextNodeId',
    rootListenerKey,
    TransientIdOffset,
    useSelectiveContextControllerNumber
  );
  useGraphSelectiveContextController(
    'transientLinkIds',
    rootListenerKey,
    transientLinkStaticArray,
    useSelectiveContextControllerNumberList
  );
  useGraphSelectiveContextController(
    'transientNodeIds',
    rootListenerKey,
    transientNodeStaticArray,
    useSelectiveContextControllerNumberList
  );
  useGraphSelectiveContextController(
    'deletedLinkIds',
    rootListenerKey,
    deletedLinkStaticArray,
    useSelectiveContextControllerNumberList
  );
  useGraphSelectiveContextController(
    'deletedNodeIds',
    rootListenerKey,
    deletedNodeStaticArray,
    useSelectiveContextControllerNumberList
  );
  useGraphSelectiveContextController(
    'dimensions',
    rootListenerKey,
    dimensionsStaticArray,
    useSelectiveContextControllerNumberList
  );

  useDirectSimRefEditsController<OrganizationDto>('root-graph-page');
}
