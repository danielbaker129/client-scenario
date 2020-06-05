import React, { Component } from 'react';
import './Home.css';
import AddressDialog from './AddressForm.js';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Button from 'react-bootstrap/Button';
import { withFirebase } from './Firebase';

const rewards = [
    'Access to Exclusive NormWear Facebook Group',
    'Pack of NormWear Stickers',
    'NormWear T-Shirt',
    'Free Pair of Shoes'
]

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAddressForm: false,
        }
    }

    // componentDidUpdate(){
    //     const data = this.props.firebase.user(this.props.authUser.uid)
    //     this.props.setData(data.points);
    //     console.log(data.points);
    // }

    handleAddress = () => {
        this.setState({
            showAddressForm: true,
        })
    }

    onClose = () => {
        this.setState({
            showAddressForm: false
        });
    }

    render() {
        let points = this.props.points;
        let remaining = 0;
        let reward = '';

        if (points < 10) {
            remaining = 10 - points;
            reward = rewards[0];
        } else if (points < 25) {
            remaining = 25 - points;
            reward = rewards[1];
        } else if (points < 50) {
            remaining = 50 - points;
            reward = rewards[2];
        } else if (points < 100) {
            remaining = 100 - points;
            reward = rewards[3];
        }

        if (this.props.authUser) {

            return (
                <div>
                    {/* <h3 style={{textAlign:"center", marginTop:20}}>Welcome to NormWear's Referral App!</h3><br/> */}
                    <div className="access-information">

                        {/* <h5>
                        You can find your access code displayed below. Share it with your friends to earn points! Earn earn enough points,
                        and you can get cool prizes and NormWear swag. You can even get started by sharing your access code on Twitter or 
                        Facebook! Check out our FAQ page for more information about prizes and about other questions you might have.
                     </h5> */}
                        <h4>Your Referral Code:</h4><br />
                        <h3>{this.props.code}</h3><br />
                        {/* <h5>Total Points: {this.props.points}</h5> */}
                        <h6>Share Your Code</h6>
                        <Button variant="warning" onClick={this.props.incrementTwitter}>
                            <img src="https://image.flaticon.com/icons/png/512/23/23931.png"
                                style={{ height: 20, width: 20 }} />
                            <a target="_blank" href="https://twitter.com/share?ref_src=twsrc%5Etfw" class="twitter-share-button" data-show-count="false"
                                style={{ color: "black" }}
                            >Tweet</a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
                        </Button>{' '}
                        <Button variant="warning" onClick={this.props.incrementFacebook}>
                            <img src="https://cdn.iconscout.com/icon/free/png-256/facebook-social-media-fb-logo-square-44659.png"
                                style={{ height: 20, width: 20 }} />
                            <a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fnormwear.netlify.app%2F&amp;src=sdkpreparse" class="fb-xfbml-parse-ignore"
                                style={{ color: "black" }}
                            >Share</a>
                        </Button>

                    </div>
                    <h4 style={{ marginTop: '3vh', marginBottom: "1vh" }}>Total Points: {this.props.points}</h4>
                    <div >
                        {this.props.points >= 100 &&
                            <div>
                                Congratulations, you've won all the rewards! You're NormWear VIP ;)
                        </div>
                        }
                        {this.props.points < 100 &&
                            <div>
                                {remaining === 1 &&
                                    <div>
                                        {remaining} point until the next reward: {reward} !<br />
                                    </div>
                                }
                                {remaining !== 1 &&
                                    <div>
                                        {remaining} points until the next reward: {reward} !<br />
                                    </div>
                                }

                            </div>
                        }
                    </div>
                    <ProgressBar animated variant="success" style={{ marginTop: '2vh' }}>
                        <ProgressBar variant="success" now={this.props.points} key={1} />
                        <ProgressBar striped variant="success" now={0} key={2} />
                        <ProgressBar striped variant="success" now={0} key={3} />
                    </ProgressBar>
                    <br />
                    <ul>
                        <li><div style={{ display: 'inline', color: 'yellow' }}>10 Points:</div> Access to exclusive NormWear Facebook Group</li>
                        <li><div style={{ display: 'inline', color: 'yellow' }}>25 Points:</div> Pack of NormWear Stickers</li>
                        <li><div style={{ display: 'inline', color: 'yellow' }}>50 Points:</div> NormWear T-Shirt</li>
                        <li><div style={{ display: 'inline', color: 'yellow' }}>100 Points:</div> Free Pair of Shoes</li>
                    </ul>
                    {this.props.points > 10 &&
                        <div>
                            {/* <AddressDialog onClose={this.onClose} /> */}
                            <h5 style={{ display: "inline", marginRight: '1vw' }}>Submit/edit your address so we can ship your reward to you!</h5>{' '}
                            <Button type='submit' variant="warning" onClick={() => this.props.handleAddress()}

                            >Submit Address</Button>
                        </div>
                    }

                </div>
            );
        }
        else {
            return (
                <div className="initial-screen"
                    style={{ paddingTop: '28vh', paddingBottom: '28vh' }}
                >
                    {/* <img src="https://www.familyvacationcritic.com/uploads/sites/19/2019/04/KidsHiking.jpg" 
                style={{width:'40vw', marginTop: '5vh', marginBottom: '5vh'}}/><br/> */}
                    <div className="initial-info">
                        <h1>Welcome to NormWear's Referral App!</h1><br />
                        <h7>
                            Upon signing up / logging in, you'll be able to access your referral code, which you can share with others to gain points -
                    earn enough points, and you can get cool rewards and NormWear swag.<br /><br />
                    If you're a first-time user who was directed to this site with a referral code, don't forget to submit the referral code when you sign up!
                </h7><br /><br />
                        <h5>Ready to get started? Then sign up or log in to see more!</h5>
                    </div>
                </div>
            );
        }

    }
}

export default withFirebase(Home);