import { Icon } from "@iconify/react";
import { memo } from "react";

const Marquee = ({
    items,
    className = "text-primary-text bg-primary-bg",
    icon = "mdi:star-four-points",
    iconClassName = "",
    reverse = false,
}) => {
    // Duplicamos los items para crear efecto infinito sin JS
    const duplicatedItems = [...items, ...items];

    return (
        <div
            className={`overflow-hidden w-full h-20 md:h-[100px] flex items-center ${className}`}
        >
            <div 
                className="flex whitespace-nowrap"
                style={{
                    animation: `marquee-scroll 30s linear infinite ${reverse ? 'reverse' : 'normal'}`,
                }}
            >
                {duplicatedItems.map((text, index) => (
                    <span
                        key={index}
                        className="flex items-center px-16 gap-x-32 marquee-text-responsive font-light uppercase flex-shrink-0"
                    >
                        {text} <Icon icon={icon} className={iconClassName} />
                    </span>
                ))}
            </div>
        </div>
    );
};

export default memo(Marquee);
