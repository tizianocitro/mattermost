import {connect} from 'react-redux';

import {isEnabled} from 'selectors';

import LeftSidebarHeader from './left_sidebar_header';

const mapStateToProps = (state: any) => ({
    enabled: isEnabled(state),
});

export default connect(mapStateToProps)(LeftSidebarHeader);
