// GENERATED from dc-runtime/src/*.ts — do not edit. Rebuild with `cd dc-runtime && bun run build`.

(() => {
  const __defProp = Object.defineProperty;
  const __defNormalProp = (object, key, value) =>
    key in object
      ? __defProp(object, key, {
          enumerable: true,
          configurable: true,
          writable: true,
          value,
        })
      : (object[key] = value);
  const __publicField = (object, key, value) =>
    __defNormalProp(object, typeof key === "symbol" ? key : `${key}`, value);

  // src/react.ts
  function getReact() {
    const R = window.React;
    if (!R) {
      throw new Error("dc-runtime: window.React is not available yet");
    }
    return R;
  }
  function getReactDOM() {
    const RD = window.ReactDOM;
    if (!RD) {
      throw new Error("dc-runtime: window.ReactDOM is not available yet");
    }
    return RD;
  }
  const h = (...arguments_) => getReact().createElement(...arguments_);

  // src/parse.ts
  function parseDcDocument(document_) {
    const dc = document_.querySelector("x-dc");
    if (!dc) {
      return null;
    }
    const scriptElement = document_.querySelector("script[data-dc-script]");
    const { props, preview } = parseDataProperties(
      scriptElement?.getAttribute("data-props") ?? null
    );
    return {
      template: dc.getHTML(),
      js: scriptElement ? scriptElement.textContent || "" : "",
      props,
      preview,
    };
  }
  function parseDcText(source) {
    const openMatch = /<x-dc(?:\s[^>]*)?>/.exec(source);
    if (!openMatch) {
      return null;
    }
    const close = source.lastIndexOf("</x-dc>");
    if (close === -1 || close < openMatch.index) {
      return null;
    }
    const template = source.slice(openMatch.index + openMatch[0].length, close);
    const document_ = new DOMParser().parseFromString(source, "text/html");
    const scriptElement = document_.querySelector("script[data-dc-script]");
    const { props, preview } = parseDataProperties(
      scriptElement?.getAttribute("data-props") ?? null
    );
    return {
      template,
      js: scriptElement ? scriptElement.textContent || "" : "",
      props,
      preview,
    };
  }
  function parseDataProperties(raw) {
    if (!raw) {
      return { props: null, preview: null };
    }
    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch {
      return { props: null, preview: null };
    }
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return { props: null, preview: null };
    }
    const object = parsed;
    const preview =
      object.$preview && typeof object.$preview === "object"
        ? object.$preview
        : null;
    const rest = {};
    for (const [k, value] of Object.entries(object)) {
      if (k[0] !== "$") {
        rest[k] = value;
      }
    }
    return { props: Object.keys(rest).length ? rest : null, preview };
  }
  function dcNameFromPath(pathname) {
    let p = pathname || "";
    try {
      p = decodeURIComponent(p);
    } catch {}
    const base = p.split("/").pop() || "Root";
    return base.replace(/\.dc\.html$/, "").replace(/\.html?$/, "") || "Root";
  }

  // src/boot.ts
  const BASE_CSS = `
    .sc-placeholder{background:color-mix(in srgb,currentColor 8%,transparent);
      border:1px solid color-mix(in srgb,currentColor 50%,transparent);
      border-radius:2px;box-sizing:border-box;overflow:hidden}
    @keyframes sc-shine{0%{background-position:100% 50%}100%{background-position:0% 50%}}
    html.sc-dc-streaming .sc-placeholder,
    html.sc-dc-streaming .sc-interp.sc-missing{position:relative;
      background:color-mix(in srgb,currentColor 5%,transparent);
      border-color:transparent}
    html.sc-dc-streaming .sc-placeholder::before,
    html.sc-dc-streaming .sc-interp.sc-missing::before{content:'';
      position:absolute;inset:0;pointer-events:none;
      background:linear-gradient(90deg,rgba(217,119,87,0) 25%,rgba(247,225,211,.95) 37%,rgba(217,119,87,0) 63%);
      background-size:400% 100%;animation:sc-shine 1.4s ease infinite}
    html.sc-dc-streaming .sc-placeholder:nth-child(n+9 of .sc-placeholder)::before,
    html.sc-dc-streaming .sc-interp.sc-missing:nth-child(n+9 of .sc-interp.sc-missing)::before{animation:none;
      background:color-mix(in srgb,currentColor 8%,transparent)}
    .sc-placeholder-error{padding:4px 8px;font:11px/1.4 ui-monospace,monospace;
      color:color-mix(in srgb,currentColor 70%,transparent);word-break:break-word}
    .sc-interp.sc-missing{display:inline-block;width:2em;height:1em;overflow:hidden;
      vertical-align:text-bottom;background:rgba(255,255,255,.3);border:1px solid rgba(0,0,0,.5);
      border-radius:2px;box-sizing:border-box;color:transparent;
      user-select:none}
    .sc-interp.sc-unresolved{font-family:ui-monospace,monospace;font-size:.85em;
      color:color-mix(in srgb,currentColor 50%,transparent);
      background:color-mix(in srgb,currentColor 10%,transparent);border-radius:3px;
      padding:0 3px}
    .sc-host.sc-has-error{position:relative}
    .sc-logic-error{position:absolute;top:8px;left:8px;z-index:2147483647;max-width:60ch;
      padding:6px 10px;background:#b00020;color:#fff;font:12px/1.4 ui-monospace,monospace;
      border-radius:4px;white-space:pre-wrap;pointer-events:none}
    /* Mirrors PRINT_BASELINE_CSS in apps/web deck-stage-export.ts \u{2014} keep both
       in sync until dc-runtime regains a build step. */
    @media print {
      @page { margin: 0.5cm; }
      figure, table { break-inside: avoid; }
      #dc-root, #dc-root > .sc-host { height: auto; }
      *, *::before, *::after {
        print-color-adjust: exact; -webkit-print-color-adjust: exact;
        backdrop-filter: none !important; -webkit-backdrop-filter: none !important;
        animation-delay: -99s !important; animation-duration: .001s !important;
        animation-iteration-count: 1 !important; animation-fill-mode: both !important;
        animation-play-state: running !important; transition-duration: 0s !important;
      }
    }
  `;
  const FULL_PAGE_CSS =
    "html,body{height:100%;margin:0}#dc-root,#dc-root>.sc-host{height:100%}";
  function rootNameForDocument(document_, loc) {
    let bootPath = loc.pathname || "";
    if (!/\.dc\.html?$/i.test(safeDecode(bootPath))) {
      try {
        bootPath = new URL(document_.baseURI || "/").pathname;
      } catch {}
    }
    return dcNameFromPath(bootPath);
  }
  function safeDecode(s) {
    try {
      return decodeURIComponent(s);
    } catch {
      return s;
    }
  }
  function boot(runtime, document_ = document) {
    const parsed = parseDcDocument(document_);
    if (!parsed) {
      return null;
    }
    const React = getReact();
    const rootName = rootNameForDocument(document_, location);
    runtime.markFetched(rootName);
    runtime.setRootName(rootName);
    runtime.adoptParsed(rootName, parsed);
    if (!window.__resources) {
      fetch(location.href)
        .then((res) => (res.ok ? res.text() : ""))
        .then((t) => {
          const raw = t ? parseDcText(t) : null;
          if (raw?.template) {
            runtime.updateHtml(rootName, raw.template);
          }
        })
        .catch(() => {});
    }
    const dc = document_.querySelector("x-dc");
    const hostElement = document_.createElement("div");
    hostElement.id = "dc-root";
    dc.replaceWith(hostElement);
    if (!parsed.preview) {
      const s = document_.createElement("style");
      s.textContent = FULL_PAGE_CSS;
      document_.head.append(s);
    }
    const Root = runtime.getDC(rootName);
    const entry = runtime.registry.get(rootName);
    function StandaloneRoot() {
      const [, setTick] = React.useState(0);
      React.useEffect(() => {
        const sub = () => setTick((n) => n + 1);
        entry.subs.add(sub);
        return () => {
          entry.subs.delete(sub);
        };
      }, []);
      const defaults = React.useMemo(() => {
        const d = {};
        for (const k in entry.propsMeta || {}) {
          const v = entry.propsMeta?.[k]?.default;
          if (v !== void 0) {
            d[k] = v;
          }
        }
        return d;
      }, [entry.propsMeta]);
      return h(Root, { ...defaults, ...entry.propOverrides });
    }
    const ReactDOM = getReactDOM();
    if (ReactDOM.createRoot) {
      ReactDOM.createRoot(hostElement).render(h(StandaloneRoot));
    } else {
      ReactDOM.render(h(StandaloneRoot), hostElement);
    }
    return rootName;
  }

  // src/expr.ts
  const IDENT_RE = /^[A-Za-z_$][A-Za-z0-9_$]*/;
  const NUMBER_RE = /^-?\d+(\.\d+)?$/;
  function resolve(vals, source) {
    const expression = String(source).trim();
    if (!expression) {
      return void 0;
    }
    if (
      expression[0] === "(" &&
      expression.at(-1) === ")" &&
      parensWrapWhole(expression)
    ) {
      return resolve(vals, expression.slice(1, -1));
    }
    const eq = findTopLevelEquality(expression);
    if (eq) {
      const lv = resolve(vals, expression.slice(0, eq.index));
      const rv = resolve(vals, expression.slice(eq.index + eq.op.length));
      switch (eq.op) {
        case "===": {
          return lv === rv;
        }
        case "!==": {
          return lv !== rv;
        }
        case "==": {
          return lv == rv;
        }
        default: {
          return lv != rv;
        }
      }
    }
    if (expression[0] === "!") {
      return !resolve(vals, expression.slice(1));
    }
    if (expression === "true") {
      return true;
    }
    if (expression === "false") {
      return false;
    }
    if (expression === "null") {
      return null;
    }
    if (expression === "undefined") {
      return void 0;
    }
    if (NUMBER_RE.test(expression)) {
      return Number(expression);
    }
    if (
      expression.length >= 2 &&
      (expression[0] === '"' || expression[0] === "'") &&
      expression.at(-1) === expression[0]
    ) {
      return expression.slice(1, -1);
    }
    return resolvePath(vals, expression);
  }
  function parensWrapWhole(expression) {
    let depth = 0;
    for (let index = 0; index < expression.length - 1; index++) {
      if (expression[index] === "(") {
        depth++;
      } else if (expression[index] === ")") {
        depth--;
        if (depth === 0) {
          return false;
        }
      }
    }
    return true;
  }
  function findTopLevelEquality(expression) {
    let depth = 0;
    for (let index = 0; index < expression.length; index++) {
      const c = expression[index];
      if (c === "[" || c === "(") {
        depth++;
      } else if (c === "]" || c === ")") {
        depth--;
      } else if (
        depth === 0 &&
        (c === "=" || c === "!") &&
        expression[index + 1] === "="
      ) {
        if (
          index > 0 &&
          (expression[index - 1] === "=" || expression[index - 1] === "!")
        ) {
          continue;
        }
        if (!expression.slice(0, index).trim()) {
          continue;
        }
        const op = expression[index + 2] === "=" ? `${c}==` : `${c}=`;
        return { index, op };
      }
    }
    return null;
  }
  function resolvePath(vals, expression) {
    const head = expression.match(IDENT_RE);
    if (!head) {
      return void 0;
    }
    let current = vals == null ? void 0 : vals[head[0]];
    let index = head[0].length;
    while (index < expression.length) {
      if (expression[index] === ".") {
        const m =
          expression.slice(index + 1).match(IDENT_RE) ||
          expression.slice(index + 1).match(/^\d+/);
        if (!m) {
          return void 0;
        }
        current = current == null ? void 0 : current[m[0]];
        index += 1 + m[0].length;
      } else if (expression[index] === "[") {
        let depth = 1;
        let index_ = index + 1;
        while (index_ < expression.length && depth > 0) {
          if (expression[index_] === "[") depth++;
          else if (expression[index_] === "]") {
            depth--;
            if (depth === 0) break;
          }
          index_++;
        }
        if (depth !== 0) return void 0;
        const key = resolve(vals, expression.slice(index + 1, index_));
        current = current == null ? void 0 : current[key];
        index = index_ + 1;
      } else {
        return void 0;
      }
    }
    return current;
  }

  // src/encode.ts
  const CAMEL_ATTR = "sc-camel-";
  const INLINE_TEXT_TAGS = new Set(
    "a abbr b bdi bdo br cite code del dfn em i ins kbd mark q s samp small span strike strong sub sup u var wbr".split(
      " "
    )
  );
  const RAW_WRAP = {
    select: "sc-raw-select",
    table: "sc-raw-table",
    tbody: "sc-raw-tbody",
    thead: "sc-raw-thead",
    tfoot: "sc-raw-tfoot",
    tr: "sc-raw-tr",
    td: "sc-raw-td",
    th: "sc-raw-th",
    caption: "sc-raw-caption",
  };
  const RAW_UNWRAP = Object.fromEntries(
    Object.entries(RAW_WRAP).map(([k, v]) => [v, k])
  );
  const EVENT_MAP = {
    onclick: "onClick",
    onchange: "onChange",
    oninput: "onInput",
    onsubmit: "onSubmit",
    onkeydown: "onKeyDown",
    onkeyup: "onKeyUp",
    onkeypress: "onKeyPress",
    onmousedown: "onMouseDown",
    onmouseup: "onMouseUp",
    onmouseenter: "onMouseEnter",
    onmouseleave: "onMouseLeave",
    onfocus: "onFocus",
    onblur: "onBlur",
    ondoubleclick: "onDoubleClick",
    oncontextmenu: "onContextMenu",
    onmousemove: "onMouseMove",
    onmouseover: "onMouseOver",
    onmouseout: "onMouseOut",
    onpointerdown: "onPointerDown",
    onpointerup: "onPointerUp",
    onpointermove: "onPointerMove",
    onpointerenter: "onPointerEnter",
    onpointerleave: "onPointerLeave",
    onpointercancel: "onPointerCancel",
    onpointerover: "onPointerOver",
    onpointerout: "onPointerOut",
    ongotpointercapture: "onGotPointerCapture",
    onlostpointercapture: "onLostPointerCapture",
    ontouchstart: "onTouchStart",
    ontouchend: "onTouchEnd",
    ontouchmove: "onTouchMove",
    ontouchcancel: "onTouchCancel",
    ondragstart: "onDragStart",
    ondragend: "onDragEnd",
    ondragenter: "onDragEnter",
    ondragleave: "onDragLeave",
    ondragover: "onDragOver",
    onanimationstart: "onAnimationStart",
    onanimationend: "onAnimationEnd",
    onanimationiteration: "onAnimationIteration",
    ontransitionend: "onTransitionEnd",
  };
  const ATTRS = `(?:[^>"']|"[^"]*"|'[^']*')*`;
  const IMPORT_SELF_CLOSE_RE = new RegExp(
    `<(x-import|dc-import)(${ATTRS})/>`,
    "gi"
  );
  const CAMEL_ATTR_RE = /(\s)([a-z]+[A-Z][A-Za-z0-9]*)(\s*=)/g;
  function encodeCamelAttributes(html) {
    return html.replaceAll(
      CAMEL_ATTR_RE,
      (_, sp, name, eq) =>
        sp +
        CAMEL_ATTR +
        name.replace(/[A-Z]/g, (c) => "-" + c.toLowerCase()) +
        eq
    );
  }
  function encodeCase(html) {
    html = html.replaceAll(
      IMPORT_SELF_CLOSE_RE,
      (_, t, a) => `<${t}${a}></${t}>`
    );
    html = html.replaceAll(/<helmet(\s|>)/gi, "<sc-helmet$1");
    html = html.replaceAll(/<\/helmet\s*>/gi, "</sc-helmet>");
    html = encodeCamelAttributes(html);
    for (const [real, alias] of Object.entries(RAW_WRAP)) {
      html = html.replace(
        new RegExp(`(</?)${real}(?=[\\s>])`, "gi"),
        `$1${alias}`
      );
    }
    return html;
  }
  function kebabToCamel(s) {
    return s.replaceAll(/-([a-z])/g, (_, c) => c.toUpperCase());
  }
  function cssToObject(css) {
    const o = {};
    for (const declaration of css.split(";")) {
      const index = declaration.indexOf(":");
      if (index === -1) {
        continue;
      }
      const property = declaration.slice(0, index).trim();
      o[property.startsWith("--") ? property : kebabToCamel(property)] =
        declaration.slice(index + 1).trim();
    }
    return o;
  }
  function compileAttribute(raw) {
    const whole = raw.match(/^\s*\{\{([\s\S]+?)\}\}\s*$/);
    if (whole) {
      const path = whole[1];
      return (vals) => resolve(vals, path);
    }
    if (raw.includes("{{")) {
      const parts = raw.split(/\{\{([\s\S]+?)\}\}/g);
      return (vals) =>
        parts
          .map((s, index) => (index & 1 ? (resolve(vals, s) ?? "") : s))
          .join("");
    }
    return () => raw;
  }

  // src/compile.ts
  function collectProperties(node, kind, host) {
    const propertyGetters = [];
    const pseudoClasses = [];
    let hintSize = null;
    for (const { name, value } of [...node.attributes]) {
      if (name === "sc-name" || name === "data-dc-tpl") continue;
      let key = name;
      if (key.startsWith(CAMEL_ATTR))
        key = kebabToCamel(key.slice(CAMEL_ATTR.length));
      if (key === "hint-size") {
        hintSize = value;
        continue;
      }
      if (key.startsWith("style-")) {
        pseudoClasses.push(host.pseudoClass(key.slice(6), value));
        continue;
      }
      if (kind !== "dom") {
        if (
          key.includes("-") &&
          !(
            kind === "x-import" &&
            (key.startsWith("aria-") || key.startsWith("data-"))
          )
        )
          key = kebabToCamel(key);
      } else {
        if (key === "class") key = "className";
        else if (key === "for") key = "htmlFor";
        else if (key.startsWith("on"))
          key = EVENT_MAP[key] || "on" + key[2].toUpperCase() + key.slice(3);
      }
      propertyGetters.push([key, compileAttribute(value)]);
    }
    return { propGetters: propertyGetters, pseudoClasses, hintSize };
  }
  let HOST_STYLE_PROPS = /* @__PURE__ */ new Set([
    "position",
    "left",
    "right",
    "top",
    "bottom",
    "inset",
    "width",
    "height",
    "z-index",
    "transform",
  ]);
  function hostPositionStyle(style) {
    const all =
      typeof style === "string"
        ? cssToObject(style)
        : style != null && typeof style === "object"
          ? style
          : null;
    if (!all) {
      return void 0;
    }
    const out = {};
    for (const [k, v] of Object.entries(all)) {
      const kebab = k.replaceAll(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);
      if (HOST_STYLE_PROPS.has(kebab)) {
        out[k] = v;
      }
    }
    return Object.keys(out).length ? out : void 0;
  }
  function compileTemplate(html, host) {
    const tpl = document.createElement("template");
    //! nosemgrep: direct-inner-html-assignment
    tpl.innerHTML = encodeCase(html);
    let tplN = 0;
    (function stamp(node) {
      if (node.nodeType === Node.ELEMENT_NODE) {
        node.setAttribute("data-dc-tpl", String(tplN++));
      }
      for (const c of node.childNodes) {
        stamp(c);
      }
    })(tpl.content);
    const builders = walkChildren(tpl.content, host);
    const render = (vals, ctx) => builders.map((b, i) => b(vals || {}, ctx, i));
    render.__annotated = tpl.getHTML();
    return render;
  }
  function walkChildren(node, host) {
    return [...node.childNodes]
      .map((c) => walk(c, host))
      .filter((b) => b != null);
  }
  let SLIDE_ID_VALUE_RE = /^[0-9a-f]{8}$/;
  let DECK_CONTROL_FLOW_RE = /^(sc-if|sc-for|sc-else|dc-import|x-import)$/;
  let DECK_AUX_RE = /^(template|script|style|sc-helmet|helmet)$/;
  function isDeckMountTag(element) {
    if (element.localName === "deck-stage") return true;
    return (
      element.localName === "x-import" &&
      (element.getAttribute("component-from-global-scope") || "") ===
        "deck-stage"
    );
  }
  function walkDeckChildren(element, host) {
    const pairs = [...element.childNodes]
      .map((c) => ({ c, b: walk(c, host) }))
      .filter((p) => p.b !== null);
    const kids = pairs.map((p) => p.b);
    const seen = /* @__PURE__ */ new Set();
    const wsSeen = /* @__PURE__ */ new Map();
    const keys = [];
    const nextSlideId = new Array(pairs.length);
    {
      let upcoming = null;
      for (let index = pairs.length - 1; index >= 0; index--) {
        const n = pairs[index].c;
        if (n.nodeType === Node.ELEMENT_NODE) {
          const t = n.localName;
          upcoming =
            !DECK_AUX_RE.test(t) && !DECK_CONTROL_FLOW_RE.test(t)
              ? n.getAttribute("data-om-slide-id")
              : null;
        }
        nextSlideId[index] = upcoming;
      }
    }
    for (const [j, { c }] of pairs.entries()) {
      if (c.nodeType === Node.TEXT_NODE) {
        if ((c.nodeValue ?? "").trim() === "") {
          const base = nextSlideId[j]
            ? "omid-ws:" + nextSlideId[j]
            : "omid-ws:aux";
          const n = wsSeen.get(base) ?? 0;
          wsSeen.set(base, n + 1);
          keys.push(n === 0 ? base : `${base}:${n}`);
          continue;
        }
        return { kids, keys: null };
      }
      if (c.nodeType !== Node.ELEMENT_NODE) {
        keys.push(j);
        continue;
      }
      const child = c;
      const tag = child.localName;
      if (DECK_AUX_RE.test(tag)) {
        keys.push(j);
        continue;
      }
      if (DECK_CONTROL_FLOW_RE.test(tag)) {
        return { kids, keys: null };
      }
      const v = child.getAttribute("data-om-slide-id");
      if (!v || !SLIDE_ID_VALUE_RE.test(v) || seen.has(v)) {
        return { kids, keys: null };
      }
      seen.add(v);
      keys.push(`omid:${v}`);
    }
    return { kids, keys };
  }
  function renderDeckKids(kids, kidKeys, vals, context) {
    return kids.map((b, j) => {
      const k = kidKeys ? kidKeys[j] : j;
      const out = b(vals, context, k);
      return kidKeys != null && typeof out === "string"
        ? h(getReact().Fragment, { key: k }, out)
        : out;
    });
  }
  function walk(node, host) {
    if (node.nodeType === Node.TEXT_NODE) {
      return walkText(node);
    }
    if (node.nodeType !== Node.ELEMENT_NODE) {
      return null;
    }
    const element = node;
    const tag = element.tagName.toLowerCase();
    if (tag === "sc-for") return walkFor(element, host);
    if (tag === "sc-if") return walkIf(element, host);
    if (tag === "x-import") return walkXImport(element, host);
    if (tag === "sc-helmet") return host.helmet(element);
    if (tag === "dc-import") return walkComponent(element, host);
    return walkElement(element, host);
  }
  let warnedHoles = /* @__PURE__ */ new Set();
  function warnUnresolved(context, what) {
    const key = (context?.__name || "?") + "\0" + what;
    if (warnedHoles.has(key)) return;
    warnedHoles.add(key);
    console.warn(
      "[dc-runtime] " + (context?.__name || "template") + ": " + what
    );
  }
  function walkText(node) {
    const txt = node.nodeValue ?? "";
    if (!txt.includes("{{")) {
      if (!txt.trim() && !txt.includes(" ")) {
        return null;
      }
      return () => txt;
    }
    const parts = txt.split(/\{\{([\s\S]+?)\}\}/g);
    return (vals, context, key) =>
      h(
        getReact().Fragment,
        { key },
        ...parts.map((p, i) => {
          if (!(i & 1)) return p;
          const v = resolve(vals, p);
          if (v === void 0) {
            if (!context?.__streamingNow) {
              if (document.body?.hasAttribute("data-dc-editor-on")) {
                return h(
                  "span",
                  { key: i, className: "sc-interp sc-unresolved" },
                  "{{ " + p.trim() + " }}"
                );
              }
              warnUnresolved(
                context,
                `{{ ${p.trim()} }} never resolved \u2014 rendered as empty`
              );
              return null;
            }
            return h(
              "span",
              { key: i, className: "sc-interp sc-missing" },
              p.trim()
            );
          }
          if (getReact().isValidElement(v) || Array.isArray(v)) {
            return h(getReact().Fragment, { key: i }, v);
          }
          if (v === null || typeof v === "boolean") {
            return null;
          }
          return h("span", { key: i, className: "sc-interp" }, String(v));
        })
      );
  }
  function walkFor(element, host) {
    const listGet = compileAttribute(element.getAttribute("list") || "");
    const asName = element.getAttribute("as") || "item";
    const hintN = parseInt(
      element.getAttribute("hint-placeholder-count") || "0",
      10
    );
    const kids = walkChildren(element, host);
    const listSrc = element.getAttribute("list") || "";
    return (vals, context, key) => {
      let list = listGet(vals);
      if (!Array.isArray(list)) {
        if (!context?.__streamingNow) {
          if (list !== void 0 && list !== null) {
            warnUnresolved(
              context,
              'sc-for list="' +
                listSrc +
                '" is not an array (' +
                typeof list +
                ")"
            );
          }
          list = [];
        } else {
          list = hintN > 0 ? Array(hintN).fill(void 0) : [];
        }
      }
      return h(
        getReact().Fragment,
        { key },
        list.map((item, i) => {
          const sub = { ...vals, [asName]: item, $index: i };
          return h(
            getReact().Fragment,
            { key: i },
            kids.map((b, j) => b(sub, context, j))
          );
        })
      );
    };
  }
  function walkIf(element, host) {
    const valGet = compileAttribute(element.getAttribute("value") || "");
    const hintRaw = element.getAttribute("hint-placeholder-val");
    const hintGet = hintRaw != null ? compileAttribute(hintRaw) : null;
    const kids = walkChildren(element, host);
    return (vals, context, key) => {
      let v = valGet(vals);
      if (v === void 0 && hintGet && context?.__streamingNow) v = hintGet(vals);
      return v
        ? h(
            getReact().Fragment,
            { key },
            kids.map((b, j) => b(vals, context, j))
          )
        : null;
    };
  }
  function walkComponent(element, host) {
    const name =
      element.getAttribute("name") || element.getAttribute("component") || "";
    element.removeAttribute("name");
    element.removeAttribute("component");
    const tplId = element.getAttribute("data-dc-tpl");
    const styleRaw = element.getAttribute("style");
    element.removeAttribute("style");
    const styleGet = styleRaw != null ? compileAttribute(styleRaw) : null;
    const { propGetters, hintSize } = collectProperties(
      element,
      "dc-import",
      host
    );
    const kids = walkChildren(element, host);
    return (vals, context, key) => {
      const props = {
        key,
        __hintSize: hintSize,
        __tplId: tplId,
        __hostStyle: styleGet ? hostPositionStyle(styleGet(vals)) : void 0,
      };
      for (const [k, g] of propGetters) {
        const v = g(vals);
        if (k === "dcProps") {
          if (v && typeof v === "object") Object.assign(props, v);
          continue;
        }
        props[k] = v;
      }
      if (kids.length) props.children = kids.map((b, j) => b(vals, context, j));
      return h(host.component(name), props);
    };
  }
  function walkXImport(element, host) {
    const globalNameGet = compileAttribute(
      element.getAttribute("component-from-global-scope") || ""
    );
    const exportNameGet = compileAttribute(
      element.getAttribute("component") || element.getAttribute("name") || ""
    );
    const fromRaw =
      element.getAttribute("from") ||
      (element.getAttribute("component-from-global-scope")
        ? ""
        : element.getAttribute("src") || element.getAttribute("import") || "");
    const urls = fromRaw.trim() ? fromRaw.trim().split(/\s+/) : [];
    const url = urls.length ? urls[urls.length - 1] : "";
    const kindOf = (u) => (/\.(jsx|tsx)(\?|#|$)/i.test(u) ? "jsx" : "js");
    const tplId = element.getAttribute("data-dc-tpl");
    const styleRaw = element.getAttribute("style");
    element.removeAttribute("style");
    const styleGet = styleRaw != null ? compileAttribute(styleRaw) : null;
    const isWrap = tplId != null || styleGet != null;
    const { propGetters, hintSize } = collectProperties(
      element,
      "x-import",
      host
    );
    const hasContent =
      element.children.length > 0 || !!(element.textContent || "").trim();
    const deckKeyed =
      hasContent && isDeckMountTag(element)
        ? walkDeckChildren(element, host)
        : null;
    const kids = deckKeyed
      ? deckKeyed.kids
      : hasContent
        ? walkChildren(element, host)
        : [];
    const kidKeys = deckKeyed?.keys ?? null;
    const urlBindable = fromRaw.includes("{{");
    if (urls.length && !urlBindable) {
      let previous;
      for (const u of urls)
        previous = host.loadExternal(kindOf(u), u, previous);
    }
    const evalName = (g, vals) => {
      const v = g(vals);
      const s = v == null ? "" : String(v);
      return s.includes("{{") ? "" : s;
    };
    return (vals, context, key) => {
      const globalName = evalName(globalNameGet, vals);
      const name = globalName || evalName(exportNameGet, vals);
      const C =
        !name || urlBindable
          ? null
          : globalName
            ? host.resolveExternalGlobal(url, globalName)
            : host.resolveExternal(url, name);
      const hostStyle = styleGet ? hostPositionStyle(styleGet(vals)) : void 0;
      const wrapper = isWrap
        ? {
            key,
            className: "sc-host-x",
            "data-dc-tpl": tplId,
            style: hostStyle || { display: "contents" },
          }
        : null;
      if (!C) {
        const error = urlBindable
          ? "x-import `from` cannot contain {{ \u2026 }} \u2014 module URLs are resolved at parse time; use a literal URL"
          : host.resolveExternalError(url, name);
        const ph = host.placeholder({
          key: wrapper ? void 0 : key,
          name,
          hintSize,
          error,
        });
        return wrapper ? h("div", wrapper, ph) : ph;
      }
      const properties = wrapper ? {} : { key };
      let unresolvedHole = false;
      for (const [k, g] of propGetters) {
        if (
          k === "component" ||
          k === "componentFromGlobalScope" ||
          k === "from"
        ) {
          continue;
        }
        const v = g(vals);
        if (v === void 0) unresolvedHole = true;
        if (k === "dcProps") {
          if (v && typeof v === "object") Object.assign(properties, v);
          continue;
        }
        properties[k] = v;
      }
      if (unresolvedHole && context?.__htmlStreamingNow) {
        const ph = host.placeholder({
          key: wrapper ? void 0 : key,
          name,
          hintSize,
          error: null,
        });
        return wrapper ? h("div", wrapper, ph) : ph;
      }
      if (kids.length) {
        properties.children = renderDeckKids(kids, kidKeys, vals, context);
      }
      return wrapper ? h("div", wrapper, h(C, properties)) : h(C, properties);
    };
  }
  function contentKey(element) {
    const clone = element.cloneNode(true);
    for (const d of clone.querySelectorAll("*")) {
      while (d.attributes.length) {
        d.removeAttribute(d.attributes[0].name);
      }
    }
    const s = clone.getHTML();
    let h2 = 5381;
    for (let index = 0; index < s.length; index++)
      h2 = ((h2 << 5) + h2 + s.charCodeAt(index)) | 0;
    return `${s.length}.${(h2 >>> 0).toString(36)}`;
  }
  var NEVER_CONTENT_KEYED = new Set(
    "script style textarea option title select canvas iframe video audio".split(
      " "
    )
  );
  var NOT_INLINE_SELECTOR = `:not(${[...INLINE_TEXT_TAGS].join(",")})`;
  function walkElement(element, host) {
    const realTag = RAW_UNWRAP[element.localName] || element.localName;
    const tplId = element.getAttribute("data-dc-tpl");
    const isInlineOnly =
      element.childNodes.length > 0 &&
      !NEVER_CONTENT_KEYED.has(realTag) &&
      element.querySelector(NOT_INLINE_SELECTOR) === null;
    const keySuffix = isInlineOnly ? `|${contentKey(element)}` : "";
    const { propGetters, pseudoClasses } = collectProperties(
      element,
      "dom",
      host
    );
    const deckKeyed = isDeckMountTag(element)
      ? walkDeckChildren(element, host)
      : null;
    const kids = deckKeyed ? deckKeyed.kids : walkChildren(element, host);
    const kidKeys = deckKeyed?.keys ?? null;
    return (vals, context, key) => {
      const properties = {
        key: key + keySuffix,
        "data-dc-tpl": tplId,
      };
      for (const [k, g] of propGetters) {
        let v = g(vals);
        if (k === "style" && typeof v === "string") {
          v = cssToObject(v);
        }
        if ((k === "value" || k === "checked") && v === void 0) {
          v = k === "checked" ? false : "";
        }
        properties[k] = v;
      }
      if (pseudoClasses.length) {
        properties.className = [properties.className, ...pseudoClasses]
          .filter(Boolean)
          .join(" ");
      }
      return h(
        realTag,
        properties,
        ...renderDeckKids(kids, kidKeys, vals, context)
      );
    };
  }

  // src/logic.ts
  const StreamableLogic = class {
    constructor(properties) {
      __publicField(this, "props");
      __publicField(this, "state", {});
      /**
      Back-pointer to the wrapper component, installed after construction.
      */
      __publicField(this, "__host");
      this.props = properties || {};
    }
    setState(update, callback) {
      this.__host && this.__host.__setLogicState(update, callback);
    }
    forceUpdate() {
      this.__host && this.__host.forceUpdate();
    }
    componentDidMount() {}
    componentDidUpdate(_previousProperties) {}
    componentWillUnmount() {}
    /**
    The flat object the template renders against (merged over props).
    */
    renderVals() {
      return {};
    }
  };
  function evalDcLogic(source) {
    //! nosemgrep: eval-and-function-constructor
    const function_ = new Function(
      "DCLogic",
      "StreamableLogic",
      "React",
      `${source}\n;return (typeof Component!=="undefined"&&Component)||undefined;`
    );
    return function_(StreamableLogic, StreamableLogic, getReact());
  }

  // src/component.ts
  function shallowEqual(a, b) {
    if (!b) {
      return false;
    }
    const ak = Object.keys(a).filter((k) => k !== "children");
    const bk = Object.keys(b).filter((k) => k !== "children");
    if (ak.length !== bk.length) {
      return false;
    }
    for (const k of ak) {
      if (a[k] !== b[k]) {
        return false;
      }
    }
    return true;
  }
  function Placeholder({ name, hintSize, streaming, error }) {
    const [w, hgt] = (hintSize || "100%,60px").split(",", 2);
    return h(
      "div",
      {
        className: `sc-placeholder${streaming ? " sc-streaming" : ""}`,
        style: { width: w.trim(), height: hgt && hgt.trim() },
        title: name,
      },
      error
        ? h(
            "div",
            { className: "sc-placeholder-error" },
            (name ? `${name}: ` : "") + error
          )
        : null
    );
  }
  function hintToMin(hint) {
    if (!hint) {
      return void 0;
    }
    const [w, hgt] = hint.split(",", 2);
    return { minWidth: w.trim(), minHeight: hgt && hgt.trim() };
  }
  function createComponentFactory(registry, ensureFetched) {
    const React = getReact();
    const AncestorContext = React.createContext([]);
    class StreamableComponent extends React.Component {
      constructor(properties) {
        super(properties);
        __publicField(this, "__name");
        __publicField(this, "__sub");
        __publicField(this, "__needsDidMount", false);
        /** Snapshot of the registry's streaming flags taken at render time —
         *  builders read it off the RenderCtx (this) to pick placeholder vs
         *  render-nothing for unresolved values. */
        __publicField(this, "__streamingNow", false);
        __publicField(this, "__htmlStreamingNow", false);
        /** When a construct throws, remember the (class, registry.ver, props)
         *  triple so render-time reconcile doesn't re-attempt it on every parent
         *  re-render. A registry bump (new class, template, external module
         *  resolving via bumpAll) changes `ver` and breaks the memo so an
         *  env-dependent constructor can self-heal. */
        __publicField(this, "__failedLogic", null);
        __publicField(this, "__failedUserProps", null);
        __publicField(this, "__failedVer", -1);
        /** Per-instance constructor error — kept here (not on the registry entry)
         *  so one instance's successful construct can't hide a sibling's failure,
         *  and a construct can never wipe an eval error `updateJs` recorded on
         *  `r.logicError`. */
        __publicField(this, "__ctorError", null);
        __publicField(this, "logic");
        this.__name = properties.__name;
        this.state = { __v: 0, __err: null };
        this.__sub = () => {
          if (this.state.__err) {
            this.setState({ __err: null });
          }
          this.forceUpdate();
        };
        this.__makeLogic(registry.get(this.__name).Logic, null);
        ensureFetched(this.__name);
      }
      /** Error-boundary hook: a render crash anywhere in this DC's subtree
       *  (its own template, an x-import'd component, a child DC without its
       *  own deeper boundary) lands here instead of unmounting the page. */
      static getDerivedStateFromError(e) {
        return {
          __err: Error.isError(e) && e.message ? e.message : String(e),
        };
      }
      componentDidCatch(e, info) {
        console.error(
          `[dc-runtime] render error in <${this.__name}>:`,
          e,
          info?.componentStack || ""
        );
      }
      /** Instantiate the logic class (or the no-op base) and adopt `prevState`
       *  over its initial state — used both at mount and on hot-swap. */
      __makeLogic(Logic, previousState) {
        const L = Logic || StreamableLogic;
        try {
          this.logic = new L(this.__userProps());
          this.__failedLogic = null;
          this.__failedUserProps = null;
          this.__ctorError = null;
        } catch (error) {
          console.error(error);
          this.__failedLogic = Logic;
          this.__failedUserProps = this.__userProps();
          this.__failedVer = registry.get(this.__name).ver;
          this.__ctorError = `${this.__name}: ${
            error instanceof Error && error.message
              ? error.message
              : String(error)
          }`;
          this.logic = new StreamableLogic(this.__userProps());
        }
        this.logic.__host = this;
        if (previousState) {
          this.logic.state = { ...this.logic.state, ...previousState };
        }
      }
      /** The props the author's logic + template see — internal __-prefixed
       *  wiring stripped. */
      __userProps() {
        const { __name, __hintSize, __tplId, __hostStyle, ...rest } =
          this.props;
        return rest;
      }
      __setLogicState(update, callback) {
        const previous = this.logic.state;
        const patch = typeof update === "function" ? update(previous) : update;
        this.logic.state = { ...previous, ...patch };
        this.setState((s) => ({ __v: s.__v + 1 }), callback);
      }
      /** Swap the logic instance when the registry's Logic class changed
       *  (streaming completion, hot reload). State carries over; didMount
       *  re-fires after the swap commits so refs exist. */
      __reconcileLogic() {
        const r = registry.get(this.__name);
        const Next = r.Logic;
        const Current = this.logic.constructor;
        if (
          Next === Current ||
          (!Next && Current === StreamableLogic) ||
          (Next === this.__failedLogic &&
            r.ver === this.__failedVer &&
            shallowEqual(this.__userProps(), this.__failedUserProps))
        ) {
          return;
        }
        if (!this.__needsDidMount) {
          try {
            this.logic.componentWillUnmount();
          } catch (error) {
            console.error(error);
          }
        }
        this.__makeLogic(Next, this.logic.state);
        this.__needsDidMount = true;
      }
      componentDidMount() {
        registry.get(this.__name).subs.add(this.__sub);
        try {
          this.logic.componentDidMount();
        } catch (error) {
          console.error(error);
        }
      }
      componentDidUpdate(previousProperties) {
        this.logic.props = this.__userProps();
        if (this.__needsDidMount) {
          if (this.state.__err || !registry.get(this.__name).tpl) {
            return;
          }
          this.__needsDidMount = false;
          try {
            this.logic.componentDidMount();
          } catch (error) {
            console.error(error);
          }
        } else {
          try {
            this.logic.componentDidUpdate(previousProperties);
          } catch (error) {
            console.error(error);
          }
        }
      }
      componentWillUnmount() {
        registry.get(this.__name).subs.delete(this.__sub);
        if (!this.__needsDidMount) {
          try {
            this.logic.componentWillUnmount();
          } catch (error) {
            console.error(error);
          }
        }
      }
      render() {
        const r = registry.get(this.__name);
        const cls = `sc-host${
          r.htmlStreaming ? " sc-streaming-html" : ""
        }${r.jsStreaming ? " sc-streaming-js" : ""}`;
        const hintStyle = r.htmlStreaming
          ? hintToMin(this.props.__hintSize)
          : void 0;
        const hostStyle =
          this.props.__hostStyle || hintStyle
            ? { ...hintStyle, ...this.props.__hostStyle }
            : void 0;
        const hostBase = {
          className: cls,
          style: hostStyle,
          "data-sc-name": this.__name,
          "data-dc-tpl": this.props.__tplId,
        };
        const chain = Array.isArray(this.context) ? this.context : [];
        if (chain.includes(this.__name)) {
          const cycle = [
            ...chain.slice(chain.indexOf(this.__name)),
            this.__name,
          ].join(" \u{2192} ");
          return h(
            "div",
            { ...hostBase, className: `${cls} sc-has-error` },
            h(Placeholder, {
              name: this.__name,
              hintSize: this.props.__hintSize,
              error: `circular import: ${cycle}`,
            })
          );
        }
        if (this.state.__err) {
          return h(
            "div",
            { ...hostBase, className: `${cls} sc-has-error` },
            h(
              "div",
              { className: "sc-logic-error", "data-omelette-chrome": "" },
              `${this.__name}: ${this.state.__err}`
            ),
            h(Placeholder, {
              name: this.__name,
              hintSize: this.props.__hintSize,
              error: this.state.__err,
            })
          );
        }
        this.__reconcileLogic();
        if (!r.tpl) {
          return h(
            "div",
            hostBase,
            h(Placeholder, {
              name: this.__name,
              hintSize: this.props.__hintSize,
            })
          );
        }
        const userProperties = this.__userProps();
        this.logic.props = userProperties;
        let vals = userProperties;
        let renderError = r.logicError || this.__ctorError;
        try {
          vals = { ...userProperties, ...this.logic.renderVals() };
        } catch (error) {
          console.error(error);
          renderError = `${this.__name}.renderVals(): ${
            error instanceof Error && error.message
              ? error.message
              : String(error)
          }`;
        }
        this.__streamingNow = !!(r.htmlStreaming || r.jsStreaming);
        this.__htmlStreamingNow = !!r.htmlStreaming;
        return h(
          "div",
          {
            ...hostBase,
            className: cls + (renderError ? " sc-has-error" : ""),
          },
          renderError &&
            h(
              "div",
              { className: "sc-logic-error", "data-omelette-chrome": "" },
              renderError
            ),
          h(
            AncestorContext.Provider,
            { value: [...chain, this.__name] },
            r.tpl(vals, this)
          )
        );
      }
    }
    __publicField(StreamableComponent, "contextType", AncestorContext);
    const named = /* @__PURE__ */ new Map();
    function getDC(name) {
      const hit = named.get(name);
      if (hit) {
        return hit;
      }
      function Dispatcher(p) {
        const [, setTick] = React.useState(0);
        React.useEffect(() => {
          const sub = () => setTick((n) => n + 1);
          registry.get(name).subs.add(sub);
          return () => {
            registry.get(name).subs.delete(sub);
          };
        }, []);
        ensureFetched(name);
        return h(StreamableComponent, { ...p, __name: name });
      }
      Dispatcher.displayName = name;
      named.set(name, Dispatcher);
      return Dispatcher;
    }
    return {
      getDC,
      StreamableComponent,
    };
  }

  // src/bundled.ts
  function bundledBlob(url) {
    const blobs = window.__resourceBlobs;
    const b = blobs ? blobs[url.split("#", 1)[0]] : void 0;
    return b instanceof Blob ? b : null;
  }

  // src/cdn.ts
  const REACT_URL =
    "https://unpkg.com/react@18.3.1/umd/react.production.min.js";
  const REACT_SRI =
    "sha384-DGyLxAyjq0f9SPpVevD6IgztCFlnMF6oW/XQGmfe+IsZ8TqEiDrcHkMLKI6fiB/Z";
  const REACT_DOM_URL =
    "https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js";
  const REACT_DOM_SRI =
    "sha384-gTGxhz21lVGYNMcdJOyq01Edg0jhn/c22nsx0kyqP0TxaV5WVdsSH1fSDUf5YJj1";
  const BABEL_URL = "https://unpkg.com/@babel/standalone@7.29.0/babel.min.js";
  const BABEL_SRI =
    "sha384-m08KidiNqLdpJqLq95G/LEi8Qvjl/xUYll3QILypMoQ65QorJ9Lvtp2RXYGBFj1y";
  function cdnScriptFor(url, sri) {
    const res = window.__resources;
    const v = res ? res[url] : void 0;
    return typeof v === "string" && v
      ? { src: v }
      : { src: url, integrity: sri };
  }

  // src/external.ts
  const isCustomElementName = (n) => !n.includes(".") && n.includes("-");
  function isRenderableType(g) {
    if (typeof g === "function") {
      return !isElementClass(g);
    }
    return (
      typeof g === "object" && g !== null && typeof g.$$typeof === "symbol"
    );
  }
  function resolveDottedPath(root, name) {
    let current = root;
    for (const seg of name.split(".")) {
      if (current == null) {
        return void 0;
      }
      current = current[seg];
    }
    return current;
  }
  const GLOBAL_POLL_INTERVAL_MS = 50;
  const GLOBAL_POLL_TIMEOUT_MS = 3e4;
  function createExternalModules(onResolved) {
    const cache = /* @__PURE__ */ new Map();
    let babelLoading = null;
    const reportedMissing = /* @__PURE__ */ new Map();
    const polling = /* @__PURE__ */ new Set();
    function ensureBabel() {
      if (window.Babel) {
        return Promise.resolve();
      }
      if (babelLoading) {
        return babelLoading;
      }
      const babel = cdnScriptFor(BABEL_URL, BABEL_SRI);
      babelLoading = new Promise((res, rej) => {
        const s = document.createElement("script");
        s.src = babel.src;
        if (babel.integrity) {
          s.integrity = babel.integrity;
          s.crossOrigin = "anonymous";
        }
        s.addEventListener("load", () => res());
        s.onerror = rej;
        document.head.append(s);
      });
      return babelLoading;
    }
    const pending = /* @__PURE__ */ new Map();
    function load(kind, url, after) {
      const existing = pending.get(url);
      if (existing) {
        return existing;
      }
      cache.set(url, null);
      console.info("[dc-runtime] x-import: loading", url, `(${kind})`);
      const ready = Promise.all([
        kind === "jsx" ? ensureBabel() : Promise.resolve(),
        after ?? Promise.resolve(),
      ]);
      const p = ready
        .then(() => {
          const pre = bundledBlob(url);
          if (pre) {
            return pre.text();
          }
          return fetch(url).then((r) => {
            if (!r.ok) {
              throw new Error(`HTTP ${r.status}`);
            }
            return r.text();
          });
        })
        .then((source) => {
          const code =
            kind === "jsx"
              ? window.Babel.transform(source, {
                  filename: url,
                  presets: ["react", "typescript"],
                }).code
              : source;
          const module = { exports: {} };
          const before = new Set(Object.keys(window));
          //! nosemgrep: eval-and-function-constructor
          new Function("React", "module", "exports", "require", code)(
            getReact(),
            module,
            module.exports,
            () => ({})
          );
          const globals = {};
          for (const k of Object.keys(window)) {
            if (!before.has(k) && typeof window[k] === "function") {
              globals[k] = window[k];
            }
          }
          cache.set(url, { mod: module.exports, globals });
          console.info(
            "[dc-runtime] x-import: loaded",
            url,
            "\u{2014} exports:",
            Object.keys(module.exports),
            "window globals:",
            Object.keys(globals)
          );
          onResolved();
        })
        .catch((error) => {
          cache.set(url, {
            mod: {},
            globals: {},
            error: `failed to load: ${
              Error.isError(error) && error.message
                ? error.message
                : String(error)
            }`,
          });
          console.error(
            "[dc-runtime] x-import: FAILED to load",
            url,
            `(${kind})`,
            error
          );
          onResolved();
        });
      pending.set(url, p);
      return p;
    }
    function resolve2(url, name) {
      const entry = cache.get(url);
      if (!entry) {
        return null;
      }
      const { mod, globals } = entry;
      const C =
        (mod && mod[name]) ||
        (globals && globals[name]) ||
        (typeof window !== "undefined" && window[name]) ||
        (mod && mod.default);
      if (typeof C === "function") {
        return C;
      }
      const key = `${url}\0${name}`;
      if (!reportedMissing.has(key)) {
        reportedMissing.set(
          key,
          entry.error ||
            `no export named "${name}" (has: ${Object.keys(mod).join(", ")})`
        );
        console.error(
          "[dc-runtime] x-import: module",
          url,
          "loaded but has no component named",
          JSON.stringify(name),
          "\u{2014} available exports:",
          Object.keys(mod),
          "window globals:",
          Object.keys(globals),
          `. The module must \`module.exports = {${name}}\` or set \`window.${name}\`.`
        );
      }
      return null;
    }
    function waitForGlobal(name) {
      if (polling.has(name)) {
        return;
      }
      polling.add(name);
      const started = Date.now();
      const isCE = isCustomElementName(name);
      const tick = () => {
        const found = isCE
          ? customElements.get(name)
          : isRenderableType(resolveDottedPath(window, name));
        if (found) {
          polling.delete(name);
          onResolved();
          return;
        }
        if (Date.now() - started >= GLOBAL_POLL_TIMEOUT_MS) {
          console.warn(
            "[dc-runtime] x-import: global",
            JSON.stringify(name),
            `never appeared on window after ${GLOBAL_POLL_TIMEOUT_MS}ms`
          );
          return;
        }
        setTimeout(tick, GLOBAL_POLL_INTERVAL_MS);
      };
      setTimeout(tick, GLOBAL_POLL_INTERVAL_MS);
    }
    function resolveGlobal(url, name) {
      const isCE = isCustomElementName(name);
      if (!url) {
        if (isCE) {
          if (customElements.get(name)) {
            return name;
          }
          waitForGlobal(name);
          return null;
        }
        const g2 = resolveDottedPath(window, name);
        if (isRenderableType(g2)) {
          return g2;
        }
        waitForGlobal(name);
        return null;
      }
      const entry = cache.get(url);
      if (!entry) {
        return null;
      }
      if (isCE && customElements.get(name)) {
        return name;
      }
      const g = entry.globals[name] ?? resolveDottedPath(window, name);
      if (isRenderableType(g)) {
        return g;
      }
      if (name.includes(".")) {
        return null;
      }
      const key = `${url}\0global\0${name}`;
      if (!reportedMissing.has(key)) {
        reportedMissing.set(key, null);
        if (isCE && !customElements.get(name)) {
          console.warn(
            "[dc-runtime] x-import:",
            url,
            "loaded but no custom element",
            JSON.stringify(name),
            `is registered and window.${name} is not a function \u{2014} rendering <${name}> as an unknown element.`
          );
        }
      }
      return name;
    }
    function getError(url, name) {
      const entry = cache.get(url);
      if (entry?.error) {
        return entry.error;
      }
      return reportedMissing.get(`${url}\0${name}`) || null;
    }
    return { load, resolve: resolve2, resolveGlobal, getError };
  }
  function isElementClass(g) {
    try {
      return (
        typeof g === "function" &&
        typeof HTMLElement !== "undefined" &&
        g.prototype instanceof HTMLElement
      );
    } catch {
      return false;
    }
  }

  // src/atomics.ts
  const ATOMIC_CSS =
    // layout
    ".fx{display:flex}.col{display:flex;flex-direction:column}.grid{display:grid}.ac{align-items:center}.jc{justify-content:center}.jb{justify-content:space-between}.f1{flex:1}.noshrink{flex-shrink:0}.wrap{flex-wrap:wrap}.fw5{font-weight:500}.fw6{font-weight:600}.fw7{font-weight:700}.fw8{font-weight:800}.fs11{font-size:11px}.fs12{font-size:12px}.fs13{font-size:13px}.fs14{font-size:14px}.fs15{font-size:15px}.fs16{font-size:16px}.fs20{font-size:20px}.fs22{font-size:22px}.upper{text-transform:uppercase}.tc{text-align:center}.nowrap{white-space:nowrap}.gap8{gap:8px}.gap10{gap:10px}.gap12{gap:12px}.gap16{gap:16px}.gap24{gap:24px}.m0{margin:0}.mt8{margin-top:8px}.mt12{margin-top:12px}.mt16{margin-top:16px}.mb8{margin-bottom:8px}.mb12{margin-bottom:12px}.mb16{margin-bottom:16px}.posrel{position:relative}.posabs{position:absolute}.round{border-radius:50%}.ohide{overflow:hidden}.bbox{box-sizing:border-box}.pointer{cursor:pointer}.w100{width:100%}.b0{border:none}";

  // src/helmet.ts
  const DESIGN_DOC_MODE_RE =
    /<meta\b[^>]*\bname\s*=\s*["']design_doc_mode["'][^>]*\b(?:content|value)\s*=\s*["'](\w+)["']/i;
  const CANVAS_BG_LIGHT = "#f0eee6";
  const CANVAS_BG_DARK = "#2e2c26";
  function createHelmetManager(document_, isStreaming) {
    const mounted = /* @__PURE__ */ new Set();
    const live = /* @__PURE__ */ new Map();
    let designDocumentMode = null;
    let canvasStyleElement = null;
    let appTheme = "light";
    try {
      const ds = document_.documentElement.dataset.theme;
      appTheme =
        ds === "dark" || ds === "light"
          ? ds
          : new URLSearchParams(
                document_.defaultView?.location.search ?? ""
              ).get("theme") === "dark"
            ? "dark"
            : "light";
    } catch {}
    function applyCanvasBg() {
      if (!canvasStyleElement) {
        return;
      }
      const bg = appTheme === "dark" ? CANVAS_BG_DARK : CANVAS_BG_LIGHT;
      canvasStyleElement.textContent = `html,body{background:${bg}}#dc-root>.sc-host{position:relative}`;
    }
    function postDesignMode(mode) {
      if (window.parent === window) {
        return;
      }
      try {
        window.parent.postMessage({ type: "__dc_design_mode", mode }, "*");
      } catch {}
    }
    function setDesignDocumentMode(mode) {
      if (mode === designDocumentMode) return;
      designDocumentMode = mode;
      postDesignMode(mode);
      if (mode === "canvas") {
        document_.documentElement.setAttribute("data-dc-canvas", "");
        canvasStyleElement = document_.createElement("style");
        canvasStyleElement.setAttribute("data-dc-canvas", "");
        applyCanvasBg();
        document_.head.appendChild(canvasStyleElement);
      } else {
        document_.documentElement.removeAttribute("data-dc-canvas");
        canvasStyleElement?.remove();
        canvasStyleElement = null;
      }
    }
    window.addEventListener("message", (e) => {
      const type = e.data && e.data.type;
      if (type === "__dc_theme") {
        const t = e.data.theme;
        if (t === "light" || t === "dark") {
          appTheme = t;
          applyCanvasBg();
        }
        return;
      }
      if (!designDocumentMode || type !== "__dc_probe") {
        return;
      }
      postDesignMode(designDocumentMode);
    });
    function compile(node) {
      const raw = [...node.children];
      const isHelmetClosed =
        node.nextSibling != null || node.parentNode?.nextSibling != null;
      if (
        node.hasAttribute("data-dc-atomics") &&
        !mounted.has("__dc-atomics")
      ) {
        mounted.add("__dc-atomics");
        const element = document_.createElement("style");
        element.id = "__dc-atomics";
        element.textContent = ATOMIC_CSS;
        document_.head.appendChild(element);
      }
      return (_vals, context) => {
        const name = (context && context.__name) || "";
        const streaming = !!(name && isStreaming(name));
        for (let index = 0; index < raw.length; index++) {
          const child = raw[index];
          const tag = child.tagName;
          const mayBePartial =
            streaming && !isHelmetClosed && index === raw.length - 1;
          if (tag === "SCRIPT") {
            if (mayBePartial) {
              continue;
            }
            const key =
              "SCRIPT|" +
              (child.getAttribute("src") || child.textContent || "");
            if (mounted.has(key)) {
              continue;
            }
            mounted.add(key);
            const element = document_.createElement("script");
            for (const { name: an, value } of [...child.attributes])
              element.setAttribute(an, value);
            if (child.textContent) element.textContent = child.textContent;
            document_.head.appendChild(element);
          } else if (tag === "LINK" || tag === "META") {
            if (mayBePartial) {
              continue;
            }
            const key =
              tag +
              "|" +
              (child.getAttribute("href") ||
                child.getAttribute("src") ||
                child.outerHTML);
            if (mounted.has(key)) {
              continue;
            }
            mounted.add(key);
            if (tag === "LINK") {
              const rel = new Set(
                (child.getAttribute("rel") || "").toLowerCase().split(/\s+/)
              );
              const href = (child.getAttribute("href") || "").trim();
              const res = window.__resources;
              const pre =
                res && rel.has("stylesheet") && !rel.has("alternate")
                  ? res[href]
                  : void 0;
              const blob =
                typeof pre === "string" && pre ? bundledBlob(pre) : null;
              if (blob) {
                const element = document_.createElement("style");
                if (child.hasAttribute("disabled")) {
                  element.setAttribute("media", "not all");
                } else if (child.getAttribute("media")) {
                  element.setAttribute("media", child.getAttribute("media"));
                }
                if (child.getAttribute("title"))
                  element.setAttribute("title", child.getAttribute("title"));
                void blob.text().then((css) => {
                  element.textContent = css;
                });
                document_.head.appendChild(element);
                continue;
              }
            }
            document_.head.append(child.cloneNode(true));
          } else {
            const key = `${name}|${index}`;
            let element = live.get(key);
            if (!element || element.tagName !== tag) {
              if (element) {
                element.remove();
              }
              element = document_.createElement(tag.toLowerCase());
              live.set(key, element);
              document_.head.append(element);
            }
            for (const { name: an, value } of child.attributes) {
              if (element.getAttribute(an) !== value) {
                element.setAttribute(an, value);
              }
            }
            if (element.textContent !== child.textContent) {
              element.textContent = child.textContent;
            }
          }
        }
        return null;
      };
    }
    return { compile, setDesignDocMode: setDesignDocumentMode };
  }

  // src/pseudo.ts
  function scanUnquotedUrl(css, index) {
    if (
      (css[index] !== "u" && css[index] !== "U") ||
      css.slice(index, index + 4).toLowerCase() !== "url(" ||
      /[a-z0-9_-]/i.test(css[index - 1] ?? "")
    ) {
      return -1;
    }
    let index_ = index + 4;
    while (index_ < css.length && /\s/.test(css[index_])) {
      index_++;
    }
    if (css[index_] === '"' || css[index_] === "'") {
      return -1;
    }
    while (index_ < css.length && css[index_] !== ")") {
      if (css[index_] === "\\") {
        index_++;
      }
      index_++;
    }
    return index_ < css.length ? index_ + 1 : css.length;
  }
  function stripComments(css) {
    let out = "";
    let quote = "";
    for (let index = 0; index < css.length; index++) {
      const c = css[index];
      if (quote) {
        if (c === "\\") {
          out += c + (css[index + 1] ?? "");
          index++;
          continue;
        }
        if (c === quote) {
          quote = "";
        }
        out += c;
      } else if (c === "'" || c === '"') {
        quote = c;
        out += c;
      } else if (c === "/" && css[index + 1] === "*") {
        const end = css.indexOf("*/", index + 2);
        index = end === -1 ? css.length : end + 1;
        out += " ";
      } else {
        const end = scanUnquotedUrl(css, index);
        if (end === -1) {
          out += c;
        } else {
          out += css.slice(index, end);
          index = end - 1;
        }
      }
    }
    return out;
  }
  function importantify(css) {
    css = stripComments(css);
    const declarations = [];
    let start = 0;
    let depth = 0;
    let quote = "";
    for (let index = 0; index < css.length; index++) {
      const c = css[index];
      if (quote) {
        if (c === "\\") {
          index++;
        } else if (c === quote) {
          quote = "";
        }
      } else {
        switch (c) {
          case "'":
          case '"': {
            quote = c;
            break;
          }
          case "(": {
            depth++;
            break;
          }
          case ")": {
            depth = Math.max(0, depth - 1);
            break;
          }
          default:
            if (c === ";" && depth === 0) {
              declarations.push(css.slice(start, index));
              start = index + 1;
            } else {
              const end = scanUnquotedUrl(css, index);
              if (end !== -1) index = end - 1;
            }
        }
      }
    }
    declarations.push(css.slice(start));
    return declarations
      .map((d) => d.trim())
      .filter(Boolean)
      .map((d) => (/!\s*important$/i.test(d) ? d : `${d} !important`))
      .join(";");
  }
  function createPseudoSheet(document_) {
    let element = null;
    const cache = /* @__PURE__ */ new Map();
    let n = 0;
    return (pseudo, css) => {
      const k = `${pseudo}|${css}`;
      const hit = cache.get(k);
      if (hit) {
        return hit;
      }
      if (!element) {
        element = document_.createElement("style");
        document_.head.append(element);
      }
      const cls = `scp${(n++).toString(36)}`;
      const isPseudoElement = pseudo === "before" || pseudo === "after";
      const sel = isPseudoElement ? `.${cls}::${pseudo}` : `.${cls}:${pseudo}`;
      element.sheet.insertRule(
        `${sel}{${isPseudoElement ? css : importantify(css)}}`,
        element.sheet.cssRules.length
      );
      cache.set(k, cls);
      return cls;
    };
  }

  // src/registry.ts
  function createRegistry() {
    const entries = /* @__PURE__ */ Object.create(null);
    function get(name) {
      return (
        entries[name] ||
        (entries[name] = {
          html: "",
          tpl: null,
          Logic: null,
          jsStreaming: false,
          htmlStreaming: false,
          ver: 0,
          subs: /* @__PURE__ */ new Set(),
          fetched: false,
        })
      );
    }
    function bump(name) {
      const r = get(name);
      r.ver++;
      for (const function_ of r.subs) {
        function_();
      }
    }
    return {
      entries,
      get,
      bump,
      bumpAll() {
        for (const n in entries) {
          bump(n);
        }
      },
    };
  }

  // src/runtime.ts
  const COMPONENT_DIR = ".";
  function createRuntime(document_ = document) {
    const registry = createRegistry();
    const pseudoClass = createPseudoSheet(document_);
    const helmet = createHelmetManager(
      document_,
      (name) => registry.get(name).htmlStreaming
    );
    const external = createExternalModules(() => registry.bumpAll());
    const factory = createComponentFactory(registry, ensureFetched);
    const host = {
      component: (name) => factory.getDC(name),
      placeholder: (properties) => h(Placeholder, properties),
      helmet: (node) => helmet.compile(node),
      loadExternal: (kind, url, after) => external.load(kind, url, after),
      resolveExternal: (url, name) => external.resolve(url, name),
      resolveExternalGlobal: (url, name) => external.resolveGlobal(url, name),
      resolveExternalError: (url, name) => external.getError(url, name),
      pseudoClass,
    };
    function ensureFetched(name) {
      const r = registry.get(name);
      if (r.fetched) {
        return;
      }
      r.fetched = true;
      const url = `${COMPONENT_DIR}/${encodeURIComponent(name)}.dc.html`;
      const res = window.__resources;
      const pre = res ? res[url] : void 0;
      const target = typeof pre === "string" && pre ? pre : url;
      const blob = bundledBlob(target);
      (blob
        ? blob.text()
        : fetch(target).then((res2) => {
            if (!res2.ok) {
              console.error(
                `[dc-runtime] sibling fetch for "${name}" failed:`,
                url,
                "returned",
                res2.status,
                "\u{2014} the reference renders as an empty placeholder."
              );
              return "";
            }
            return res2.text();
          })
      )
        .then((t) => {
          if (!t) {
            return;
          }
          const parsed = parseDcText(t);
          if (!parsed) {
            console.error(
              `[dc-runtime] sibling fetch for "${name}":`,
              url,
              "has no <x-dc> block \u{2014} not a Design Component."
            );
            return;
          }
          if (parsed.props) {
            r.propsMeta = parsed.props;
          }
          if (parsed.preview) {
            r.preview = parsed.preview;
          }
          if (parsed.template && !r.html) {
            updateHtml(name, parsed.template);
          }
          if (parsed.js && !r.Logic) {
            updateJs(name, parsed.js);
          }
        })
        .catch((error) => {
          return console.error(
            `[dc-runtime] sibling fetch for "${name}" threw:`,
            url,
            error
          );
        });
    }
    let rootName = null;
    function updateHtml(name, html) {
      const r = registry.get(name);
      r.html = html;
      if (name === rootName) {
        const mode = DESIGN_DOC_MODE_RE.exec(html)?.[1] ?? null;
        if (mode || !r.htmlStreaming) {
          helmet.setDesignDocMode(mode);
        }
      }
      try {
        r.tpl = compileTemplate(html, host);
      } catch (error) {
        console.error("[dc-runtime] template compile FAILED for", name, error);
      }
      registry.bump(name);
    }
    function updateJs(name, source) {
      const r = registry.get(name);
      const seq = (r.jsSeq = (r.jsSeq || 0) + 1);
      try {
        const Cls = evalDcLogic(source);
        if (r.jsSeq !== seq) {
          return;
        }
        if (typeof Cls === "function") {
          r.logicError = null;
          r.Logic = Cls;
        } else {
          r.logicError = `${
            name
          }.dc.html: <script data-dc-script> must define \`class Component extends DCLogic\``;
        }
      } catch (error) {
        if (r.jsSeq !== seq) {
          return;
        }
        console.error(
          "[dc-runtime] logic class eval FAILED for",
          name,
          "\u{2014} the template renders with props only.",
          error
        );
        r.logicError = `${name}: ${
          error instanceof Error && error.message
            ? error.message
            : String(error)
        }`;
      }
      registry.bump(name);
    }
    function setStreaming(name, kind, on) {
      const r = registry.get(name);
      if (kind === "html") {
        r.htmlStreaming = !!on;
      } else {
        r.jsStreaming = !!on;
      }
      let isAny = false;
      for (const n in registry.entries) {
        const e = registry.entries[n];
        if (e && (e.htmlStreaming || e.jsStreaming)) {
          isAny = true;
          break;
        }
      }
      document_.documentElement.classList.toggle("sc-dc-streaming", isAny);
      registry.bump(name);
    }
    function dcUpdate(name, kind, content, streaming) {
      if (streaming) {
        registry.get(name).fetched = true;
      }
      switch (kind) {
        case "html": {
          setStreaming(name, "html", !!streaming);
          updateHtml(name, content);

          break;
        }
        case "js": {
          setStreaming(name, "js", !!streaming);
          if (!streaming) {
            updateJs(name, content);
          }

          break;
        }
        case "props": {
          const { props, preview } = parseDataProperties(content);
          const r = registry.get(name);
          r.propsMeta = props ?? void 0;
          r.preview = preview;
          registry.bump(name);

          break;
        }
        // No default
      }
    }
    function setProperties(name, overrides) {
      registry.get(name).propOverrides =
        overrides && typeof overrides === "object" ? { ...overrides } : null;
      registry.bump(name);
    }
    function adoptParsed(name, parsed) {
      if (!parsed) {
        return;
      }
      const r = registry.get(name);
      if (parsed.props) {
        r.propsMeta = parsed.props;
      }
      if (parsed.preview) {
        r.preview = parsed.preview;
      }
      if (parsed.template) {
        updateHtml(name, parsed.template);
      }
      if (parsed.js) {
        updateJs(name, parsed.js);
      }
    }
    return {
      registry,
      getDC: factory.getDC,
      updateHtml,
      updateJs,
      dcUpdate,
      setProps: setProperties,
      adoptParsed,
      setRootName: (name) => {
        rootName = name;
      },
      markFetched: (name) => {
        registry.get(name).fetched = true;
      },
      annotatedTemplate: (name) => {
        const r = registry.get(name);
        return (r.tpl && r.tpl.__annotated) || null;
      },
      templateSource: (name) => registry.get(name).html || null,
      StreamableLogic,
    };
  }

  // src/stream-state.ts
  function createStreamTracker(staleMs = 6e4, now = Date.now) {
    const since = /* @__PURE__ */ new Map();
    const liveOne = (n) => {
      const t = since.get(n);
      if (t === void 0) {
        return false;
      }
      if (now() - t > staleMs) {
        since.delete(n);
        return false;
      }
      return true;
    };
    return {
      push(name, streaming, viewportKey) {
        if (viewportKey === "dc-model") {
          return;
        }
        if (streaming) {
          since.set(name, now());
        } else {
          since.delete(name);
        }
      },
      live(name) {
        if (name !== void 0) {
          return liveOne(name);
        }
        for (const n of since.keys()) {
          if (liveOne(n)) {
            return true;
          }
        }
        return false;
      },
    };
  }

  // src/index.ts
  function hideRawTemplate() {
    const s = document.createElement("style");
    s.textContent = "x-dc{display:none!important}";
    document.head.append(s);
  }
  function loadScript(source, integrity) {
    return new Promise((resolve2, reject) => {
      //! nosemgrep: create-script-element
      const s = document.createElement("script");
      s.src = source;
      if (integrity) {
        s.integrity = integrity;
        s.crossOrigin = "anonymous";
      }
      s.async = false;
      s.addEventListener("load", () => resolve2());
      s.onerror = () => reject(new Error(`failed to load ${source}`));
      document.head.append(s);
    });
  }
  function loadReactUmd() {
    const w = window;
    if (w.React && w.ReactDOM) {
      return Promise.resolve();
    }
    const react = cdnScriptFor(REACT_URL, REACT_SRI);
    const reactDom = cdnScriptFor(REACT_DOM_URL, REACT_DOM_SRI);
    return Promise.all([
      loadScript(react.src, react.integrity),
      loadScript(reactDom.src, reactDom.integrity),
    ]).then(() => void 0);
  }
  function init() {
    const runtime = createRuntime(document);
    let rootName = "Root";
    const baseCss = document.createElement("style");
    baseCss.textContent = BASE_CSS;
    document.head.prepend(baseCss);
    const notifyHost = () => {
      if (window.parent === window) {
        return;
      }
      const r = runtime.registry.entries[rootName];
      try {
        window.parent.postMessage(
          {
            type: "__dc_booted",
            rootName,
            propsMeta: (r && r.propsMeta) || null,
            preview: (r && r.preview) || null,
          },
          "*"
        );
      } catch {}
    };
    const streams = createStreamTracker();
    const api = {
      __dcUpdate: (name, kind, content, streaming, viewportKey) => {
        streams.push(name, streaming, viewportKey);
        runtime.dcUpdate(name, kind, content, streaming);
        if (name === rootName && !streaming && kind === "props") {
          notifyHost();
        }
      },
      __dcStreaming: (name) => streams.live(name),
      __dcSetProps: (name, overrides) => runtime.setProps(name, overrides),
      /** Name of the component currently mounted as the page root — DC tools
       *  push their template-stream here when targeting "the open page". */
      __dcRootName: () => rootName,
      /** Editor bridge — the encoded, `data-dc-tpl`-annotated template source.
       *  The host editor parses this into its own template DOM so it can map a
       *  rendered node (carrying the same `data-dc-tpl`) back to the source
       *  node that emitted it. Returns the encoded form (`sc-camel-*` attrs,
       *  `<sc-raw-*>`/`<sc-helmet>` tags); the editor decodes on serialize. */
      __dcAnnotatedTemplate: (name) => runtime.annotatedTemplate(name),
      /**
      Editor bridge — the *original* (decoded) template source.
      */
      __dcTemplateSource: (name) => runtime.templateSource(name),
      __dcBoot: () => {
        rootName = boot(runtime, document) ?? rootName;
        notifyHost();
      },
      __dcRegistry: runtime.registry.entries,
      getDC: (name) => runtime.getDC(name),
      // `DCLogic` is the documented base class name; `StreamableLogic` is the
      // implementation alias kept for any project that already references it.
      DCLogic: runtime.StreamableLogic,
      StreamableLogic: runtime.StreamableLogic,
    };
    Object.assign(window, api);
    window.__dcContentKeyed = true;
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => api.__dcBoot());
    } else {
      api.__dcBoot();
    }
  }
  hideRawTemplate();
  loadReactUmd()
    .then(init)
    .catch((error) => {
      console.error("[dc] failed to load React or boot:", error);
      throw error;
    });
})();
