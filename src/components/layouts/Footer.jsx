import React from "react";

const Footer = () => {
	return (
			<>
				<div className="footer-ablove">
					<div className="container">
						<div className="row">
							<p>Looking For Exclusive Services?
								<button className="btn btn-default">Donate Now</button>
							</p>
						</div>
					</div>
				</div>

				<div className="copy">
					<div className="container">
						<a href="https://www.smarteyeapps.com/">2021 &copy; All Rights Reserved | Designed and Developed by Shubham</a>

						<span>
							<a href="/"><i className="fab fa-github"></i></a>
							<a href="/"><i className="fab fa-google-plus-g"></i></a>
							<a href="/"><i className="fab fa-pinterest-p"></i></a>
							<a href="/"><i className="fab fa-twitter"></i></a>
							<a href="/"><i className="fab fa-facebook-f"></i></a>
					</span>
					</div>

				</div>
			</>
	);
}
export default Footer;