import React from "react"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"

const AppBarComponent = props => (
	<AppBar {...props.appbar}>
		<Toolbar>
			<Typography variant="h6" color="inherit" style={{ flexGrow: 1 }}>
				Register visitors
			</Typography>
			<a
				target="_blank"
				rel="noopener noreferrer"
				href="https://github.com/FMGordillo/ibminternet-form-user-registration"
			>
				<img
					src="/img/GitHub-Mark/GitHub-Mark-32px.png"
					alt="Github"
					style={{ width: "2em" }}
				/>
			</a>
		</Toolbar>
	</AppBar>
)

export default AppBarComponent
