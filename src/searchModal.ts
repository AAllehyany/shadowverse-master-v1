import {writable} from 'svelte/store';

const searchModal = writable<boolean>(false);

export default searchModal;