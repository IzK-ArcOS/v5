# ArcOS Svelte Rewrite
The time has come to completely rethink the initial idea for the ArcOS project. As a reminder, I originally specified that ArcOS was going to be a desktop application by using the electron framework. It has come to my attention that the demand for a typescript codebase is bigger than ever and growing drastically because of the rich featureset that I wish to accomplish with ArcOS. That's why I'm dropping Electron in favour of Typescript. That means, in the early days of this codebase, that ArcOS will run 100% in the browser, no exceptions. In the future, once we have the optional backend API written, we can work on a bundled version that implements both the backend and frontend into one singular application on the user's PC. Until then we're sticking to browser-only.

## The concept
All frontend components required to get the ArcOS experience I seek, bundled into one webapp. Each main component (such as the boot screen, login, etc etc), will all be contained as `State` objects, which contain things like the name of the component as well as the svelte component. As of July 6th 2022, this is the interface for storing `State`s:

```ts
export interface State {
  name: string;
  content: SvelteComponent | any;
  attribs: { [key: string]: boolean | string | number };
}
```
| key       | type                                            | details                                             |
|-----------|-------------------------------------------------|-----------------------------------------------------|
| `name`    | `string`                                        | Contains the display name (like `First Time Setup`) |
| `content` | `SvelteComponent \| any`                        | The actual body of the state                        |
| `attribs` | `{ [key:string]: boolean \| string \| number }` | Additional attributes different state types can use |