import { HasId } from "@/graph-tools/types/util";

export function getAnyIdAsString(entity: HasId) {
  const { id } = entity;
  const idType = typeof id;
  if (idType === "string" || idType === "number") return `${id}`;
  else throw Error("Id not valid string or number");
}

export function getNumberFromStringId(id: string) {
  const number = parseInt(id, 10);
  if (isNaN(number)) {
    const colonIndex = id.indexOf(":");
    const afterColon = parseInt(id.substring(colonIndex + 1));
    if (isNaN(afterColon))
      throw Error("Id did not contain valid number after colon separator.");
    return afterColon;
  } else return number;
}