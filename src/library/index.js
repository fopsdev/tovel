import { app } from "../index";
import { render } from "lit-html";
export class OvlBaseElement extends HTMLElement {
    getUI() {
        return null;
    }
    constructor() {
        super();
        this.state = app.state;
        console.log("base constructor");
    }
    doRender() {
        this.trackId = app.trackState();
        let res = this.getUI();
        let paths = app.clearTrackState(this.trackId);
        if (paths.size > 0) {
            if (!this.mutationListener) {
                this.mutationListener = app.addMutationListener(paths, this.doRender);
            }
            else {
                this.mutationListener.update(paths);
            }
        }
        render(res, this);
    }
    connectedCallback() {
        console.log("base connected");
        this.doRender();
    }
    disconnectedCallback() {
        if (this.mutationListener) {
            this.mutationListener.dispose();
        }
    }
}
export class OvlSimpleElement extends OvlBaseElement {
    static getPropsTemplate() {
        return { Key: "" };
    }
}
//# sourceMappingURL=index.js.map