import { FastjsDom } from "jsfast";

const styleFunctions = new Map<string, (className: string) => string | false>();

const basicRules = [
  "flex,display: flex;",
  "flex-col,display: flex;flex-direction: column;",
  "c-left,justify-content: flex-start;align-items: center;",
  "c-right,justify-content: flex-end;align-items: center;",
  "c-center,justify-content: center;align-items: center;",
  "c-between,justify-content: space-between;align-items: center;",
  "c-around,justify-content: space-around;align-items: center;",
  "rounded,border-radius: 100%;",
]

for (const combination of basicRules) {
  const [className, style] = combination.split(",");
  styleFunctions.set(className, () => style);
}

const paramRules = [
  "size-[param],font-size: [param](px);",
  "weight-[param],font-weight: [param];",
  "color-[param],color: [param];",
  "gap-[param],gap: [param](px);",
  "w-[param],width: [param](px);",
  "h-[param],height: [param](px);",
  "wh-[param],width: [param](px);height: [param](px);",
]

for (const combination of paramRules) {
  let [template, style] = combination.split(",");
  styleFunctions.set(template, (className: string) => {
    const paramIndex = template.split("-").indexOf("[param]");
    const param = className.split("-")[paramIndex];
    const optionalUnit = /(\(.*\))/g.exec(style);

    if (optionalUnit) {
      // Param is a number, auto add unit
      if (!Number.isNaN(Number(param))) {
        style = style.replace(/\(([^\)]*)\)/g, "$1");
      } else {
        style = style.replace(/\(([^\)]*)\)/g, "");
      }
    }

    return style.replace(/\[param\]/g, param);
  });
}

export function compileStyle(dom: FastjsDom) {
  dom.children().each(compileStyle)

  const classes = dom.getClass();
  let styles = "";

  for (let className of classes) {
    let [classCompiled, classKey] = ["", ""]
    for (let key = 0; key < className.split("-").length; key++) {
      if (key !== 0) {
        classCompiled += "-"
        classKey += "-"
      }

      const item = className.split("-")[key];
      if (item.startsWith("[") && item.endsWith("]")) {
        classKey += "[param]";
        classCompiled += item.replace(/\[(.*)\]/g, "$1");
        continue;
      }
      if (!Number.isNaN(Number(item))) {
        classKey += `[param]`;
        classCompiled += item;
        continue;
      }

      classCompiled += item;
      classKey += item;
    }

    console.log(classCompiled, classKey);
    const style = styleFunctions.get(classKey);
    if (!style) continue;

    const css = style(classCompiled);
    if (!css) continue;

    styles += css;
  }

  console.log(`Compile style: ${styles}`);

  dom.setStyle(styles);
}