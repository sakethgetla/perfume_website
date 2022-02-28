import { useHistory } from "react-router-dom";
import { createRef, useState } from "react";
import { useFormik } from "formik";
import { useAuth } from "../../../Auth";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useLocation } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import axios from "axios";

const useStyles = makeStyles((theme) => ({

    form: {
        margin: theme.spacing(8),
        width: '80%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'left',
        justifyContent: 'left',
    },
    button: {
        margin: theme.spacing(2),
        marginTop: '60px',
        height: '40px',
    },
    avatar: {
        margin: theme.spacing(2),
        height: '100px',
        width: '100px',
        marginBottom: '-40px',
    }

}))

export default function EditProfile() {

    const classes = useStyles();

    let auth = useAuth();
    const [image, setImage] = useState(auth.user.profilePic);
    const inputFileRef = createRef(null);

    const editFirstName = useFormik({
        initialValues: {
            first_name: auth.user.first_name,
        },
        onSubmit: values => {
        editProfile('first_name', values.first_name);
        },
    });

    const editLastName = useFormik({
        initialValues: {
            last_name: auth.user.last_name,
        },
        onSubmit: values => {
        editProfile('last_name', values.last_name);
        },
    });

    const editEmail = useFormik({
        initialValues: {
            email: auth.user.email,
        },
        onSubmit: values => {
        editProfile('email', values.email);
        },
    });

    const editPassword = useFormik({
        initialValues: {
            password: '',
        },
        onSubmit: values => {
        editProfile('password', values.password);
        },
    });

    let editProfile = (field, value) => {
        axios({
            method: "PUT",
            url: 'http://localhost:8000/user/',
            data: `user_id=${auth.user.id}&${field}=${value}`,
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
          }).then((res)=>{
            console.log(res);
          }).catch((error) => {
            console.log(error);
        });
    };

    let onImageChange = event => {
        if (event.target.files && event.target.files[0]) {
          let img = event.target.files[0];
          setImage(URL.createObjectURL(img));
        }
    };

    let onSubmitImage = () => {}

    return (
        <Container maxWidth="md">
            <form class={classes.form} onSubmit={onSubmitImage}>
                <div>
                <Typography variant="h5">Profile Picture</Typography>
                <Avatar className={classes.avatar} src={image}/>
                <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="raised-button-file"
                    multiple
                    type="file"
                    onChange={onImageChange}
                />
                <label htmlFor="raised-button-file">
                    <Button  className={classes.button} variant="contined" color='primary' component="span" >
                        Upload
                    </Button>
                </label> 
                <Button disabled className={classes.button} variant='contained' color='primary' type="submit">Edit Profile Picture</Button> 
                </div>
            </form>

            <form class={classes.form} onSubmit={editFirstName.handleSubmit}>
                <div>
                <Typography variant="h5">First Name</Typography>
                <TextField margin="normal" variant="outlined" name="first_name" type="text" onChange={editFirstName.handleChange} value={editFirstName.values.first_name} />
                </div>
                <Button className={classes.button} variant='contained' color='primary' type="submit">Edit First Name</Button> 
            </form>
            <form class={classes.form} onSubmit={editLastName.handleSubmit}>
                <div>
                <Typography variant="h5">Last Name</Typography>
                <TextField margin="normal" variant="outlined" name="last_name" type="text" onChange={editLastName.handleChange} value={editLastName.values.last_name} />
                </div>
                <Button className={classes.button} variant='contained' color='primary' type="submit">Edit Last Name</Button> 
            </form>
            <form class={classes.form} onSubmit={editEmail.handleSubmit}>
                <div>
                <Typography variant="h5">Email</Typography>
                <TextField margin="normal" variant="outlined" name="email" type="email" onChange={editEmail.handleChange} value={editEmail.values.email}/>
                </div>
                <Button className={classes.button} variant='contained' color='primary' type="submit">Edit Email</Button> 
            </form>
            <form class={classes.form} onSubmit={editPassword.handleSubmit}>
                <div>
                <Typography variant="h5">Password</Typography>
                <TextField margin="normal" variant="outlined" name="password" type="password" onChange={editPassword.handleChange} value={editPassword.values.password}/>
                </div>
                <Button className={classes.button} variant='contained' color='primary' type="submit">Edit Password</Button> 
            </form>
        </Container>
    );
}