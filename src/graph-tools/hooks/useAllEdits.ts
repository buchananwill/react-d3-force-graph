import { useAddNodes } from "@/graph-tools/editing/hooks/useAddNodes";
import { useAddLinks } from "@/graph-tools/editing/hooks/useAddLinks";
import { useDeleteLinks } from "@/graph-tools/editing/hooks/useDeleteLinks";
import { useDeleteNodes } from "@/graph-tools/editing/hooks/useDeleteNodes";
import { useEditNodeData } from "@/graph-tools/editing/hooks/useEditNodeData";

export function useAllEdits() {
  useAddNodes();
  useAddLinks();
  useDeleteLinks();
  useDeleteNodes();
  useEditNodeData();
}