import React, {Component} from 'react';
import Table from 'react-bootstrap/Table';
import './Dashboard.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
//import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'

const Dashboard = ({ allUsers, changeIsSent }) => {

//     const[getTitle, setTitle] = React.useState('N/A');
// //setReward(false)
//     const changeTitle = (event, index)=>{
//         console.log('value', event.target.value);
//         setTitle(s)
//     }
    const options = [
        {value:"Yes", label:"Yes"},
        {value:"No", label:"No"},
        {value:"No rewards", label:"No rewards"} 
    ]

    const handleChange = () => {

    }

    return (
        <div className="dashboard">
            <h3 className="table-header">All users</h3>
            <Table striped bordered hover className="user-table">
                <thead>
                    <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Total Points</th>
                    <th>Reward sent?</th>
                    </tr>
                </thead>
                <tbody>
                    {allUsers.map((user, index) => {
                        //console.log(index)
                        let switchOn = false;
                        if (user.isSent === 'Yes') {
                            switchOn = true;
                        }
                        return (
                            <tr>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.points}</td>
                                <td style={{justifyContent:"center", textAlign:"center"}}>
                                {/* <DropdownButton variant="warning" id="dropdown-item-button" title={user.isSent} key={index} value={user.isSent} onClick={(event) => changeIsSent(event,user.code)}>
                                    <Dropdown.Item value="Yes" as="button">Yes</Dropdown.Item>
                                    <Dropdown.Item value="No" as="button">No</Dropdown.Item>
                                    <Dropdown.Item value="No rewards" as="button">No rewards</Dropdown.Item>
                                </DropdownButton> */}
                                
                                    {/* <Select value={user.isSent} options={options} onChange={(event) => changeIsSent(event, user.code)} className="dropdown-menu"/> */}
                                    <BootstrapSwitchButton
                                    checked={switchOn}
                                    onlabel='Yes'
                                    onstyle='success'
                                    offlabel='No'
                                    offstyle='danger'
                                    onChange={(event) => changeIsSent(event, user.code)}
                                    />
                                    
                                </td>
                            </tr>
                        )})
                    }
                </tbody>
            </Table>
        </div>
    );
}

export default Dashboard;