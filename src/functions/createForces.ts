import { getHorizontalParentsToChildrenLayout } from "../forces/forceX";
import { getModulusGridY } from "../forces/forceY";
import { getForceManyBody } from "../forces/forceManyBody";
import { getLinkForceMinCosFallOffBusiestNode } from "../forces/forceLink";
import * as d3 from "d3";
import { getForceCollide } from "../forces/forceCollide";
import { getForceRadial } from "../forces/forceRadial";
import { DataLink, DataNode, ForceOptions, HasNumberId } from "../types";
import { Forces } from "../types";
import { ForceAttributeListenersReturn } from "../types";

export function createForces<T extends HasNumberId>(
  forceAttributeListeners: ForceAttributeListenersReturn,
  width: number,
  height: number,
  links: DataLink<T>[],
  nodes: DataNode<T>[],
  forceOptions: ForceOptions,
): Forces {
  const {
    forceYStrengthNormalized,
    forceXStrengthNormalized,
    forceRadialStrengthNormalized,
    manyBodyStrengthNormalized,
    centerStrengthNormalized,
    collideStrengthNormalized,
    linkStrengthNormalized,
    manyBodyMinDistanceNormalized,
    manyBodyMaxDistanceNormalized,
    linkDistanceNormalized,
  } = forceAttributeListeners;

  const numberOfNodes = nodes.length;
  const spacingY = numberOfNodes > 0 ? (height / numberOfNodes) * 2 : 1;

  const forceX = forceOptions.forceX
    ? getHorizontalParentsToChildrenLayout(
        nodes,
        width,
        forceXStrengthNormalized,
      )
    : undefined;
  const forceY = forceOptions.forceY
    ? getModulusGridY(spacingY, height, () => forceYStrengthNormalized)
    : undefined;

  const manyBody = forceOptions.manyBody
    ? getForceManyBody(
        manyBodyMaxDistanceNormalized,
        manyBodyMinDistanceNormalized,
        () => manyBodyStrengthNormalized,
      )
    : undefined;

  const link = forceOptions.link
    ? getLinkForceMinCosFallOffBusiestNode(
        links,
        () => {
          return nodes.length;
        },
        linkStrengthNormalized,
        linkDistanceNormalized,
      )
    : undefined;

  const center = d3
    .forceCenter(width / 2, height / 2)
    .strength(centerStrengthNormalized);

  const collide = forceOptions.collide
    ? getForceCollide(20, collideStrengthNormalized)
    : undefined;

  const radial = forceOptions.radial
    ? getForceRadial(width, height, forceRadialStrengthNormalized)
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