import React from "react"
import saveAs from "file-saver"
import { Formik, Form, Field } from "formik"

import AppBar from "@material-ui/core/AppBar"
import Grid from "@material-ui/core/Grid"
import Divider from "@material-ui/core/Divider"
import Toolbar from "@material-ui/core/Toolbar"

import Button from "@material-ui/core/Button"
import Input from "@material-ui/core/Input"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import Typography from "@material-ui/core/Typography"

import SendIcon from "@material-ui/icons/Send"
import ArrowRightIcon from "@material-ui/icons/ChevronRight"

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
      }
    }

    return (
      <>
        <AppBar position="sticky" color="primary">
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

        <Grid
          container
          spacing={32}
          direction="column"
          style={styles.container}
        >
          <Grid item>
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
            <Typography variant={"h3"} style={styles.title}>
              2. Check
            </Typography>
            <Grid container direction="column" spacing={16}>
              <Grid item>
                <Typography variant={"h5"}>Users to add</Typography>
              </Grid>
              <Grid item>
                <List
                  style={{
                    backgroundColor: "#eeeeee"
                  }}
                >
                  {this.state.usersToAdd.map((user, i) => (
                    <ListItem key={i}>
                      <ListItemIcon>
                        <ArrowRightIcon />
                      </ListItemIcon>
                      <ListItemText>
                        {user.firstname} {user.lastname} ({user.email})
                      </ListItemText>
                    </ListItem>
                  ))}
                </List>
              </Grid>
            </Grid>
          </Grid>

          <Divider />

          <Grid item>
            <Typography variant={"h3"} style={styles.title}>
              3. Export
            </Typography>

            <Grid item>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={this.handleParser}
              >
                Create and save CSV
              </Button>
              <Button variant="contained" disabled>
                Crete and save JSON (Not implemented)
              </Button>
            </Grid>
          </Grid>

          <Divider />

          <Grid item>
            <Typography variant={"h3"} style={styles.title}>
              4. Publish
            </Typography>
            <Typography>To be filled</Typography>
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
