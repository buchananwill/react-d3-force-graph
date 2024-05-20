import * as D3 from "d3";
import { Simulation } from "d3";
import { DataLink, DataNode } from "../types";
import * as d3 from "d3";
import { updateForce } from "./updateForce";

export function getForceCollide(radius: number, strength: number) {
  return D3.forceCollide(radius).strength(strength);
}

export function updateCollideForce(
  currentSim: Simulation<DataNode<any>, DataLink<any>>,
  forceCollideStrength: number,
) {
  function consumerCollide(collideDefined: d3.ForceCollide<DataNode<any>>) {
    collideDefined.strength(forceCollideStrength);
  }
  updateForce(currentSim, "collide", consumerCollide);
}
