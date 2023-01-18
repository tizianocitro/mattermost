import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {closeRootModal} from 'actions';
import {isRootModalVisible, subMenu} from 'selectors';

import Root from './root';

const mapStateToProps = (state: any) => ({
    visible: isRootModalVisible(state),
    subMenu: subMenu(state),
});

const mapDispatchToProps = (dispatch: any) => bindActionCreators({
    close: closeRootModal,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Root);
