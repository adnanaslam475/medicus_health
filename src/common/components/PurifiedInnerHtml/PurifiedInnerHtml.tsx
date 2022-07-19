import React from "react";
// import DOMPurify from "dompurify";

type Props = {
  element?: any;
  innerHtml?: any;
  // any props that come into the component
};

function PurifiedInnerHtml(props: Props) {
  // const { element, innerHtml } = props || {};
  // if (!element) {
  //   return React.createElement("span", {
  //     // dangerouslySetInnerHTML: { __html: DOMPurify.sanitize(innerHtml) },
  //   });
  // } else {
  //   return React.cloneElement(element, {
  //     // dangerouslySetInnerHTML: { __html: DOMPurify.sanitize(innerHtml) },
  //   });
  // }
}

export default PurifiedInnerHtml;
