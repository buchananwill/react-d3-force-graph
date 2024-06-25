import { getHorizontalParentsToChildrenLayout } from "../forces/forceX";
import { getModulusGridY } from "../forces/forceY";
import { getForceManyBody } from "../forces/forceManyBody";
import { getLinkForceMinCosFallOffBusiestNode } from "../forces/forceLink";
import { getForceCollide } from "../forces/forceCollide";
import { getForceRadial } from "../forces/forceRadial";
import {
  DataLink,
  DataNode,
  ForceAttributeKey,
  ForceOptions,
  Forces,
  HasNumberId,
} from "../types";
import { getForceCenter } from "../forces/forceCenter";

export function createForces<T extends HasNumberId>(
  forceAttributeMap: (key: ForceAttributeKey) => number,
  width: number,
  height: number,
  links: DataLink<T>[],
  nodes: DataNode<T>[],
  forceOptions: ForceOptions,
): Forces {
  const forceX = forceOptions.forceX
    ? getHorizontalParentsToChildrenLayout(
        nodes,
        width,
        forceAttributeMap("forceXStrength"),
      )
    : undefined;
  const forceY = forceOptions.forceY
    ? getModulusGridY(
        forceAttributeMap("forceYSpacing"),
        () => forceAttributeMap("forceYStrength"),
        height,
      )
    : undefined;

  const manyBody = forceOptions.manyBody
    ? getForceManyBody(
        forceAttributeMap("manyBodyMaxDistance"),
        forceAttributeMap("manyBodyMinDistance"),
        () => forceAttributeMap("manyBodyStrength"),
      )
    : undefined;

  const link = forceOptions.link
    ? getLinkForceMinCosFallOffBusiestNode(
        links,
        () => {
          return nodes.length;
        },
        forceAttributeMap("linkStrength"),
        forceAttributeMap("linkDistance"),
      )
    : undefined;

  const center = forceOptions.center
    ? getForceCenter(width, height, forceAttributeMap("centerStrength"))
    : undefined;

  const collide = forceOptions.collide
    ? getForceCollide(20, forceAttributeMap("collideStrength"))
    : undefined;

  const radial = forceOptions.radial
    ? getForceRadial(width, height, forceAttributeMap("forceRadialStrength"))
    : undefined;

  return {
    forceX,
    forceY,
    center,
    manyBody,
    collide,
    link,
    radial,
  };
}
