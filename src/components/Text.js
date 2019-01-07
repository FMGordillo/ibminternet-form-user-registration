import React from "react"
import PropTypes from "prop-types"
import Typography from "@material-ui/core/Typography"

const TextComponent = ({ children, props }) => {
	return <Typography {...props}>{children}</Typography>
}

TextComponent.propTypes = {
	children: PropTypes.string.isRequired,
	props: PropTypes.object
}

export default TextComponent
