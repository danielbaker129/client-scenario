import React, {Component} from 'react';
import './About.css';

class About extends Component {

    render() {
        return(
            <div>
                <img src="https://www.rei.com/dam/content_team_060519_01234_boots_vs_trail_runners_hero_lg.jpg"
                    style={{width:'60vw', marginLeft: '10vw', marginRight: '10vw', marginTop: '5vh', marginBottom: '5vh'}}
                />
                <div className="section">
                    <h1 className="about-header">About NormWear</h1>
                    <h3 className="section-header">Who we are</h3>
                    <div className="section-content">
                        Founders Annie Sharkey and Camille Cooper have always been environmentalists at heart, constantly seeking ways in which people can 
                        incorporate more envronmentally friendly materials in their everyday lives. With the advent and discovery of dihydrogen monoxide polymers 
                        as a new and game-changing natural polymer, Sharkey and Cooper realized a way to revolutionalize the footwear industry
                        simply by incorporating this material in all of their designs.
                    </div><br/>
                    <h3 className="section-header">Our mission</h3>
                    <div className="section-content">
                        NormWear prides itself in long-lasting, comfortable, and environmetally responsible footwear. By emphasizing the use of 
                        these environmentally friendly materials, whether natural or synthetic, NormWear seeks to promote environmentally conscious 
                        behavior and lifestyles amongst everyone. After all, people can care about our earth and be comfortable too. 
                    </div><br/>
                    <h3 className="section-header">Our products</h3>
                    <div className="section-content">
                        While the use of dihydrogen monoxide polymers is the crown jewel of NormWear's footwear production methodology, NormWear also 
                        ensures that the remaining components of their shoes are made of reusable and decomposible materials, including biodegradable 
                        plastics for the laces and natural oils to maximize comfort of the materials. With the use of these naturally degradable materials, 
                        NormWear shoes can be discarded safely, ready to be reclaimed by mother nature.
                    </div> <br/>
                    <h3 className="section-header">Our Materials</h3><br/>
                    <div>
                    <div>
                        
                        <div className="section-content" style={{display:"flex"}}>
                        <div className="materials-header">
                            <img src="https://fashionmaterials.weebly.com/uploads/2/6/5/7/26574289/1394688171.jpg" className="material-image"
                            /><br/>
                            <h6 className="material-label">Recycled Clothes</h6>
                        </div>
                        <div className="materials-header">
                            <img src="https://millyjonesblog.files.wordpress.com/2019/09/biodegradable-plastic-bag-500x500.jpeg?w=500" className="material-image"
                            /><br/>
                            <h6 className="material-label">Biodegradable Plastic</h6>
                        </div>
                        <div className="materials-header">
                            <img src="https://i0.wp.com/cdn-prod.medicalnewstoday.com/content/images/articles/326/326732/essential-oils-that-are-on-a-table.jpg?w=1155&h=1734" className="material-image"
                            /><br/>
                            <h6 className="material-label">Natural Oils</h6>
                        </div>
                        {/* have  bunch of materials in a row */}
                    </div>
                    </div>
                    
                    </div>
                </div>

            </div>
        );
    }
}

export default About;