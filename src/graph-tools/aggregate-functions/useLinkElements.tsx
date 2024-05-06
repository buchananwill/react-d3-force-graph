
import { LinkComponent } from '../links/LinkComponent';
import React, {useMemo} from 'react';
import {DataLink, HasNumberId} from "@/graph-tools/types/types";


export function useLinkElements<T extends HasNumberId>(
  links: DataLink<T>[]
) {
  return useMemo(() => {
    console.log('rendering link components')
    return links.map((l, index) => (
        <LinkComponent key={`link-${l.id}`} linkData={l} linkIndex={index}/>))
  }, [links]);
}
