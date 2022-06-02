import React, {Component} from 'react';
import { Row, Col } from 'antd';
import SatSetting from './SatSetting';
import axios from 'axios';
import SatelliteList from './SatelliteList';
import {BASE_URL, NEARBY_SATELLITE, SAT_API_KEY, STARLINK_CATEGORY} from "../constants";

class Main extends Component {
    constructor(){
        super();
        this.state = {
            satInfo: null,
            settings: null,
            isLoadingList: false
        };
    }

    showNearbySatellite = (setting) => {
        console.log('setting->', setting)
        this.setState({
            settings: setting
        })
        this.fetchSatellite(setting);
    }
        
        fetchSatellite= (setting) => {
            // get setting
        // send req to the server
        // analysis the res
        // case 1. 
            const {latitude, longitude, elevation, altitude} = setting;
            const url = `${BASE_URL }/api/${NEARBY_SATELLITE}/${latitude}/${longitude}/${elevation}/${altitude}/${STARLINK_CATEGORY}/&apiKey=${SAT_API_KEY}`;
    
       this.setState({
           isLoadingList: true
       });
    
       axios.get(url)
           .then(response => {
               console.log(response.data)
               this.setState({
                   satInfo: response.data,
                   isLoadingList: false
               })
           })
           .catch(error => {
               console.log('err in fetch satellite -> ', error);
           })
    

    }
    render() {
        const { satInfo, isLoadingList } = this.state;
        return (
            <Row className='main'>
                <Col span={8} className="left-side">
                    <SatSetting onShow = {this.showNearbySatellite}/>
                    <SatelliteList satInfo={satInfo}
                                   isLoad={isLoadingList}
                    />

                </Col>
                <Col span={16} className="right-side">
                    right
                </Col>
            </Row>
        );
    }
}

export default Main;


