import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import { useAuth } from "../../Auth";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useLocation } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
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
    },
    button: {
        margin: theme.spacing(2),
    }

}))

export default function Login() {

    const classes = useStyles();

    let history = useHistory();
    let location = useLocation();
    let auth = useAuth();

    const formik = useFormik({
        initialValues: {
        email: '',
        password: '',
        },

        onSubmit: values => {
        login(values.email, values.password);
        },

    });


    let { from } = location.state || { from: { pathname: "/" } };
    let login = (email, password) => {
        auth.signin(email, password, () => {
        history.replace(from);
        });
    };

    return (
        <Container maxWidth="md">   
            <form class={classes.form} onSubmit={formik.handleSubmit}>
                <Typography variant="h4">Log in</Typography>
                <TextField margin="normal" variant="outlined" required label="Email" name="email" type="email" onChange={formik.handleChange} value={formik.values.email}/>
                <TextField margin="normal" variant="outlined" required label="Password" name="password" type="password" onChange={formik.handleChange} value={formik.values.password} />
                <Button className={classes.button} variant='contained' color='primary' type="submit">Log In</Button> 
                <Link to="/register" >
                    <Typography>Register</Typography>
                </Link>
            </form>
        </Container>
    );
}