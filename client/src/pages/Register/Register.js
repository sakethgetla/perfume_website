import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import { useAuth } from "../../Auth";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({

  form: {
    margin: theme.spacing(8),
    width: '80%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  }
}))

export default function Register() {
  
  const classes = useStyles();

  let auth = useAuth();
  let history = useHistory();

  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      admin: false,
    },

    onSubmit: values => {
      auth.register(values.first_name, values.last_name, values.email, values.password, values.admin, ()=>{history.push('/login')});
    },

  });

  return (
    <Container maxWidth="md">
      <form class={classes.form} onSubmit={formik.handleSubmit}>
        <Typography variant="h4">Register</Typography>
        <TextField margin="normal" variant="outlined" required label="First name" name="first_name" type="text" onChange={formik.handleChange} value={formik.values.first_name}/>
        <TextField margin="normal" variant="outlined" required label="Last name" name="last_name" type="text" onChange={formik.handleChange} value={formik.values.last_name}/>
        <TextField margin="normal" variant="outlined" required label="Email" name="email" type="email" onChange={formik.handleChange} value={formik.values.email}/>
        <TextField margin="normal" variant="outlined" required label="Password" name="password" type="password" onChange={formik.handleChange} value={formik.values.password} />
        <FormControlLabel label="Admin" control={<Checkbox name="admin" type="checkbox" onChange={formik.handleChange} value={formik.values.admin} />}/>
        <Button variant='contained' color='primary' type="submit">Register</Button>
      </form>
    </Container>
  );
}