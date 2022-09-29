import { writable } from "svelte/store";

const userStore = writable<{
  loggedIn: boolean;
  user?: Object
}>({loggedIn: false});

export default userStore;