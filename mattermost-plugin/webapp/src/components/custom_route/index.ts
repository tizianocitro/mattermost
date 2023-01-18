import {connect} from 'react-redux';

import {getCurrentTeam} from 'mattermost-redux/selectors/entities/teams';

import CustomRoute from './custom_route';

const mapStateToProps = (state: any) => ({
    team: getCurrentTeam(state),
});

export default connect(mapStateToProps)(CustomRoute);
