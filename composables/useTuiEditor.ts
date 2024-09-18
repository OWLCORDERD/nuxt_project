import Editor from "@toast-ui/editor";
import "@toast-ui/editor/toastui-editor.css";

export const toastEditorInstance = (
  el: HTMLElement,
  initialEditType: string,
  defaultOptions: any,
  height: string,
  initialValue: string
) => {
  return new Editor({
    el: el,
    initialEditType: initialEditType,
    options: defaultOptions,
    height: height,
    initialValue: initialValue,
    hooks: {},
  });
};
