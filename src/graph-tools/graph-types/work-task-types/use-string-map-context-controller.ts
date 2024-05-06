import {
  getIdListContextKey,
  getNameSpacedKey
} from '../../../selective-context/components/controllers/dto-id-list-controller';

import { SelectiveContextGlobal } from '../../../selective-context/components/global/selective-context-creator-global';
import { useMemo } from 'react';
import { EmptyArray, isNotUndefined } from '../../../api/main';
import { getEntityNamespaceContextKey } from '../../../selective-context/hooks/dtoStores/get-entity-namespace-context-key';
import {
  useSelectiveContextGlobalController,
  useSelectiveContextGlobalListener,
  useSelectiveContextListenerReadAll
} from 'selective-context';
import { StringMap } from '../../../contexts/string-map-context/string-map';

export function useStringMapContextController<T, U extends string | number>(
  entityName: string,
  listenerKey: string
) {
  const { currentState: idList } = useSelectiveContextGlobalListener<U[]>({
    contextKey: getIdListContextKey(entityName),
    listenerKey: listenerKey,
    initialValue: EmptyArray
  });

  const selectiveContextReadAll = useSelectiveContextListenerReadAll(
    SelectiveContextGlobal
  );

  const stringMap = useMemo(() => {
    return idList
      .map((id) =>
        selectiveContextReadAll(getEntityNamespaceContextKey(entityName, id))
      )
      .filter(isNotUndefined)
      .reduce((prev, curr) => {
        const next = { ...prev };
        next[curr.id] = curr;
        return next;
      }, {});
  }, [idList, selectiveContextReadAll, entityName]);

  const nameSpacedKey = getNameSpacedKey(entityName, 'stringMap');

  return useSelectiveContextGlobalController<StringMap<T>>({
    contextKey: nameSpacedKey,
    listenerKey: listenerKey,
    initialValue: stringMap
  });
}
