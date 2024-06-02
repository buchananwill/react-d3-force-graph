import { describe, expect, it } from "vitest";
import { nodes } from "./__fixtures__/ForceClientWrapper";
import { deDuplicateNames } from "../src";

describe("Name De-duplicator", () => {
  it("should replace all duplicate names with unique ones.", () => {
    const dataNamedDuplicate = nodes.map((nodeItem) => ({
      ...nodeItem.data,
      name: "duplicate",
    }));
    const initialNameSet = dataNamedDuplicate
      .map((dataItem) => dataItem.name)
      .reduce((prev, curr) => prev.add(curr), new Set<string>());
    expect(initialNameSet.size).toBe(1);

    const deDuplicatedData = deDuplicateNames(dataNamedDuplicate);
    expect(deDuplicatedData.length).toEqual(dataNamedDuplicate.length);
    const newNameSet = deDuplicatedData
      .map((dataItem) => dataItem.name)
      .reduce((prev, curr) => prev.add(curr), new Set<string>());
    expect(newNameSet.size).toEqual(deDuplicatedData.length);
  });
});
