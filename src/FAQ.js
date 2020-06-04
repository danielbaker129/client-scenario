import React, {Component} from 'react';
import './FAQ.css';

class FAQ extends Component {
    render() {
        return (
            <div>
            {/* <img src="https://i1.wp.com/www.additudemag.com/wp-content/uploads/2020/04/boy-jumping-near-grass-at-daytime-1104014.jpg?resize=1280%2C720px&ssl=1"
            style={{width:'60vw', marginLeft: '10vw', marginRight: '10vw', marginTop: '5vh', marginBottom: '5vh'}}
                /> */}
            <img src="https://thenorthernquota.org/sites/default/files/styles/article_main/public/adult-adventure-backpack-287240.jpg?itok=-Na3jqeu"
            style={{width:'60vw', marginLeft: '10vw', marginRight: '10vw', marginTop: '5vh', marginBottom: '5vh'}}
                />
            <div className="section">
            <h1 className="about-header">Frequently Asked Questions</h1>
            <h3 className="section-header">What is your commitment to sustainability?</h3>
            <div className="section-content">
                We at NormWear pride ourselves on doing our part to take care of the environment that we all share.
                That is why we are working with Allbirds, who make their shoes and boxes from environmentally safe resources.
                Additionally, we are also doing our part by providing our customers the ability to send us their worn shoes,
                which we will recycle and use as more shoes are made.
            </div><br/>
            <h3 className="section-header">How does the referral process work?</h3>
            <div className="section-content">
                Each time that someone you refer uses your code to sign up,
                you will receive one referral point. You also can receive one referral point 
                by sharing your referral code on both Facebook and Twitter (maximum of two referral points).
            </div><br/>
            <h3 className='section-header'>What is the benefit of referring others?</h3>
            <div className='section-content'>
            The points that you earn for referring others get you closer to our referral rewards!
                <ul>
                    <li>10 Points: Access to exclusive NormWear Facebook Group</li>
                    <li>25 Points: Pack of NormWear Stickers</li>
                    <li>50 Points: NormWear T-Shirt</li>
                    <li>100 Points: Free Pair of Shoes</li>
                </ul>
            </div>
        </div>

            </div>
        );
    }
}

export default FAQ;