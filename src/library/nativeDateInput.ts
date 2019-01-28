// import { html } from "lit-html"

// import { Action, log } from "overmind"
// import { app } from ".."
// import { OvlBaseElement } from "./OvlBaseElement"

// export type NativeDateInputProps = {
//   value: { value: string }
// }

// export const changeDateValue: Action<{
//   stateRef: { value: string }
//   value: string
// }> = ({ value: value, state }) => {
//   console.log(value)
//   value.stateRef.value = value.value
// }

// export class NativeDateInput extends OvlBaseElement {
//   getData: () => NativeDateInputProps

//   initProps() {
//     super.initProps()
//   }

//   constructor() {
//     super()
//   }

//   getUI() {
//     return html`
//       <div class="o-field o-field--autocomplete">
//         <div class="date-input">
//           <input class="c-field" type="text" id="${this.id + "inp"}" />
//           <input
//             style="height:80%; width:30px;"
//             class="native"
//             id="${this.id + "inpnative"}"
//             type="date"
//           />
//         </div>
//       </div>
//     `
//   }
// }
