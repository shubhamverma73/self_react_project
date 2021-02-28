import React from "react";

const Footer = (props) => {
	return (
			<>
				{
					(props.value === '') ? '' :
					<footer className="main-footer">
						<div className="pull-right hidden-xs">
							All rights reserved.
							<strong><a className="hyperlink-color" href="http://triad01.com/" target="_blank" rel="noreferrer">TRIAD Technologies Pvt Ltd.</a></strong>
						</div>
						<strong>Copyright &copy; 2021 <a className="hyperlink-color" href="http://retailerloyaltyomron.in/" target="_blank" rel="noreferrer">Triad01</a>.</strong> 
					</footer>
				}
			</>
	);
}
export default Footer;