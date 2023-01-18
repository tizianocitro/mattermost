import React, {FC} from 'react';
import PropTypes from 'prop-types';

import {FormattedMessage} from 'react-intl';

import {Team} from 'mattermost-redux/types/teams';

interface RHSViewProps {
    team: Team,
}

const RHSView: FC<RHSViewProps> = ({team}) => {
    return (
        <div style={style.rhs}>
            <h1>
                <FormattedMessage
                    id='rh.title'
                    defaultMessage='Whatever'
                />
            </h1>
            <br/>
            <FormattedMessage
                id='rh.triggered'
                defaultMessage='You have triggered the Right Sidebar Component.'
            />
            <br/>
            <br/>
            {'Links for custom routes'}
            <br/>
            <a onClick={() => window.WebappUtils.browserHistory.push('/plug/mattermost-plugin/customroute')}>
                {'Go to a custom route'}
            </a>
            <br/>
            <a onClick={() => window.WebappUtils.browserHistory.push(`/${team.name}/mattermost-plugin/customroute`)}>
                {`Go to ${team.name}`}
            </a>
            <br/>
            <a onClick={() => window.WebappUtils.browserHistory.push(`/${team.name}/mattermost-plugin/teamtest`)}>
                {`Refresh ${team.name}`}
            </a>
        </div>
    );
};

RHSView.propTypes = {
    team: PropTypes.any,
};

const style = {
    rhs: {
        padding: '10px',
    },
};

export default RHSView;
