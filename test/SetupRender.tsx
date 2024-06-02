import ForceClient, { ForceClientProps } from "./__fixtures__/ForceClient";
import { Organization } from "./__fixtures__/adaptors";
import { ForceGraphPageOptions } from "../src";
import { setup } from "./setup";
import ForceClientWrapper from "./__fixtures__/ForceClientWrapper";
import React from "react";

export const setupRender = ({
  callback,
  options = {},
}: Pick<ForceClientProps<Organization>, "callback"> & {
  options?: ForceGraphPageOptions;
}) =>
  setup(
    <ForceClientWrapper options={options}>
      <ForceClient callback={callback} />
    </ForceClientWrapper>,
  );
