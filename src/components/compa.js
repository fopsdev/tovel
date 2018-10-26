import { OvlSimpleElement } from "../library/index";
import { changeFoo } from "../mutations";
//import * as untrackedState from "../state"
import { html } from "lit-html";
export class CompA extends OvlSimpleElement {
    constructor() {
        super();
        this.onclick = e => {
            changeFoo();
        };
    }
    getUI() {
        return html `
    <div>${this.state.foo}</div>
    <div>${this.props.Key}</div>
    `;
    }
}
//# sourceMappingURL=compa.js.map