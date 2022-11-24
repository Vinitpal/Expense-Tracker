import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
{/* <link rel="stylesheet" href="Navbar.css"> */}
const Navbar = () => {
    return(
        // <div className=""></div>
        <>
        <div className="navbar">
		    <div className="logo">
			<a href="/">Expense Tracker</a>
		</div>
		<div className="nav_right">
			<ul>
				<li className="nr_li dd_main">
					<img src="profile_pic.png" alt="profile_img" />
				
					<div className="dd_menu">
						<div className="dd_left">
							{/* <ul>
								<li><i class="fas fa-map-marker-alt"></i></li>
								<li><i class="far fa-star"></i></li>
								<li><i class="far fa-plus-square"></i></li>
								<li><i class="fas fa-cog"></i></li>
								<li><i class="fas fa-download"></i></li>
								<li><i class="fas fa-sign-out-alt"></i></li>
							</ul> */}
						</div>
						<div className="dd_right">
							<ul>
								<li>Location</li>
								<li>Favorites</li>
								<li>Addpeople</li>
								<li>Settings</li>
								<li>Downloads</li>
								<li>Logout</li>
							</ul>
						</div>
					</div>
				</li>
				<li className="nr_li">
					<i className="fas fa-envelope-open-text"></i>
				</li>
			</ul>
		</div>
	</div>
        </>
    )
}



export default Navbar;