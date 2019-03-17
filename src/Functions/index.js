/* Functions are not imported into here anymore,
   these are now imported through their own files.

   This file was created to streamline syntax when importing functions.
   All functions would be exported from here, changing the syntax of import statements:

  - Before:
   import { draw, drawColorMapping } from "../../Functions/draw"
   import { singleFrequency } from "../../Functions/sound"

   - After:
   import { draw, drawColorMapping, singleFrequency } from "../../Functions"

   This was reverted as it was high maintenance and abstracted where these functions where coming from.
*/
