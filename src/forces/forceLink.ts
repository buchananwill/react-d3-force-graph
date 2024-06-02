import * as D3 from "d3";
import * as d3 from "d3";
import { Simulation, SimulationLinkDatum } from "d3";

import { DataLink, DataNode, HasNumberId } from "../types";
import { updateForce } from "./updateForce";

export function getCosFallOffFunction<T extends HasNumberId>(
  numberOfNodes: number,
) {
  return (l: SimulationLinkDatum<DataNode<T>>) => {
    const dLink = l as DataLink<T>;
    const source = dLink.source as DataNode<T>;
    return (
      0.05 +
      0.05 *
        ((1 + Math.cos((source?.index ?? 0 / numberOfNodes) * Math.PI)) / 2)
    );
  };
}

function matchTarget(node: DataNode<HasNumberId>) {
  return (link: DataLink<HasNumberId>) =>
    (link.target as DataNode<HasNumberId>).id == node.id;
}

function matchSource(node: DataNode<HasNumberId>) {
  return (link: DataLink<HasNumberId>) =>
    (link.source as DataNode<HasNumberId>).id == node.id;
}

export function getBusiestNodeFunction<T extends HasNumberId>(base: number) {
  return (
    l: SimulationLinkDatum<DataNode<T>>,
    _index: number,
    links: SimulationLinkDatum<DataNode<T>>[],
  ) => {
    const dLink = l as DataLink<T>;
    const linksFromSource = matchSource(dLink.source as DataNode<T>);
    const linksToSource = matchTarget(dLink.source as DataNode<T>);
    const linksFromTarget = matchSource(dLink.target as DataNode<T>);
    const linksToTarget = matchTarget(dLink.target as DataNode<T>);
    const sourceToAndFrom = (l: SimulationLinkDatum<DataNode<T>>) =>
      linksFromSource(l as DataLink<T>) || linksToSource(l as DataLink<T>);
    const targetToOrFrom = (l: SimulationLinkDatum<DataNode<T>>) =>
      linksFromTarget(l as DataLink<T>) || linksToTarget(l as DataLink<T>);
    const sourceCrowding = links.filter(sourceToAndFrom).length;
    const targetCrowding = links.filter(targetToOrFrom).length;
    const busiestNode = Math.max(targetCrowding, sourceCrowding);
    return base === 0 ? 0 : Math.pow(base, busiestNode);
  };
}

function getBusiestNodeFallOffFunction<T extends HasNumberId>(
  numberOfNodes: number,
  baseStrength: number,
) {
  return (l: DataLink<T>, i: number, links: DataLink<T>[]) => {
    const cosFallOffFunction = getCosFallOffFunction(numberOfNodes);
    const busiestNodeFunction = getBusiestNodeFunction(baseStrength);
    return Math.min(cosFallOffFunction(l), busiestNodeFunction(l, i, links));
  };
}

export function getLinkForceMinCosFallOffBusiestNode(
  linksMutable: DataLink<HasNumberId>[],
  numberOfNodes: () => number,
  strengthFactor: number,
  distance: number,
) {
  return D3.forceLink(linksMutable)
    .id((d) => (d as DataNode<HasNumberId>).id)
    .distance(distance)
    .strength(getBusiestNodeFallOffFunction(numberOfNodes(), strengthFactor));
}

export function updateLinkForce<T extends HasNumberId>(
  current: Simulation<DataNode<T>, DataLink<T>>,
  linkStrength: number,
  linkDistance: number,
) {
  function consumerOfLinkForce(force: d3.ForceLink<DataNode<T>, DataLink<T>>) {
    const busiestNodeFallOffFunction = getBusiestNodeFallOffFunction(
      current.nodes().length,
      linkStrength,
    );
    force.strength(busiestNodeFallOffFunction);
    force.distance(linkDistance);
  }
  updateForce(current, "link", consumerOfLinkForce);
}
