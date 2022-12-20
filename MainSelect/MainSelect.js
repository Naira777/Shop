import React from "react";
import Select from "react-select";
import {useController} from "react-hook-form";
import clsx from "clsx";

import styles from "./mainSelect.module.css";

const MainSelect = ({
                        className,
                        name,
                        control,
                        options,
                        isMulti,
                        isClearable,
                        disabledOptions,
                        placeholder,
                        disabled,
                    }) => {
    const {field} = useController({control, name});

    return (
        <Select
            className={clsx(className, styles.select)}
            options={options}
            isMulti={isMulti}
            placeholder={placeholder}
            isOptionDisabled={
                disabledOptions ? () => field.value?.length >= 5 : () => null
            }
            isClearable={isClearable}
            isDisabled={disabled ? (option) => option.disabled : null}
            {...field}
            components={{
                IndicatorSeparator: () => null,
            }}
            value={undefined}
        />
    );
};

export default MainSelect;
