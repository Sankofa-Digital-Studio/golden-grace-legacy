import React from "react";
import Container from "./container";

const Section = ({
  id,
  className = "",
  containerClassName = "",
  children,
  outer = false,
  bg = "bg-[#050505]", // default, but overridable
}) => {
  const content = outer ? (
    children
  ) : (
    <Container className={containerClassName}>{children}</Container>
  );

  return (
    <section
      id={id}
      className={`relative py-16 md:py-24 ${bg} ${className}`}
    >
      {content}
    </section>
  );
};

export default Section;
