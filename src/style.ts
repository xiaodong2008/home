import { FastjsDom } from "jsfast";

const styleFunctions = new Map<string, (className: string) => string | false>();

const basicRules = [
  "flex,display: flex;",
  "flex-col,display: flex;flex-direction: column;",
  "c-left,justify-content: flex-start;",
  "c-right,justify-content: flex-end;",
  "c-center,justify-content: center;",
  "c-between,justify-content: space-between;",
  "c-around,justify-content: space-around;",
  "i-center,align-items: center;",
  "rounded,border-radius: 100%;",
  "w-full,width: 100%;",
  "h-full,height: 100%;",
  "nowrap,white-space: nowrap;",
  "wrap,flex-wrap: wrap;",
  "grow,flex-grow: 1;",
  "block,display: block;",
  "underline,text-decoration: underline;",
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
  "max-w-[param],max-width: [param](px);",
  "pv-[param],padding-top: [param](px);padding-bottom: [param](px);",
  "ph-[param],padding-left: [param](px);padding-right: [param](px);",
  "m-[param],margin: [param](px);",
  "mv-[param],margin-top: [param](px);margin-bottom: [param](px);",
  "mh-[param],margin-left: [param](px);margin-right: [param](px);",
  "mt-[param],margin-top: [param](px);",
  "mb-[param],margin-bottom: [param](px);",
  "ml-[param],margin-left: [param](px);",
  "mr-[param],margin-right: [param](px);",
  "p-[param],padding: [param](px);",
  "pl-[param],padding-left: [param](px);",
  "pr-[param],padding-right: [param](px);",
  "pt-[param],padding-top: [param](px);",
  "pb-[param],padding-bottom: [param](px);",
  "bl-[param],border-left: [param](px) solid;",
  "br-[param],border-right: [param](px) solid;",
  "bt-[param],border-top: [param](px) solid;",
  "bt-[param]-dash,border-top: [param](px) dashed;",
  "bb-[param],border-bottom: [param](px) solid;",
  "b-[param],border: [param](px) solid;",
  "bc-[param],border-color: [param];",
  "lh-[param],line-height: [param](px);",
  "bgc-[param],background-color: [param];",
  "max-w-[param],max-width: [param](px);",
  "max-h-[param],max-height: [param](px);",
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
    // search \'.+\' in className
    const temps = className.match(/\<.+\>/g);
    if (temps) {
      temps.forEach((temp, index) => {
        className = className.replace(temp, `{temp:${index}}`);
      });
    }
    console.log("after temp", className);

    const vars = className.match(/var\((.*)\)/g);
    if (vars) {
      vars.forEach((_var, index) => {
        className = className.replace(_var, `{var:${index}}`);
      });
    }
    console.log("after var", className);

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

    let css = style(classCompiled);
    if (!css) continue;
    // replace {temp-0} with 'temp-0'
    if (temps) {
      temps.forEach((temp, index) => {
        css = (css as string).replace(`{temp:${index}}`, temp.replace(/<|>/g, ""));
      });
    }
    if (vars) {
      vars.forEach((_var, index) => {
        css = (css as string).replace(`{var:${index}}`, _var);
      });
    }

    styles += css;
  }

  console.log(`Compile style: ${styles}`);

  dom.setStyle(styles);
}