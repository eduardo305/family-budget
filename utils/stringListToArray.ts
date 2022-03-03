import { compact } from "lodash";
import { stripWhitespace } from "./stripWhitespace";

/**
 * Splits `,` `\t`, `;`, `|` and `\n` into an array of strings.
 * Removes empty spaces around the entry and removes empty entries.
 */
export const stringListToArray = (urls: string | string[]): string[] => {
  if (typeof urls === "string") {
    return compact(
      urls.split(/[\n\t\s;|,]+/).map((curr) => stripWhitespace(curr))
    );
  }

  return urls;
};
