import { Button, Radio } from "antd";
import Image from "next/image";
import React from "react";
import Payment from "../Payment/Payment";
import visa from "./../../../../../public/assets/images/visa.svg";
import mastercard from "./../../../../../public/assets/images/mastercard.svg";
import { PlusOutlined } from "@ant-design/icons";
import _Classes from './MakePayment.module.scss';

function MakePayment() {
	return (
		<div>
			<Payment visa={visa}/>
            
            <Payment visa={mastercard}/>
            <div className="flex items-center"><PlusOutlined className={`${_Classes["icon-color"]}`}/> <span className="text-primary">Ad Payment Method</span></div>
	<div className="flex justify-end">
        <Button type="primary" className={`${_Classes["button-color"]}`}>Pay $5900</Button>
        
    </div>
    	</div>
	);
}

export default MakePayment;
