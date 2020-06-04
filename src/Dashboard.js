import React, {Component} from 'react';
import Table from 'react-bootstrap/Table';
import './Dashboard.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

const Dashboard = ({ allUsers }) => {
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
                    {/* <tr>
                    <td>example</td>
                    <td>email@example.com</td>
                    <td>3</td>
                    <td>N/A</td>
                    </tr> */}
                    {allUsers.map(user => {
                        return (
                            <tr>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.points}</td>
                                <td>
                                <DropdownButton id="dropdown-item-button" title="N/A">
                                    {/* <Dropdown.Item as="button">No rewards</Dropdown.Item> */}
                                    <Dropdown.Item as="button">Yes</Dropdown.Item>
                                    <Dropdown.Item as="button">No</Dropdown.Item>
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