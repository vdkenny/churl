// og implementation: https://github.com/sveltejs/svelte.dev/tree/main/packages/site-kit/src/lib/state
import { MediaQuery } from "svelte/reactivity";
import { on } from "svelte/events";
import { createSubscriber } from "svelte/reactivity";

function get_default_storage() {
    try {
        localStorage.getItem("dummy");
        return localStorage;
    } catch {
        return undefined;
    }
}

class Persisted<T extends string = string> {
    #key: string;
    #storage: Storage | undefined;
    #fallback: T;
    #version = $state(0);

    #subscribe = createSubscriber((update) => {
        return on(window, "storage", (e) => {
            if (e.key === this.#key) {
                update();
            }
        });
    });

    constructor(key: string, fallback: T, storage = get_default_storage()) {
        this.#key = key;
        this.#fallback = fallback;
        this.#storage = storage;
    }

    get current() {
        this.#subscribe(); // handle cross-tab updates
        this.#version; // handle same-tab updates

        return (this.#storage?.getItem?.(this.#key) as T) ?? this.#fallback;
    }

    set current(v: T) {
        if (v !== this.#storage?.getItem?.(this.#key)) {
            this.#storage?.setItem(this.#key, v);
            this.#version += 1;
        }
    }
}
class Theme {
    #preference = new Persisted<"system" | "light" | "dark">("sv:theme", "system");
    #query = new MediaQuery("prefers-color-scheme: dark");
    #system = $derived<"dark" | "light">(this.#query.current ? "dark" : "light");

    get current() {
        return this.#preference.current === "system" ? this.#system : this.#preference.current;
    }

    set current(value: "light" | "dark") {
        this.#preference.current = value === this.#system ? "system" : value;
    }
}

export const theme = new Theme();
