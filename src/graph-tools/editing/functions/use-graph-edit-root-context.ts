import { useSelectiveContextControllerNumber } from '../../../selective-context/components/typed/selective-context-manager-number';
import { useGraphController } from '../../graph/graph-context-creator';
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
  useGraphController('nextLinkId', rootListenerKey, TransientIdOffset);
  useGraphController('nextNodeId', rootListenerKey, TransientIdOffset);
  useGraphController('transientLinkIds', rootListenerKey, transientLinkStaticArray);
  useGraphController('transientNodeIds', rootListenerKey, transientNodeStaticArray);
  useGraphController('deletedLinkIds', rootListenerKey, deletedLinkStaticArray);
  useGraphController('deletedNodeIds', rootListenerKey, deletedNodeStaticArray);
  useGraphController('dimensions', rootListenerKey, dimensionsStaticArray);

  useDirectSimRefEditsController<OrganizationDto>('root-graph-page');
}
