function EAG() {
  let pWd = document["createElement"]("canvas");
  let Ln = pWd["getContext"]("webgl");
  return Ln["canvas"]["toDataURL"]();
}
function Bd() {
  const Q = window["navigator"]["plugins"];
  let o = [];
  for (let OL = 0; OL < Q["length"]; OL++) {
    o["push"](Q[OL]["name"]);
  }
  return o;
}
let vW = {};
vW["canvas"] = EAG();
vW["plugins"] = Bd();
console["log"](JSON["stringify"](vW));
