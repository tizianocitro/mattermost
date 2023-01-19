import React, {FC} from 'react';
import PropTypes from 'prop-types';

import {FormattedMessage} from 'react-intl';

const DESIRED_URL = 'www.test.com';

interface LinkTooltipProps {
    href: string,
    theme: any,
}

const LinkTooltip: FC<LinkTooltipProps> = ({href, theme}) => {
    // Ignores what does not contain www.test.com
    const isNotDesiredUrl = !href.includes(DESIRED_URL);
    if (isNotDesiredUrl) {
        return null;
    }

    const style = getStyle(theme);
    return (
        <div
            style={style.configuration}
        >
            <i
                style={iconStyles}
                className='icon fa fa-plug'
            />
            <FormattedMessage
                id='tooltip.message'
                defaultMessage='This is a custom tooltip from the Mattermost Plugin'
            />
        </div>
    );
};

const getStyle = (theme: any) => ({
    configuration: {
        borderRadius: '4px',
        boxShadow: 'rgba(61, 60, 64, 0.1) 0px 17px 50px 0px, rgba(61, 60, 64, 0.1) 0px 12px 15px 0px',
        fontSize: '14px',
        marginTop: '10px',
        padding: '10px 15px 15px',
        border: `1px solid ${hexToRGB(theme.centerChannelColor, '0.16')}`,
        color: theme.centerChannelColor,
        backgroundColor: theme.centerChannelBg,
    },
});

LinkTooltip.propTypes = {
    href: PropTypes.string.isRequired,
    theme: PropTypes.object.isRequired,
};

const iconStyles = {
    paddingRight: '5px',
};

export const hexToRGB = (hex: any, alpha: any) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    if (alpha) {
        return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
    }
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
};

export default LinkTooltip;