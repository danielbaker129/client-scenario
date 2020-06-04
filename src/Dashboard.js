import React, {Component} from 'react';
import Table from 'react-bootstrap/Table';
import './Dashboard.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

const Dashboard = ({ allUsers }) => {

    const[getReward, setReward] = React.useState(true);

    const changeReward = ()=>{
        if(getReward){
          alert("Come back soon! =)")
        }
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
                    {allUsers.map(user => {
                        return (
                            <tr>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.points}</td>
                                <td>
                                <DropdownButton variant="warning" id="dropdown-item-button" title="N/A">
                                    <Dropdown.Item as="button">Yes</Dropdown.Item>
                                    <Dropdown.Item as="button">No</Dropdown.Item>
                                    <Dropdown.Item as="button">No rewards</Dropdown.Item>
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