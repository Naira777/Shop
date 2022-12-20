import React from "react";
import clsx from "clsx";
import styles from "./title.module.css";

const elements = {
    h1: "h1",
    h2: "h2",
    h3: "h3",
    h4: "h4",
    h5: "h5",
    h6: "h6",
    p: "p",
    span: "span",
};

const Tag = ({children, variant, ...props}) =>
    React.createElement(elements[variant] || elements.h1, props, children);

const Title = ({children, variant = "h1", className, ...props}) => {
    return (
        <Tag
            variant={variant}
            className={clsx(className, styles[variant])}
            {...props}
        >
            {children}
        </Tag>
    );
};

export default Title;