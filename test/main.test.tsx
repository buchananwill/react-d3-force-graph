import ForceClient, {
  CallbackData,
  ForceClientProps,
} from "./__fixtures__/ForceClient";
import { setup } from "./setup";
import ForceClientWrapper from "./__fixtures__/ForceClientWrapper";
import { Organization } from "./__fixtures__/adaptors";
import React from "react";
import { describe, expect, it } from "vitest";
import "@testing-library/jest-dom/vitest";

const setupRender = ({
  callback,
}: Pick<ForceClientProps<Organization>, "callback">) =>
  setup(
    <ForceClientWrapper>
      <ForceClient callback={callback} />
    </ForceClientWrapper>,
  );

describe("ForceGraphPage", () => {
  const props: Partial<CallbackData<Organization>> = {};
  const spy = (data: CallbackData<Organization>) => {
    props.dispatchReturn = data.dispatchReturn;
    props.listenerKey = data.listenerKey;
    props.simRefFromMemo = data.simRefFromMemo;
  };

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
});
