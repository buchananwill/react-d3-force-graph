import { useAddLinks, useAddNodes, useDeleteLinks, useDeleteNodes, useEditNodeData } from "../editing";


export function useAllEdits() {
  useAddNodes();
  useAddLinks();
  useDeleteLinks();
  useDeleteNodes();
  useEditNodeData();
}