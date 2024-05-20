import React, { ReactNode } from "react";

export function ComponentUndefined(props: { onClose: () => void }): ReactNode {
  return (
    <p className={"p-2"} onClick={props.onClose}>
      Content undefined...
    </p>
  );
}
