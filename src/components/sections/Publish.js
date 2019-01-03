import React from "react"
import PropTypes from "prop-types"

import Typography from "@material-ui/core/Typography"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"

import ArrowRightIcon from "@material-ui/icons/ChevronRight"

const ListItemLink = props => <ListItem button component="a" {...props} />

const PublishComponent = ({ styles }) => {
	return (
		<>
			<Typography variant={"h3"} style={styles.title}>
				4. Publish
			</Typography>
			<Typography variant="body1">
				First select the one which fits your location:
			</Typography>
			<List>
				<ListItemLink
					href="http://internetwifi-americas.ibm.com/"
					target="_blank"
					rel="noopener noreferrer"
				>
					<ListItemIcon>
						<ArrowRightIcon />
					</ListItemIcon>
					<ListItemText>Americas</ListItemText>
				</ListItemLink>
				<ListItemLink
					href="http://internetwifi-emea.ibm.com/"
					target="_blank"
					rel="noopener noreferrer"
				>
					<ListItemIcon>
						<ArrowRightIcon />
					</ListItemIcon>
					<ListItemText>Europe, Middle East, and Africa (EMEA)</ListItemText>
				</ListItemLink>
				<ListItemLink
					href="http://internetwifi-ap.ibm.com/"
					target="_blank"
					rel="noopener noreferrer"
				>
					<ListItemIcon>
						<ArrowRightIcon />
					</ListItemIcon>
					<ListItemText>Asia Pacific (AP)</ListItemText>
				</ListItemLink>
			</List>
			<Typography variant="body1">
				After you login, accept the terms and conditions of the tool, you should
				import the <code>.csv</code> file that you've just exported from here
			</Typography>
			{/* <img
							src="/img/import-csv.png"
							alt="Import CSV example"
							style={styles.img}
						/> */}
		</>
	)
}

PublishComponent.propTypes = {
	styles: PropTypes.object
}

export default PublishComponent
