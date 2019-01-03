import React from "react"
import PropTypes from "prop-types"

import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"

import ArrowRightIcon from "@material-ui/icons/ChevronRight"

const UserComponent = ({ user, key }) => {
	return (
		<ListItem key={key}>
			<ListItemIcon>
				<ArrowRightIcon />
			</ListItemIcon>
			<ListItemText>
				{user.firstname} {user.lastname} ({user.email})
			</ListItemText>
		</ListItem>
	)
}

UserComponent.propTypes = {
	user: PropTypes.object,
	key: PropTypes.number
}

export default UserComponent
