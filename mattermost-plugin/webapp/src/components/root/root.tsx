import React, {FC} from 'react';
import PropTypes from 'prop-types';

import {FormattedMessage} from 'react-intl';

import {Element} from 'action_types';

interface RootProps {
    visible: boolean,
    close: any,
    theme: any,
    subMenu: Element,
}

const Root: FC<RootProps> = ({visible, close, theme, subMenu}) => {
    if (!visible) {
        return null;
    }

    let extraContent: any = '';
    let extraContentTitle: any = '';
    if (subMenu) {
        extraContentTitle = (
            <FormattedMessage
                id='root.triggeredby'
                defaultMessage='Element clicked in the menu: '
            />
        );
        extraContent = subMenu;
    }

    const style = getStyle(theme);

    return (
        <div
            style={style.backdrop}

            // onClick={close}
        >
            <div style={style.modal}>
                <h1>
                    <FormattedMessage
                        id='root.title'
                        defaultMessage='Whatever'
                    />
                </h1>
                <FormattedMessage
                    id='root.triggered'
                    defaultMessage='You have triggered the Root Component.'
                />
                <br/>
                {extraContentTitle}
                {extraContent}
                <br/>
                <br/>
                <button
                    style={style.button}
                    onClick={close}
                >
                    <FormattedMessage
                        id='root.clicktoclose'
                        defaultMessage='Close'
                    />
                </button>
            </div>
        </div>
    );
};

Root.propTypes = {
    visible: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
    theme: PropTypes.object.isRequired,
    subMenu: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

const getStyle = (theme: any): any => ({
    backdrop: {
        position: 'absolute',
        display: 'flex',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.50)',
        zIndex: 2000,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modal: {
        height: '250px',
        width: '400px',
        padding: '1em',
        color: theme.centerChannelColor,
        backgroundColor: theme.centerChannelBg,
    },
    button: {
        color: theme.buttonColor,
        backgroundColor: theme.buttonBg,
    },
});

export default Root;
