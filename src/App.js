import React from "react"
import saveAs from "file-saver"
import { Formik, Form, Field } from "formik"

import Grid from "@material-ui/core/Grid"
import Divider from "@material-ui/core/Divider"

import Button from "@material-ui/core/Button"
import Input from "@material-ui/core/Input"
import List from "@material-ui/core/List"
import Typography from "@material-ui/core/Typography"

import SendIcon from "@material-ui/icons/Send"

import AppBar from "./components/AppBar"
import User from "./components/User"
import Publish from "./components/sections/Publish"

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			usersToAdd: []
		}
	}

	/**
	 * TODO: Remove item from user list
	 */
	handleRemove = () => {
		// TODO
	}

	/**
	 * TODO: Is this sync or async?
	 */
	handleParser = async () => {
		const Json2csvParser = require("json2csv").Parser
		const fields = [
			"firstname",
			"lastname",
			"email",
			"company",
			"personBeingVisited"
		]
		const json2csvParser = new Json2csvParser({ fields })
		const csv = json2csvParser.parse(this.state.usersToAdd)
		console.log(csv)

		const blob = new Blob([csv], { type: "text/csv" })
		saveAs(blob, "test.csv")
	}

	render() {
		const styles = {
			container: {
				padding: 32
			},
			title: {
				marginBottom: 24,
				marginTop: 12
			},
			item: {
				marginTop: 16,
				marginBottom: 32
			},
			button: {
				marginTop: 16
			},
			img: {
				border: "1px solid black"
			}
		}

		const { usersToAdd } = this.state

		return (
			<>
				<AppBar appbar={{ position: "sticky", color: "primary" }} />

				<Grid container direction="column" style={styles.container}>
					<Grid item style={styles.item}>
						<Typography variant="h3" style={styles.title}>
							1. Fill these
						</Typography>
						<Formik
							initialValues={{
								firstname: "",
								lastname: "",
								email: "",
								company: "IBM",
								personBeingVisited: this.state.email
							}}
							onSubmit={(values, { setSubmitting }) => {
								console.log("submitted", values)
								this.setState(({ usersToAdd }) => ({
									usersToAdd: usersToAdd.concat(values)
								}))
								setSubmitting(false)
							}}
						>
							{({ handleChange, isSubmitting, errors }) => (
								<Form>
									<Grid container spacing={16} justify="center">
										<Grid item>
											<Grid container spacing={16} justify="center">
												<Grid item>
													<Field
														type="text"
														name="firstname"
														placeholder="First Name"
														component={ControlledInput}
													/>
												</Grid>
												<Grid item>
													<Field
														type="text"
														name="lastname"
														placeholder="Last Name"
														component={ControlledInput}
													/>
												</Grid>
												<Grid item>
													<Field
														type="email"
														name="email"
														placeholder="Email"
														component={ControlledInput}
													/>
												</Grid>
												<Grid item>
													<Field
														type="text"
														name="company"
														placeholder="Company"
														component={ControlledInput}
													/>
												</Grid>
												<Grid item>
													<Field
														type="text"
														name="personBeingVisited"
														placeholder="Person being visited (email)"
														component={ControlledInput}
														value={this.state.email}
													/>
												</Grid>
											</Grid>
										</Grid>
										<Grid item>
											<Button
												variant="contained"
												color="primary"
												type="submit"
												disabled={isSubmitting}
												style={styles.button}
											>
												Add user <SendIcon style={{ marginLeft: 12 }} />
											</Button>
										</Grid>
									</Grid>
								</Form>
							)}
						</Formik>
					</Grid>

					<Divider />

					<Grid item style={styles.item}>
						<Typography variant={"h3"} style={styles.title}>
							2. Check
						</Typography>
						<Grid container direction="column" spacing={16}>
							<Grid item>
								<Typography variant={"h6"}>List of users to add:</Typography>
							</Grid>
							<Grid item>
								<List
									style={{
										backgroundColor: usersToAdd.length > 0 && "#eeeeee"
									}}
								>
									{usersToAdd.length <= 0 ? (
										<Typography variant="overline">
											<span role="img" aria-label="lens">
												🔍
											</span>{" "}
											Nothing added yet{" "}
											<span role="img" aria-label="lens">
												🔍
											</span>
										</Typography>
									) : (
										usersToAdd.map((user, i) => <User key={i} user={user} />)
									)}
								</List>
							</Grid>
						</Grid>
					</Grid>

					<Divider />

					<Grid item style={styles.item}>
						<Typography variant={"h3"} style={styles.title}>
							3. Export
						</Typography>

						{usersToAdd <= 0 && (
							<Typography variant="overline">
								You need to add, at least, one user
							</Typography>
						)}

						<Grid item>
							<Button
								type="submit"
								variant="contained"
								color="primary"
								disabled={usersToAdd <= 0}
								onClick={this.handleParser}
								style={styles.button}
							>
								Create and save CSV
							</Button>
							<Button variant="contained" disabled style={styles.button}>
								Crete and save JSON (Not implemented)
							</Button>
						</Grid>
					</Grid>

					<Divider />

					<Grid item style={styles.item}>
						<Publish styles={styles} />
					</Grid>
				</Grid>
			</>
		)
	}
}

const ControlledInput = ({ field, form, placeholder, type }) => {
	// console.log(form, field)
	const { onChange, name, value } = field
	return (
		<Input
			type={type}
			name={name}
			placeholder={placeholder}
			value={value}
			onChange={onChange}
		/>
	)
}

export default App
