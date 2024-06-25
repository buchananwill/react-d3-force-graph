import { CallbackData } from "./__fixtures__/ForceClient";
import { Organization } from "./__fixtures__/adaptors";
import { describe, expect, it, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import {
  DataNode,
  ForceGraphPageOptions,
  GraphDtoPutRequestBody,
} from "../src";
import { act } from "@testing-library/react";
import { setupRender } from "./SetupRender";
import { linksDto, nodesDto } from "./__fixtures__/ForceClientWrapper";
import {
  DirectConnectionDistance,
  getClosurePredicate,
} from "../src/functions/useFilteredLinkMemo";
import { revalidateOrganizationNode } from "./__fixtures__/DataNodeDtoSchema";
import { reMapAndValidateLinkToClosure } from "./__fixtures__/ClosureDtoSchema";

const options: ForceGraphPageOptions = {
  forceSlidersVisibleInitial: {
    manyBodyTheta: false,
    forceRadialXRelative: false,
    forceRadialYRelative: false,
    centerStrength: false,
  },
  forceAttributesInitial: {
    forceYStrength: 50,
    linkStrength: 50,
    linkDistance: 150,
  },
  forces: {
    link: true,
    manyBody: true,
    collide: true,
    center: true,
    radial: true,
    forceY: true,
    forceX: true,
  },
};

describe("ForceGraphPage", () => {
  const props: Partial<CallbackData<Organization>> = {};
  const spy = (data: CallbackData<Organization>) => {
    Object.assign(props, data);
  };
  const spyOnCallback = vi.fn(spy);

  it("should call the spy with the retrieved graph data", () => {
    setupRender({ callback: spy });

    const { dispatchReturn, simRefFromMemo, listenerKey } = props;
    expect(dispatchReturn).toBeDefined();
    expect(dispatchReturn?.simRef).toBeDefined();
    expect(dispatchReturn?.simRef?.current).toEqual(simRefFromMemo?.current);
    const listenerKeyString = listenerKey?.current;
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    expect(uuidRegex.test(listenerKeyString ?? "")).toBe(true);
  });
  it("should tick the simulation", () => {
    setupRender({ callback: spy, options });

    const { simRefFromMemo } = props;
    const tick = simRefFromMemo?.current?.tick();

    expect(tick).toEqual(simRefFromMemo?.current);
  });

  it("should create a child node", async () => {
    setupRender({ callback: spy, options });

    const { dispatchReturn, addNodes } = props;
    expect(addNodes).toBeDefined();

    const nodeArray = dispatchReturn?.nodeListRef?.current;
    const initialNodeArray = nodeArray ? [...nodeArray] : [];

    const first = dispatchReturn?.nodeListRef?.current[0];
    if (addNodes && first)
      act(() =>
        addNodes.memoizedFunction({
          sourceNodeIdList: [first.id],
          relation: "child",
        }),
      );
    const laterNodeArray = dispatchReturn?.nodeListRef?.current;
    expect(initialNodeArray?.length).toEqual((laterNodeArray?.length ?? 0) - 1);
    if (laterNodeArray) {
      const firstNode = laterNodeArray[0];
      const lastNode = laterNodeArray[laterNodeArray.length - 1];
      const find = dispatchReturn?.linkListRef?.current.find((link) => {
        return (
          (link.source as DataNode<Organization>).id === firstNode.id &&
          (link.target as DataNode<Organization>).id === lastNode.id
        );
      });
      expect(find).toBeDefined(); // I.e. we should have a link that has the first node as parent, and last node (new) as child.
    }
  });

  it("should create a child node of the child", async () => {
    setupRender({ callback: spy, options });

    const { dispatchReturn, addNodes } = props;

    const nodeArray = dispatchReturn?.nodeListRef?.current;
    const initialNodeArray = nodeArray ? [...nodeArray] : [];

    const first = dispatchReturn?.nodeListRef?.current[0];
    if (addNodes && first) {
      act(() =>
        addNodes.memoizedFunction({
          sourceNodeIdList: [first.id],
          relation: "child",
        }),
      );
      const laterNodeArray = dispatchReturn?.nodeListRef?.current;
      expect(initialNodeArray?.length).toEqual(
        (laterNodeArray?.length ?? 0) - 1,
      );
      if (laterNodeArray) {
        const lastNode = laterNodeArray[laterNodeArray.length - 1];
        act(() =>
          addNodes.memoizedFunction({
            sourceNodeIdList: [lastNode.id],
            relation: "child",
          }),
        );
        const find = dispatchReturn?.linkListRef?.current.find((link) => {
          return (link.source as DataNode<Organization>).id === lastNode.id;
        });
        expect(find).toBeDefined(); // I.e. we should have a link that has the first node as parent, and last node (new) as child.
      }
    }
  });

  it("should delete a node", async () => {
    setupRender({ callback: spy, options });

    const { dispatchReturn, deleteNodes } = props;
    expect(deleteNodes).toBeDefined();

    const nodeArray = dispatchReturn?.nodeListRef?.current;
    const initialNodeArray = nodeArray ? [...nodeArray] : [];

    const first = dispatchReturn?.nodeListRef?.current[0];
    if (deleteNodes && first)
      act(() => deleteNodes.memoizedFunction([first.id]));
    const laterNodeArray = dispatchReturn?.nodeListRef?.current;
    expect(laterNodeArray?.length).toEqual((initialNodeArray?.length ?? 0) - 1);
  });

  it("should delete two nodes", async () => {
    setupRender({ callback: spy, options });

    const { dispatchReturn, deleteNodes } = props;

    const nodeArray = dispatchReturn?.nodeListRef?.current;
    const initialNodeArray = nodeArray ? [...nodeArray] : [];

    const nodeIdList = dispatchReturn?.nodeListRef?.current
      ?.slice(0, 2)
      .map((node) => node.id);

    expect(nodeIdList).toBeDefined();
    expect(nodeIdList?.length).toBeGreaterThan(0);

    if (deleteNodes && nodeIdList)
      act(() => deleteNodes.memoizedFunction(nodeIdList));
    const laterNodeArray = dispatchReturn?.nodeListRef?.current;
    expect(laterNodeArray?.length).toEqual(
      (initialNodeArray?.length ?? 0) - (nodeIdList?.length ?? 0),
    );
  });

  /**
   * Sibling is defined as "every parent of node A, is a parent of node B"
   * */
  it("should create a sibling node", async () => {
    setupRender({ callback: spy, options });

    const { dispatchReturn, addNodes } = props;
    expect(addNodes?.memoizedFunction).toBeDefined();
    const initialNodeArray = dispatchReturn?.nodeListRef?.current;
    const linkArray = dispatchReturn?.linkListRef?.current;
    const firstLink = linkArray && linkArray[0];
    const childOfFirstLink = firstLink?.target;
    const childId =
      typeof childOfFirstLink === "object"
        ? childOfFirstLink.id
        : `${childOfFirstLink}`;

    if (addNodes && childOfFirstLink)
      act(() =>
        addNodes.memoizedFunction({
          sourceNodeIdList: [childId],
          relation: "sibling",
        }),
      );
    const laterNodeArray = dispatchReturn?.nodeListRef?.current;
    expect(laterNodeArray?.length).toEqual((initialNodeArray?.length ?? 0) + 1);
    if (laterNodeArray) {
      const oldNode = laterNodeArray.find((node) => node.id === childId);
      const newNode = laterNodeArray[laterNodeArray.length - 1];

      const parentsOfOld = dispatchReturn?.linkListRef?.current
        .filter(
          (link) => (link.target as DataNode<Organization>).id === oldNode?.id,
        )
        .map((link) => link.source);
      const parentsOfNew = dispatchReturn?.linkListRef?.current
        .filter(
          (link) => (link.target as DataNode<Organization>).id === newNode?.id,
        )
        .map((link) => link.source);
      expect(parentsOfNew).toBeDefined(); // I.e. we should have links that have the new node as child.
      expect(parentsOfNew).toEqual(parentsOfOld); //
    }
  });

  it("should link two nodes", async () => {
    setupRender({ callback: spyOnCallback, options });
    expect(spyOnCallback).toHaveBeenCalled();

    const { dispatchReturn, addLinks } = props;
    expect(addLinks).toBeDefined();
    if (addLinks === undefined) throw Error();
    const spiedAddLinks = vi.fn(addLinks.memoizedFunction);

    const initialNodeArray = dispatchReturn?.nodeListRef?.current;
    const first = dispatchReturn?.nodeListRef?.current[0];
    const initialLinkArrayLength = dispatchReturn?.linkListRef?.current.length;
    const childrenOfFirstNode = dispatchReturn?.linkListRef?.current
      ?.filter((link) => link.value === 1)
      ?.filter(
        (link) => (link.source as DataNode<Organization>).id === first?.id,
      )
      .map((link) =>
        typeof link.target === "object" ? link.target.id : `${link.target}`,
      );
    const notChildYet = initialNodeArray?.find(
      (node) => !childrenOfFirstNode?.includes(node.id) && node !== first,
    );
    let newLink = undefined;
    let laterLinkArrayLength = 0;
    expect(first).toBeDefined();
    expect(notChildYet).toBeDefined();
    if (addLinks && first && notChildYet) {
      act(() => spiedAddLinks([first.id, notChildYet.id]));
      laterLinkArrayLength = dispatchReturn?.linkListRef?.current.length ?? 0;
      newLink = dispatchReturn?.linkListRef?.current?.find(
        (link) =>
          (link.source as DataNode<Organization>).id === first.id &&
          (link.target as DataNode<Organization>).id === notChildYet.id,
      );
    }
    expect(spiedAddLinks).toHaveBeenCalledOnce();
    expect(laterLinkArrayLength).toEqual((initialLinkArrayLength ?? 0) + 1);
    expect(newLink).toBeDefined();
  });

  it("should delete a link", async () => {
    setupRender({ callback: spy, options });

    const { dispatchReturn, deleteLinks } = props;
    expect(deleteLinks).toBeDefined();

    const linkArray = dispatchReturn?.linkListRef?.current;
    const linkCount = linkArray?.length ?? 0;
    expect(linkCount).toBeGreaterThan(0);
    expect(deleteLinks).toBeDefined();

    if (linkArray && deleteLinks) {
      act(() => deleteLinks.memoizedFunction(linkArray.map((link) => link.id)));
    }
    expect(dispatchReturn?.linkListRef?.current.length).toEqual(0);
  });

  it("should change the node data", async () => {
    setupRender({ callback: spy, options });

    const { dispatchReturn, editNodeData } = props;
    expect(editNodeData).toBeDefined();
    const first = dispatchReturn?.nodeListRef?.current[0];
    expect(first).toBeDefined();
    const renamed = crypto.randomUUID();

    if (editNodeData && first) {
      act(() => {
        editNodeData.memoizedFunction({ ...first.data, name: renamed });
      });
    }

    const updatedFirst = dispatchReturn?.nodeListRef?.current[0];
    expect(updatedFirst?.data.name).toEqual(renamed);
  });

  it("should call the update server function with the original input json data", async () => {
    const mockUpdateCallback = vi.fn(async () => {
      /*do nothing*/
    });
    const spyOnNodeValidation = vi.fn(revalidateOrganizationNode);
    const spyOnClosureValidation = vi.fn(reMapAndValidateLinkToClosure);
    const expectedRequest: GraphDtoPutRequestBody<Organization> = {
      graphDto: {
        nodes: nodesDto,
        closureDtos: linksDto.filter(
          getClosurePredicate(DirectConnectionDistance),
        ),
      },
      deletedClosureIdList: [],
      deletedNodeIdList: [],
    };

    setupRender({
      options,
      callback: spy,
      putUpdatedGraph: mockUpdateCallback,
      nodeDtoValidation: spyOnNodeValidation,
      closureDtoValidation: spyOnClosureValidation,
    });

    const { onConfirm } = props;

    expect(onConfirm).toBeDefined();

    if (onConfirm) {
      await act(async () => {
        await onConfirm();
      });
    }

    expect(spyOnNodeValidation).toHaveBeenCalled();
    expect(spyOnClosureValidation).toHaveBeenCalled();
    expect(mockUpdateCallback).toHaveBeenCalledWith(expectedRequest);
  });
});
