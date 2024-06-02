import { describe, expect, it } from "vitest";
import { nodes } from "./__fixtures__/ForceClientWrapper";
import { deDuplicateNames, getNumberFromStringId } from "../src";

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

describe("Get number from string id", () => {
  it("should return a number from a simple number as string", () => {
    expect(getNumberFromStringId("1")).toBeTypeOf("number");
  });

  it("should return a number from a namespaced number id", () => {
    expect(getNumberFromStringId("namespace:1")).toBeTypeOf("number");
  });

  it("should throw an error when the string is not a namespaced number id", () => {
    expect(() => getNumberFromStringId("namespace:NaN")).toThrowError();
  });
});
