import { sequence, type Handle } from "@sveltejs/kit/hooks";
import { getTextDirection } from "#lib/paraglide/runtime.js";
import { paraglideMiddleware } from "#lib/paraglide/server.js";

const paraglide: Handle = ({ event, resolve }) =>
    paraglideMiddleware(event.request, ({ request, locale }) => {
        return resolve(
            { ...event, request },
            {
                transformPageChunk: ({ html }) =>
                    html.replace("%paraglide.lang%", locale).replace("%paraglide.dir%", getTextDirection(locale)),
            },
        );
    });

const font: Handle = async ({ event, resolve }) => {
    return resolve(event, {
        preload: (asset) => {
            if (asset.type === 'font') {
                return asset.filename.includes("geist-pixel-latin-elsh-normal");
            }

            return true;
        }
    });
};

export const handle: Handle = sequence(paraglide, font);
