import "./styles.less";

import React from "react";

interface IAvatarProps {
    title?: string,
    subtitle?: string,
    avatar?: string
}

export function Avatar({avatar, title, subtitle}: IAvatarProps) {
    return (
        <div className="kiva-avatar">
            <div className="kiva-avatar__header">
                {avatar ? (
                    <img src={avatar} alt={"Avatar"} />
                ) : undefined}
            </div>
            <div className="kiva-avatar__info">
                <div className="kiva-avatar__info-wrap">
                    <h3 className="kiva-avatar__title">{title}</h3>
                    <p className="kiva-avatar__subtitle">{subtitle}</p>
                </div>
            </div>
        </div>
    );
}
