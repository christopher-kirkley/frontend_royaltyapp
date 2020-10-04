import React from 'react';

import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

function Toggle(props) {

	return (
		<ToggleButtonGroup
			value={props.edit}
			exclusive
			onChange={props.handleEdit}
		>
			<ToggleButton
				id="view"
				value={false}
				disabled={ props.edit ? false : true }
			>
			View
			</ToggleButton>
			<ToggleButton
				id="edit"
				value={true}
				disabled={ props.edit ? true : false }
			>
			Edit
			</ToggleButton>
		</ToggleButtonGroup>
	)}

export default Toggle;

