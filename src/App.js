import React from "react"
import saveAs from "file-saver"
import { Formik, Form, Field } from "formik"
import Button from "@material-ui/core/Button"
import Divider from "@material-ui/core/Divider"
import Grid from "@material-ui/core/Grid"
import Input from "@material-ui/core/Input"
import Typography from "@material-ui/core/Typography"

import SendIcon from "@material-ui/icons/Send"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      usersToAdd: []
    }
  }

  handleChange = e => {
    const { value: email } = e.target
    this.setState({ email })
  }

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
      title: {
        marginBottom: 32
      }
    }

    return (
      <Grid container spacing={32} direction="column">
        <Grid item>
          <Typography variant="h2" style={styles.title}>
            1. Fill this
          </Typography>
          <Grid
            container
            spacing={16}
            direction="column"
            alignItems="center"
            style={{ width: "100vw" }}
          >
            <Grid item>
              <Typography variant="h6">
                We won't save any of these files. Don't believe us? See{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://github.com/FMGordillo/ibminternet-form-user-registration"
                >
                  the repo
                </a>
                .
              </Typography>
            </Grid>
            <Grid item>
              <Input
                type="text"
                placeholder="Your email"
                onChange={this.handleChange}
                value={this.state.email}
              />
            </Grid>
          </Grid>
        </Grid>
        <Divider />
        <Grid item>
          <Typography variant="h2" style={styles.title}>
            2. Fill these
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
                <Grid
                  container
                  spacing={16}
                  justify="center"
                  style={{ width: "100vw" }}
                >
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
                          placeholder="Person being visited"
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
        <Grid item>
          <Typography variant={"h2"} style={styles.title}>
            3. Export!
          </Typography>
          <Grid container direction="column" spacing={16}>
            <Grid item>
              <Typography variant={"h4"}>Users to add</Typography>
            </Grid>
            <Grid item>
              <ul>
                {this.state.usersToAdd.map((user, i) => (
                  <li key={i}>
                    {user.firstname} {user.lastname} ({user.email})
                  </li>
                ))}
              </ul>
            </Grid>
            <Grid item>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={this.handleParser}
              >
                Create CSV
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
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
