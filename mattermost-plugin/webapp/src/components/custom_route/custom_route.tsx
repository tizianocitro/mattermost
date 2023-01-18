import React, {FC} from 'react';
import PropTypes from 'prop-types';
import {Team} from 'mattermost-redux/types/teams';

interface CustomRouteProps {
    team: Team,
}

const CustomRoute: FC<CustomRouteProps> = ({team}) => {
    return (
        <div style={style.cr}>
            <h1>{'Whatever'}</h1>
            <h2>{'Again'}</h2>
            <h3>{'Yet again'}</h3>
            <br/>
            <br/>
            <a onClick={() => window.WebappUtils.browserHistory.push(`/${team.name}/mattermost-plugin/teamtest`)}>
                {`Back to ${team.name}`}
            </a>
        </div>
    );
};

CustomRoute.propTypes = {
    team: PropTypes.any,
};

const style = {
    cr: {
        padding: '10px',
    },
};

export default CustomRoute;
