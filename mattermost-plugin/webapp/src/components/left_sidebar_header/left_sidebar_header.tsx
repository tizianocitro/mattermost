import React, {FC} from 'react';
import PropTypes from 'prop-types';

import {FormattedMessage} from 'react-intl';

interface LeftSidebarHeaderProps {
    enabled: boolean,
}

// LeftSidebarHeader is a pure component, later connected to the Redux store so as to
// show the plugin's enabled / disabled status.
const LeftSidebarHeader: FC<LeftSidebarHeaderProps> = ({enabled}) => {
    return (
        <div style={style}>
            <i
                className='icon fa fa-plug'
                style={iconStyle}
            />
            <FormattedMessage
                id='sidebar.plugin'
                defaultMessage='Mattermost Plugin:'
            />
            {' '}
            {enabled ?
                <span>
                    <FormattedMessage
                        id='sidebar.enabled'
                        defaultMessage='Enabled'
                    />
                </span> :
                <span>
                    <FormattedMessage
                        id='sidebar.disabled'
                        defaultMessage='Disabled'
                    />
                </span>
            }
        </div>
    );
};

const iconStyle = {
    display: 'inline-block',
    margin: '0 7px 0 1px',
};

const style = {
    margin: '.5em 0 .5em',
    padding: '0 12px 0 15px',
    color: 'rgba(255,255,255,0.6)',
};

LeftSidebarHeader.propTypes = {
    enabled: PropTypes.bool.isRequired,
};

export default LeftSidebarHeader;
