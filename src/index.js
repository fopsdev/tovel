import { Overmind } from "overmind";
import * as state from "./state";
import * as actions from "./actions";
import { CompA } from "./components/compa";
if (customElements.get("comp-a"))
    window.location.reload();
customElements.define("comp-a", CompA);
import { html, render } from "lit-html";
const config = {
    state,
    actions
};
export const app = new Overmind(config);
let obj = CompA.getPropsTemplate();
obj.Key = "2";
render(html `lala3<comp-a key="lolo" .props = ${obj}></comp-a>`, document.getElementById("app"));
//# sourceMappingURL=index.js.map