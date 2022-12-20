import clsx from "clsx";
import React from "react";

const CollNumber = ({className, number}) => {

    return (
        <a href={`tel:+${number}`} className={clsx(className)}>
            {number}
        </a>
    )

}

export default CollNumber