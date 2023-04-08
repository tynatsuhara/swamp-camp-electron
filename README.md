This is the code used to produce native desktop versions of [SWAMP CAMP](https://swamp.camp), built with Electron.

This project doesn't actually build the SWAMP CAMP game, or contain any code for it.
It injects the built frontend assets in `packages/renderer/`, then builds the Electron app around it.
This keeps a clean separation between the two projects. Since there is a lot of Electron boilerplate,
and SWAMP CAMP is still primarily a web game, I didn't want to smush all the web and Electron build logic together.

# Releasing

GitHub Actions is used to release the applications for Windows, Linux, and Intel-based macs.
Since Actions doesn't currently support Apple Silicon, `npm run release:m1` can be used on an M1+ Mac to release the app.

#### Special thanks

This project was based on [cawa-93/vite-electron-builder](https://github.com/cawa-93/vite-electron-builder), which is licensed under the MIT license.

> MIT License
>
> Copyright (c) 2021 Alex Kozack
>
> Permission is hereby granted, free of charge, to any person obtaining a copy
> of this software and associated documentation files (the "Software"), to deal
> in the Software without restriction, including without limitation the rights
> to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
> copies of the Software, and to permit persons to whom the Software is
> furnished to do so, subject to the following conditions:
>
> The above copyright notice and this permission notice shall be included in all
> copies or substantial portions of the Software.
>
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
> IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
> FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
> AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
> LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
> OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
> SOFTWARE.
