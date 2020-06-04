import React, {Component} from 'react';
import Table from 'react-bootstrap/Table';
import './Dashboard.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

const Dashboard = ({ allUsers, changeIsSent }) => {

//     const[getTitle, setTitle] = React.useState('N/A');
// //setReward(false)
//     const changeTitle = (event, index)=>{
//         console.log('value', event.target.value);
//         setTitle(s)
//     }

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
                        return (
                            <tr>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.points}</td>
                                <td>
                                <DropdownButton variant="warning" id="dropdown-item-button" title={user.isSent} key={index} value={user.isSent} onClick={(event) => changeIsSent(event,user.code)}>
                                    <Dropdown.Item value="Yes" as="button">Yes</Dropdown.Item>
                                    <Dropdown.Item value="No" as="button">No</Dropdown.Item>
                                    <Dropdown.Item value="No rewards" as="button">No rewards</Dropdown.Item>
                                </DropdownButton>
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