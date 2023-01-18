import React, {FC} from 'react';
import PropTypes from 'prop-types';

import {FormattedMessage} from 'react-intl';

interface UserActionsProps {
    open: any,
    theme: any,
    hide: any,
}

const UserActions: FC<UserActionsProps> = ({open, theme, hide}) => {
    const onClick = () => {
        open();
        hide();
    };

    const style = getStyle(theme);

    return (
        <div>
            <button
                style={style.button}
                onClick={onClick}
            >
                <FormattedMessage
                    id='useractions.action'
                    defaultMessage='Mattermost Plugin'
                />
            </button>
        </div>
    );
};

UserActions.propTypes = {
    open: PropTypes.func.isRequired,
    theme: PropTypes.object.isRequired,
    hide: PropTypes.func.isRequired,
};

const getStyle = (theme: any) => ({
    button: {
        color: theme.buttonColor,
        backgroundColor: theme.buttonBg,
    },
});

export default UserActions;
