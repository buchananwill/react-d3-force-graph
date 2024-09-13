import { getDepthGridX } from "../forces/forceX";
import { getDepthGridY } from "../forces/forceY";
import { getForceManyBody } from "../forces/forceManyBody";
import { getLinkForceMinCosFallOffBusiestNode } from "../forces/forceLink";
import { getForceCollide } from "../forces/forceCollide";
import { getForceRadial } from "../forces/forceRadial";
import {
  DataLink,
  DataNode,
  ForceAttributeKey,
  ForceKey,
  ForceKeys,
  ForceOptions,
  Forces,
  HasNumberId,
} from "../types";
import { getForceCenter } from "../forces/forceCenter";

type D3Force<T extends HasNumberId> = d3.Force<DataNode<T>, DataLink<T>>;

export function createForces<T extends HasNumberId>(
  forceAttributeMap: (key: ForceAttributeKey) => number,
  width: number,
  height: number,
  links: DataLink<T>[],
  nodes: DataNode<T>[],
  forceOptions: ForceOptions,
  overrideForces: Forces,
): Forces {
  const defaultForceGetters: { [K in ForceKey]: () => D3Force<T> } = {
    forceX: () =>
      getDepthGridX(
        forceAttributeMap("forceXStrength"),
        () => forceAttributeMap("forceXStrength"),
        width,
      ),
    forceY: () =>
      getDepthGridY(
        forceAttributeMap("forceYSpacing"),
        () => forceAttributeMap("forceYStrength"),
        height,
      ),
    manyBody: () =>
      getForceManyBody(
        forceAttributeMap("manyBodyMaxDistance"),
        forceAttributeMap("manyBodyMinDistance"),
        () => forceAttributeMap("manyBodyStrength"),
      ),
    link: () =>
      getLinkForceMinCosFallOffBusiestNode(
        links,
        () => {
          return nodes.length;
        },
        forceAttributeMap("linkStrength"),
        forceAttributeMap("linkDistance"),
      ),
    center: () =>
      getForceCenter(width, height, forceAttributeMap("centerStrength")),
    collide: () => getForceCollide(20, forceAttributeMap("collideStrength")),
    radial: () =>
      getForceRadial(width, height, forceAttributeMap("forceRadialStrength")),
  };

  const getForce = (forceKey: ForceKey) => {
    if (forceOptions[forceKey]) {
      return overrideForces[forceKey] ?? defaultForceGetters[forceKey]();
    } else return undefined;
  };

  const forcesEntryList = Object.entries(ForceKeys).map(([, value]) => [
    value,
    getForce(value),
  ]);
  const forces = Object.fromEntries(forcesEntryList) as Forces;

  return {
    ...forces,
  };
}
