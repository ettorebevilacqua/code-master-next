"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/@auth";
exports.ids = ["vendor-chunks/@auth"];
exports.modules = {

/***/ "(action-browser)/../../node_modules/@auth/core/providers/credentials.js":
/*!**************************************************************!*\
  !*** ../../node_modules/@auth/core/providers/credentials.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Credentials)\n/* harmony export */ });\n/**\n * The Credentials provider allows you to handle signing in with arbitrary credentials,\n * such as a username and password, domain, or two factor authentication or hardware device (e.g. YubiKey U2F / FIDO).\n *\n * It is intended to support use cases where you have an existing system you need to authenticate users against.\n *\n * It comes with the constraint that users authenticated in this manner are not persisted in the database,\n * and consequently that the Credentials provider can only be used if JSON Web Tokens are enabled for sessions.\n *\n * :::warning **NOTE**\n *\n * The functionality provided for credentials based authentication is\n * **intentionally limited** to _discourage_ use of passwords\n * due to the _inherent security risks_ associated with them\n * and the _additional complexity_ associated\n * with supporting usernames and passwords.\n *\n * :::\n *\n * See the [callbacks documentation](/reference/configuration/auth-config#callbacks) for more information on how to interact with the token. For example, you can add additional information to the token by returning an object from the `jwt()` callback:\n *\n * ```js\n * callbacks: {\n *   async jwt(token, user, account, profile, isNewUser) {\n *     if (user) {\n *       token.id = user.id\n *     }\n *     return token\n *   }\n * }\n * ```\n *\n * @example\n * ```js\n * import Auth from \"@auth/core\"\n * import Credentials from \"@auth/core/providers/credentials\"\n *\n * const request = new Request(\"https://example.com\")\n * const response = await AuthHandler(request, {\n *   providers: [\n *     Credentials({\n *       credentials: {\n *         username: { label: \"Username\" },\n *         password: {  label: \"Password\", type: \"password\" }\n *       },\n *       async authorize({ request }) {\n *         const response = await fetch(request)\n *         if(!response.ok) return null\n *         return await response.json() ?? null\n *       }\n *     })\n *   ],\n *   secret: \"...\",\n *   trustHost: true,\n * })\n * ```\n * @see [Username/Password Example](https://authjs.dev/guides/providers/credentials#example---username--password)\n * @see [Web3/Signin With Ethereum Example](https://authjs.dev/guides/providers/credentials#example---web3--signin-with-ethereum)\n */ function Credentials(config) {\n    return {\n        id: \"credentials\",\n        name: \"Credentials\",\n        type: \"credentials\",\n        credentials: {},\n        authorize: ()=>null,\n        // @ts-expect-error\n        options: config\n    };\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFjdGlvbi1icm93c2VyKS8uLi8uLi9ub2RlX21vZHVsZXMvQGF1dGgvY29yZS9wcm92aWRlcnMvY3JlZGVudGlhbHMuanMiLCJtYXBwaW5ncyI6Ijs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBMERDLEdBQ2MsU0FBU0EsWUFBWUMsTUFBTTtJQUN0QyxPQUFPO1FBQ0hDLElBQUk7UUFDSkMsTUFBTTtRQUNOQyxNQUFNO1FBQ05DLGFBQWEsQ0FBQztRQUNkQyxXQUFXLElBQU07UUFDakIsbUJBQW1CO1FBQ25CQyxTQUFTTjtJQUNiO0FBQ0oiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AYWNtZS9uZXh0anMvLi4vLi4vbm9kZV9tb2R1bGVzL0BhdXRoL2NvcmUvcHJvdmlkZXJzL2NyZWRlbnRpYWxzLmpzPzU5YWQiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBUaGUgQ3JlZGVudGlhbHMgcHJvdmlkZXIgYWxsb3dzIHlvdSB0byBoYW5kbGUgc2lnbmluZyBpbiB3aXRoIGFyYml0cmFyeSBjcmVkZW50aWFscyxcbiAqIHN1Y2ggYXMgYSB1c2VybmFtZSBhbmQgcGFzc3dvcmQsIGRvbWFpbiwgb3IgdHdvIGZhY3RvciBhdXRoZW50aWNhdGlvbiBvciBoYXJkd2FyZSBkZXZpY2UgKGUuZy4gWXViaUtleSBVMkYgLyBGSURPKS5cbiAqXG4gKiBJdCBpcyBpbnRlbmRlZCB0byBzdXBwb3J0IHVzZSBjYXNlcyB3aGVyZSB5b3UgaGF2ZSBhbiBleGlzdGluZyBzeXN0ZW0geW91IG5lZWQgdG8gYXV0aGVudGljYXRlIHVzZXJzIGFnYWluc3QuXG4gKlxuICogSXQgY29tZXMgd2l0aCB0aGUgY29uc3RyYWludCB0aGF0IHVzZXJzIGF1dGhlbnRpY2F0ZWQgaW4gdGhpcyBtYW5uZXIgYXJlIG5vdCBwZXJzaXN0ZWQgaW4gdGhlIGRhdGFiYXNlLFxuICogYW5kIGNvbnNlcXVlbnRseSB0aGF0IHRoZSBDcmVkZW50aWFscyBwcm92aWRlciBjYW4gb25seSBiZSB1c2VkIGlmIEpTT04gV2ViIFRva2VucyBhcmUgZW5hYmxlZCBmb3Igc2Vzc2lvbnMuXG4gKlxuICogOjo6d2FybmluZyAqKk5PVEUqKlxuICpcbiAqIFRoZSBmdW5jdGlvbmFsaXR5IHByb3ZpZGVkIGZvciBjcmVkZW50aWFscyBiYXNlZCBhdXRoZW50aWNhdGlvbiBpc1xuICogKippbnRlbnRpb25hbGx5IGxpbWl0ZWQqKiB0byBfZGlzY291cmFnZV8gdXNlIG9mIHBhc3N3b3Jkc1xuICogZHVlIHRvIHRoZSBfaW5oZXJlbnQgc2VjdXJpdHkgcmlza3NfIGFzc29jaWF0ZWQgd2l0aCB0aGVtXG4gKiBhbmQgdGhlIF9hZGRpdGlvbmFsIGNvbXBsZXhpdHlfIGFzc29jaWF0ZWRcbiAqIHdpdGggc3VwcG9ydGluZyB1c2VybmFtZXMgYW5kIHBhc3N3b3Jkcy5cbiAqXG4gKiA6OjpcbiAqXG4gKiBTZWUgdGhlIFtjYWxsYmFja3MgZG9jdW1lbnRhdGlvbl0oL3JlZmVyZW5jZS9jb25maWd1cmF0aW9uL2F1dGgtY29uZmlnI2NhbGxiYWNrcykgZm9yIG1vcmUgaW5mb3JtYXRpb24gb24gaG93IHRvIGludGVyYWN0IHdpdGggdGhlIHRva2VuLiBGb3IgZXhhbXBsZSwgeW91IGNhbiBhZGQgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiB0byB0aGUgdG9rZW4gYnkgcmV0dXJuaW5nIGFuIG9iamVjdCBmcm9tIHRoZSBgand0KClgIGNhbGxiYWNrOlxuICpcbiAqIGBgYGpzXG4gKiBjYWxsYmFja3M6IHtcbiAqICAgYXN5bmMgand0KHRva2VuLCB1c2VyLCBhY2NvdW50LCBwcm9maWxlLCBpc05ld1VzZXIpIHtcbiAqICAgICBpZiAodXNlcikge1xuICogICAgICAgdG9rZW4uaWQgPSB1c2VyLmlkXG4gKiAgICAgfVxuICogICAgIHJldHVybiB0b2tlblxuICogICB9XG4gKiB9XG4gKiBgYGBcbiAqXG4gKiBAZXhhbXBsZVxuICogYGBganNcbiAqIGltcG9ydCBBdXRoIGZyb20gXCJAYXV0aC9jb3JlXCJcbiAqIGltcG9ydCBDcmVkZW50aWFscyBmcm9tIFwiQGF1dGgvY29yZS9wcm92aWRlcnMvY3JlZGVudGlhbHNcIlxuICpcbiAqIGNvbnN0IHJlcXVlc3QgPSBuZXcgUmVxdWVzdChcImh0dHBzOi8vZXhhbXBsZS5jb21cIilcbiAqIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgQXV0aEhhbmRsZXIocmVxdWVzdCwge1xuICogICBwcm92aWRlcnM6IFtcbiAqICAgICBDcmVkZW50aWFscyh7XG4gKiAgICAgICBjcmVkZW50aWFsczoge1xuICogICAgICAgICB1c2VybmFtZTogeyBsYWJlbDogXCJVc2VybmFtZVwiIH0sXG4gKiAgICAgICAgIHBhc3N3b3JkOiB7ICBsYWJlbDogXCJQYXNzd29yZFwiLCB0eXBlOiBcInBhc3N3b3JkXCIgfVxuICogICAgICAgfSxcbiAqICAgICAgIGFzeW5jIGF1dGhvcml6ZSh7IHJlcXVlc3QgfSkge1xuICogICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHJlcXVlc3QpXG4gKiAgICAgICAgIGlmKCFyZXNwb25zZS5vaykgcmV0dXJuIG51bGxcbiAqICAgICAgICAgcmV0dXJuIGF3YWl0IHJlc3BvbnNlLmpzb24oKSA/PyBudWxsXG4gKiAgICAgICB9XG4gKiAgICAgfSlcbiAqICAgXSxcbiAqICAgc2VjcmV0OiBcIi4uLlwiLFxuICogICB0cnVzdEhvc3Q6IHRydWUsXG4gKiB9KVxuICogYGBgXG4gKiBAc2VlIFtVc2VybmFtZS9QYXNzd29yZCBFeGFtcGxlXShodHRwczovL2F1dGhqcy5kZXYvZ3VpZGVzL3Byb3ZpZGVycy9jcmVkZW50aWFscyNleGFtcGxlLS0tdXNlcm5hbWUtLXBhc3N3b3JkKVxuICogQHNlZSBbV2ViMy9TaWduaW4gV2l0aCBFdGhlcmV1bSBFeGFtcGxlXShodHRwczovL2F1dGhqcy5kZXYvZ3VpZGVzL3Byb3ZpZGVycy9jcmVkZW50aWFscyNleGFtcGxlLS0td2ViMy0tc2lnbmluLXdpdGgtZXRoZXJldW0pXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIENyZWRlbnRpYWxzKGNvbmZpZykge1xuICAgIHJldHVybiB7XG4gICAgICAgIGlkOiBcImNyZWRlbnRpYWxzXCIsXG4gICAgICAgIG5hbWU6IFwiQ3JlZGVudGlhbHNcIixcbiAgICAgICAgdHlwZTogXCJjcmVkZW50aWFsc1wiLFxuICAgICAgICBjcmVkZW50aWFsczoge30sXG4gICAgICAgIGF1dGhvcml6ZTogKCkgPT4gbnVsbCxcbiAgICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvclxuICAgICAgICBvcHRpb25zOiBjb25maWcsXG4gICAgfTtcbn1cbiJdLCJuYW1lcyI6WyJDcmVkZW50aWFscyIsImNvbmZpZyIsImlkIiwibmFtZSIsInR5cGUiLCJjcmVkZW50aWFscyIsImF1dGhvcml6ZSIsIm9wdGlvbnMiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(action-browser)/../../node_modules/@auth/core/providers/credentials.js\n");

/***/ }),

/***/ "(rsc)/../../node_modules/@auth/core/providers/credentials.js":
/*!**************************************************************!*\
  !*** ../../node_modules/@auth/core/providers/credentials.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Credentials)\n/* harmony export */ });\n/**\n * The Credentials provider allows you to handle signing in with arbitrary credentials,\n * such as a username and password, domain, or two factor authentication or hardware device (e.g. YubiKey U2F / FIDO).\n *\n * It is intended to support use cases where you have an existing system you need to authenticate users against.\n *\n * It comes with the constraint that users authenticated in this manner are not persisted in the database,\n * and consequently that the Credentials provider can only be used if JSON Web Tokens are enabled for sessions.\n *\n * :::warning **NOTE**\n *\n * The functionality provided for credentials based authentication is\n * **intentionally limited** to _discourage_ use of passwords\n * due to the _inherent security risks_ associated with them\n * and the _additional complexity_ associated\n * with supporting usernames and passwords.\n *\n * :::\n *\n * See the [callbacks documentation](/reference/configuration/auth-config#callbacks) for more information on how to interact with the token. For example, you can add additional information to the token by returning an object from the `jwt()` callback:\n *\n * ```js\n * callbacks: {\n *   async jwt(token, user, account, profile, isNewUser) {\n *     if (user) {\n *       token.id = user.id\n *     }\n *     return token\n *   }\n * }\n * ```\n *\n * @example\n * ```js\n * import Auth from \"@auth/core\"\n * import Credentials from \"@auth/core/providers/credentials\"\n *\n * const request = new Request(\"https://example.com\")\n * const response = await AuthHandler(request, {\n *   providers: [\n *     Credentials({\n *       credentials: {\n *         username: { label: \"Username\" },\n *         password: {  label: \"Password\", type: \"password\" }\n *       },\n *       async authorize({ request }) {\n *         const response = await fetch(request)\n *         if(!response.ok) return null\n *         return await response.json() ?? null\n *       }\n *     })\n *   ],\n *   secret: \"...\",\n *   trustHost: true,\n * })\n * ```\n * @see [Username/Password Example](https://authjs.dev/guides/providers/credentials#example---username--password)\n * @see [Web3/Signin With Ethereum Example](https://authjs.dev/guides/providers/credentials#example---web3--signin-with-ethereum)\n */ function Credentials(config) {\n    return {\n        id: \"credentials\",\n        name: \"Credentials\",\n        type: \"credentials\",\n        credentials: {},\n        authorize: ()=>null,\n        // @ts-expect-error\n        options: config\n    };\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi4vLi4vbm9kZV9tb2R1bGVzL0BhdXRoL2NvcmUvcHJvdmlkZXJzL2NyZWRlbnRpYWxzLmpzIiwibWFwcGluZ3MiOiI7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQTBEQyxHQUNjLFNBQVNBLFlBQVlDLE1BQU07SUFDdEMsT0FBTztRQUNIQyxJQUFJO1FBQ0pDLE1BQU07UUFDTkMsTUFBTTtRQUNOQyxhQUFhLENBQUM7UUFDZEMsV0FBVyxJQUFNO1FBQ2pCLG1CQUFtQjtRQUNuQkMsU0FBU047SUFDYjtBQUNKIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vQGFjbWUvbmV4dGpzLy4uLy4uL25vZGVfbW9kdWxlcy9AYXV0aC9jb3JlL3Byb3ZpZGVycy9jcmVkZW50aWFscy5qcz81OWFkIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVGhlIENyZWRlbnRpYWxzIHByb3ZpZGVyIGFsbG93cyB5b3UgdG8gaGFuZGxlIHNpZ25pbmcgaW4gd2l0aCBhcmJpdHJhcnkgY3JlZGVudGlhbHMsXG4gKiBzdWNoIGFzIGEgdXNlcm5hbWUgYW5kIHBhc3N3b3JkLCBkb21haW4sIG9yIHR3byBmYWN0b3IgYXV0aGVudGljYXRpb24gb3IgaGFyZHdhcmUgZGV2aWNlIChlLmcuIFl1YmlLZXkgVTJGIC8gRklETykuXG4gKlxuICogSXQgaXMgaW50ZW5kZWQgdG8gc3VwcG9ydCB1c2UgY2FzZXMgd2hlcmUgeW91IGhhdmUgYW4gZXhpc3Rpbmcgc3lzdGVtIHlvdSBuZWVkIHRvIGF1dGhlbnRpY2F0ZSB1c2VycyBhZ2FpbnN0LlxuICpcbiAqIEl0IGNvbWVzIHdpdGggdGhlIGNvbnN0cmFpbnQgdGhhdCB1c2VycyBhdXRoZW50aWNhdGVkIGluIHRoaXMgbWFubmVyIGFyZSBub3QgcGVyc2lzdGVkIGluIHRoZSBkYXRhYmFzZSxcbiAqIGFuZCBjb25zZXF1ZW50bHkgdGhhdCB0aGUgQ3JlZGVudGlhbHMgcHJvdmlkZXIgY2FuIG9ubHkgYmUgdXNlZCBpZiBKU09OIFdlYiBUb2tlbnMgYXJlIGVuYWJsZWQgZm9yIHNlc3Npb25zLlxuICpcbiAqIDo6Ondhcm5pbmcgKipOT1RFKipcbiAqXG4gKiBUaGUgZnVuY3Rpb25hbGl0eSBwcm92aWRlZCBmb3IgY3JlZGVudGlhbHMgYmFzZWQgYXV0aGVudGljYXRpb24gaXNcbiAqICoqaW50ZW50aW9uYWxseSBsaW1pdGVkKiogdG8gX2Rpc2NvdXJhZ2VfIHVzZSBvZiBwYXNzd29yZHNcbiAqIGR1ZSB0byB0aGUgX2luaGVyZW50IHNlY3VyaXR5IHJpc2tzXyBhc3NvY2lhdGVkIHdpdGggdGhlbVxuICogYW5kIHRoZSBfYWRkaXRpb25hbCBjb21wbGV4aXR5XyBhc3NvY2lhdGVkXG4gKiB3aXRoIHN1cHBvcnRpbmcgdXNlcm5hbWVzIGFuZCBwYXNzd29yZHMuXG4gKlxuICogOjo6XG4gKlxuICogU2VlIHRoZSBbY2FsbGJhY2tzIGRvY3VtZW50YXRpb25dKC9yZWZlcmVuY2UvY29uZmlndXJhdGlvbi9hdXRoLWNvbmZpZyNjYWxsYmFja3MpIGZvciBtb3JlIGluZm9ybWF0aW9uIG9uIGhvdyB0byBpbnRlcmFjdCB3aXRoIHRoZSB0b2tlbi4gRm9yIGV4YW1wbGUsIHlvdSBjYW4gYWRkIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gdG8gdGhlIHRva2VuIGJ5IHJldHVybmluZyBhbiBvYmplY3QgZnJvbSB0aGUgYGp3dCgpYCBjYWxsYmFjazpcbiAqXG4gKiBgYGBqc1xuICogY2FsbGJhY2tzOiB7XG4gKiAgIGFzeW5jIGp3dCh0b2tlbiwgdXNlciwgYWNjb3VudCwgcHJvZmlsZSwgaXNOZXdVc2VyKSB7XG4gKiAgICAgaWYgKHVzZXIpIHtcbiAqICAgICAgIHRva2VuLmlkID0gdXNlci5pZFxuICogICAgIH1cbiAqICAgICByZXR1cm4gdG9rZW5cbiAqICAgfVxuICogfVxuICogYGBgXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYGpzXG4gKiBpbXBvcnQgQXV0aCBmcm9tIFwiQGF1dGgvY29yZVwiXG4gKiBpbXBvcnQgQ3JlZGVudGlhbHMgZnJvbSBcIkBhdXRoL2NvcmUvcHJvdmlkZXJzL2NyZWRlbnRpYWxzXCJcbiAqXG4gKiBjb25zdCByZXF1ZXN0ID0gbmV3IFJlcXVlc3QoXCJodHRwczovL2V4YW1wbGUuY29tXCIpXG4gKiBjb25zdCByZXNwb25zZSA9IGF3YWl0IEF1dGhIYW5kbGVyKHJlcXVlc3QsIHtcbiAqICAgcHJvdmlkZXJzOiBbXG4gKiAgICAgQ3JlZGVudGlhbHMoe1xuICogICAgICAgY3JlZGVudGlhbHM6IHtcbiAqICAgICAgICAgdXNlcm5hbWU6IHsgbGFiZWw6IFwiVXNlcm5hbWVcIiB9LFxuICogICAgICAgICBwYXNzd29yZDogeyAgbGFiZWw6IFwiUGFzc3dvcmRcIiwgdHlwZTogXCJwYXNzd29yZFwiIH1cbiAqICAgICAgIH0sXG4gKiAgICAgICBhc3luYyBhdXRob3JpemUoeyByZXF1ZXN0IH0pIHtcbiAqICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChyZXF1ZXN0KVxuICogICAgICAgICBpZighcmVzcG9uc2Uub2spIHJldHVybiBudWxsXG4gKiAgICAgICAgIHJldHVybiBhd2FpdCByZXNwb25zZS5qc29uKCkgPz8gbnVsbFxuICogICAgICAgfVxuICogICAgIH0pXG4gKiAgIF0sXG4gKiAgIHNlY3JldDogXCIuLi5cIixcbiAqICAgdHJ1c3RIb3N0OiB0cnVlLFxuICogfSlcbiAqIGBgYFxuICogQHNlZSBbVXNlcm5hbWUvUGFzc3dvcmQgRXhhbXBsZV0oaHR0cHM6Ly9hdXRoanMuZGV2L2d1aWRlcy9wcm92aWRlcnMvY3JlZGVudGlhbHMjZXhhbXBsZS0tLXVzZXJuYW1lLS1wYXNzd29yZClcbiAqIEBzZWUgW1dlYjMvU2lnbmluIFdpdGggRXRoZXJldW0gRXhhbXBsZV0oaHR0cHM6Ly9hdXRoanMuZGV2L2d1aWRlcy9wcm92aWRlcnMvY3JlZGVudGlhbHMjZXhhbXBsZS0tLXdlYjMtLXNpZ25pbi13aXRoLWV0aGVyZXVtKVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBDcmVkZW50aWFscyhjb25maWcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBpZDogXCJjcmVkZW50aWFsc1wiLFxuICAgICAgICBuYW1lOiBcIkNyZWRlbnRpYWxzXCIsXG4gICAgICAgIHR5cGU6IFwiY3JlZGVudGlhbHNcIixcbiAgICAgICAgY3JlZGVudGlhbHM6IHt9LFxuICAgICAgICBhdXRob3JpemU6ICgpID0+IG51bGwsXG4gICAgICAgIC8vIEB0cy1leHBlY3QtZXJyb3JcbiAgICAgICAgb3B0aW9uczogY29uZmlnLFxuICAgIH07XG59XG4iXSwibmFtZXMiOlsiQ3JlZGVudGlhbHMiLCJjb25maWciLCJpZCIsIm5hbWUiLCJ0eXBlIiwiY3JlZGVudGlhbHMiLCJhdXRob3JpemUiLCJvcHRpb25zIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/../../node_modules/@auth/core/providers/credentials.js\n");

/***/ })

};
;