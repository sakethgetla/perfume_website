import React from "react";
import { userData } from "./UserData";

class Profiles extends React.Component {

    constructor(props) {
        super(props);
        console.log(props.match.params.id);
        const id = props.match.params.id;
        this.state = {
            editMode: false,
            user: this.getUserFromID(id),
            profilepic: './'+ id +'.jpg',
        };
    }

    editProfile() {
        this.setState({
            editMode: true,
        })
    }

    getUserFromID(id) {
        for(let i=0; i < userData.length; i++) {
            if (userData[i].id === id){
                return userData[i];
            } 
        }
        return;
    }

    componentDidUpdate() {
        console.log(this.state.user);
        const id = this.props.match.params.id;
        if (this.getUserFromID(id) !== this.state.user) {
            this.setState({
                editMode: false,
                user: this.getUserFromID(id),
                profilepic: './'+ id +'.jpg',
            });
        }
    }

    ViewProfile() {

        if (this.state.editMode === true) {
            return(
                <div>
                    <button>Upload Image (not finished)</button>
                    <p>Name</p>
                    <input value={this.state.user.name}/>
                    <p>Description</p>
                    <input value={this.state.user.description}/>
                </div>
            )
        } else {
            return (
                <div>
                    <img src={require(`${this.state.profilepic}`).default} alt="profile"/>
                    <h3>ID: {this.state.user.id}</h3>
                    <h3>Name: {this.state.user.name}</h3>
                    <p>Description: {this.state.user.description}</p> 
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                <h1>View Profile</h1>
                {this.state.user ? this.ViewProfile() : "User not found" }
                <button onClick={() => this.editProfile()}>Edit Profile</button>
            </div>
        );
    }
}

export default Profiles;