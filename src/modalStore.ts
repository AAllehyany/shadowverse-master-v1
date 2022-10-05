import {writable} from 'svelte/store';

const modalStore = writable<{open: boolean, card: any}>({
  open: false,
  card: null
});

export default modalStore;