import React from "react";

export default function CustomButton({
  onclick = () => {},
  children,
  //what ever the props passed from parent will directly passed to button attribute after spereading here
  ...props
}) {
  return (
    <button onClick={onclick} {...props}>
      {children}
    </button>
  );
}
