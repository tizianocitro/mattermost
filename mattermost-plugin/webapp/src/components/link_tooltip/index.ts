import {connect} from 'react-redux';

import {isEnabled} from 'selectors';

import LinkTooltip from './link_tooltip';

const mapStateToProps = (state: any) => ({
    enabled: isEnabled(state),
});

export default connect(mapStateToProps)(LinkTooltip);