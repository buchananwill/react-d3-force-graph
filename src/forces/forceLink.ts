 
import * as D3 from "d3";
import * as d3 from "d3";
import { Simulation, SimulationLinkDatum } from "d3";

import { DataLink, DataNode, HasNumberId } from "../types";
import { updateForce } from "./updateForce";

export function getCosFallOffFunction(numberOfNodes: number) {
  return (
    l: SimulationLinkDatum<DataNode<any>>,
    i: number,
    links: DataLink<any>[],
  ) => {
    const dLink = l as DataLink<any>;
    const source = dLink.source as DataNode<any>;
    return (
      0.05 +
      0.05 * ((1 + Math.cos((source.index! / numberOfNodes) * Math.PI)) / 2)
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

function countConnections(
  link: DataLink<HasNumberId>,
  links: DataLink<HasNumberId>[],
) {
  const predicateTarget = matchTarget(link.target as DataNode<HasNumberId>);
  const predicateSource = matchSource(link.source as DataNode<HasNumberId>);
  const combined = (link: DataLink<HasNumberId>) =>
    predicateTarget(link) || predicateSource(link);
  return links.filter(combined).length;
}

export function getBusiestNodeFunction(base: number) {
  return (
    l: SimulationLinkDatum<DataNode<any>>,
    index: number,
    links: SimulationLinkDatum<DataNode<any>>[],
  ) => {
    const dLink = l as DataLink<any>;
    const linksFromSource = matchSource(dLink.source as DataNode<any>);
    const linksToSource = matchTarget(dLink.source as DataNode<any>);
    const linksFromTarget = matchSource(dLink.target as DataNode<any>);
    const linksToTarget = matchTarget(dLink.target as DataNode<any>);
    const sourceToAndFrom = (l: SimulationLinkDatum<DataNode<any>>) =>
      linksFromSource(l as DataLink<any>) || linksToSource(l as DataLink<any>);
    const targetToOrFrom = (l: SimulationLinkDatum<DataNode<any>>) =>
      linksFromTarget(l as DataLink<any>) || linksToTarget(l as DataLink<any>);
    const sourceCrowding = links.filter(sourceToAndFrom).length;
    const targetCrowding = links.filter(targetToOrFrom).length;
    const busiestNode = Math.max(targetCrowding, sourceCrowding);
    return base === 0 ? 0 : Math.pow(base, busiestNode);
  };
}

function getBusiestNodeFallOffFunction(
  numberOfNodes: number,
  baseStrength: number,
) {
  return (
    l: SimulationLinkDatum<any>,
    i: number,
    links: SimulationLinkDatum<any>[],
  ) => {
    const cosFallOffFunction = getCosFallOffFunction(numberOfNodes);
    const busiestNodeFunction = getBusiestNodeFunction(baseStrength);
    return Math.min(
      cosFallOffFunction(l, i, links as DataLink<any>[]),
      busiestNodeFunction(l, i, links),
    );
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
