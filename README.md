This is the code used to produce native desktop versions of [SWAMP CAMP](https://swamp.camp), built with Electron.

This project doesn't actually build the SWAMP CAMP game, or contain any code for it.
It injects the built frontend assets in `packages/renderer/`, then builds the Electron app around it.
This keeps a clean separation between the two projects. Since there is a lot of Electron boilerplate,
and SWAMP CAMP is still primarily a web game, I didn't want to smush all the web and Electron build logic together.
