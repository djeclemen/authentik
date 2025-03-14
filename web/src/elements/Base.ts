import { EVENT_THEME_CHANGE } from "@goauthentik/common/constants";
import { globalAK } from "@goauthentik/common/global";
import { UIConfig } from "@goauthentik/common/ui/config";
import { adaptCSS } from "@goauthentik/common/utils";
import { ensureCSSStyleSheet } from "@goauthentik/elements/utils/ensureCSSStyleSheet";

import { localized } from "@lit/localize";
import { LitElement, ReactiveElement } from "lit";

import AKGlobal from "@goauthentik/common/styles/authentik.css";
import ThemeDark from "@goauthentik/common/styles/theme-dark.css";

import { Config, CurrentBrand, UiThemeEnum } from "@goauthentik/api";

type AkInterface = HTMLElement & {
    getTheme: () => Promise<UiThemeEnum>;
    brand?: CurrentBrand;
    uiConfig?: UIConfig;
    config?: Config;
    get activeTheme(): UiThemeEnum | undefined;
};

export const rootInterface = <T extends AkInterface>(): T | undefined =>
    (document.body.querySelector("[data-ak-interface-root]") as T) ?? undefined;

let css: Promise<string[]> | undefined;
function fetchCustomCSS(): Promise<string[]> {
    if (!css) {
        css = Promise.all(
            Array.of(...document.head.querySelectorAll<HTMLLinkElement>("link[data-inject]")).map(
                (link) => {
                    return fetch(link.href)
                        .then((res) => {
                            return res.text();
                        })
                        .finally(() => {
                            return "";
                        });
                },
            ),
        );
    }
    return css;
}

export const QUERY_MEDIA_COLOR_LIGHT = "(prefers-color-scheme: light)";

// Ensure themes are converted to a static instance of CSS Stylesheet, otherwise the
// when changing themes we might not remove the correct css stylesheet instance.
const _darkTheme = ensureCSSStyleSheet(ThemeDark);

@localized()
export class AKElement extends LitElement {
    _mediaMatcher?: MediaQueryList;
    _mediaMatcherHandler?: (ev?: MediaQueryListEvent) => void;
    _activeTheme?: UiThemeEnum;

    get activeTheme(): UiThemeEnum | undefined {
        return this._activeTheme;
    }

    constructor() {
        super();
    }

    setInitialStyles(root: DocumentOrShadowRoot) {
        const styleRoot: DocumentOrShadowRoot = (
            "ShadyDOM" in window ? document : root
        ) as DocumentOrShadowRoot;
        styleRoot.adoptedStyleSheets = adaptCSS([
            ...styleRoot.adoptedStyleSheets,
            ensureCSSStyleSheet(AKGlobal),
        ]);
        this._initTheme(styleRoot);
        this._initCustomCSS(styleRoot);
    }

    protected createRenderRoot() {
        this.fixElementStyles();
        const root = super.createRenderRoot();
        this.setInitialStyles(root as unknown as DocumentOrShadowRoot);
        return root;
    }

    async getTheme(): Promise<UiThemeEnum> {
        return rootInterface()?.getTheme() || UiThemeEnum.Automatic;
    }

    fixElementStyles() {
        // Ensure all style sheets being passed are really style sheets.
        (this.constructor as typeof ReactiveElement).elementStyles = (
            this.constructor as typeof ReactiveElement
        ).elementStyles.map(ensureCSSStyleSheet);
    }

    async _initTheme(root: DocumentOrShadowRoot): Promise<void> {
        // Early activate theme based on media query to prevent light flash
        // when dark is preferred
        this._applyTheme(root, globalAK().brand.uiTheme);
        this._applyTheme(root, await this.getTheme());
    }

    private async _initCustomCSS(root: DocumentOrShadowRoot): Promise<void> {
        const sheets = await fetchCustomCSS();
        sheets.map((css) => {
            if (css === "") {
                return;
            }
            new CSSStyleSheet().replace(css).then((sheet) => {
                root.adoptedStyleSheets = [...root.adoptedStyleSheets, sheet];
            });
        });
    }

    _applyTheme(root: DocumentOrShadowRoot, theme?: UiThemeEnum): void {
        if (!theme) {
            theme = UiThemeEnum.Automatic;
        }
        if (theme === UiThemeEnum.Automatic) {
            // Create a media matcher to automatically switch the theme depending on
            // prefers-color-scheme
            if (!this._mediaMatcher) {
                this._mediaMatcher = window.matchMedia(QUERY_MEDIA_COLOR_LIGHT);
                this._mediaMatcherHandler = (ev?: MediaQueryListEvent) => {
                    const theme =
                        ev?.matches || this._mediaMatcher?.matches
                            ? UiThemeEnum.Light
                            : UiThemeEnum.Dark;
                    this._activateTheme(root, theme);
                };
                this._mediaMatcherHandler(undefined);
                this._mediaMatcher.addEventListener("change", this._mediaMatcherHandler);
            }
            return;
        } else if (this._mediaMatcher && this._mediaMatcherHandler) {
            // Theme isn't automatic and we have a matcher configured, remove the matcher
            // to prevent changes
            this._mediaMatcher.removeEventListener("change", this._mediaMatcherHandler);
            this._mediaMatcher = undefined;
        }
        this._activateTheme(root, theme);
    }

    static themeToStylesheet(theme?: UiThemeEnum): CSSStyleSheet | undefined {
        if (theme === UiThemeEnum.Dark) {
            return _darkTheme;
        }
        return undefined;
    }

    _activateTheme(root: DocumentOrShadowRoot, theme: UiThemeEnum) {
        if (theme === this._activeTheme) {
            return;
        }
        // Make sure we only get to this callback once we've picked a concise theme choice
        this.dispatchEvent(
            new CustomEvent(EVENT_THEME_CHANGE, {
                bubbles: true,
                composed: true,
                detail: theme,
            }),
        );
        this.setAttribute("theme", theme);
        const stylesheet = AKElement.themeToStylesheet(theme);
        const oldStylesheet = AKElement.themeToStylesheet(this._activeTheme);
        if (stylesheet) {
            root.adoptedStyleSheets = [...root.adoptedStyleSheets, ensureCSSStyleSheet(stylesheet)];
        }
        if (oldStylesheet) {
            root.adoptedStyleSheets = root.adoptedStyleSheets.filter((v) => v !== oldStylesheet);
        }
        this._activeTheme = theme;
        this.requestUpdate();
    }
}
