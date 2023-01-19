import React, {FC} from 'react';
import PropTypes from 'prop-types';

interface UserAttributesProps {
    hide: any,
}

const UserAttributes: FC<UserAttributesProps> = ({hide}) => {
    const onClick = (): void => {
        hide();
    };
    return (
        <div>
            <a onClick={onClick}>
                {'Mattermost Plugin: User Attributes'}
            </a>
        </div>
    );
};

UserAttributes.propTypes = {
    hide: PropTypes.func.isRequired,
};

export default UserAttributes;