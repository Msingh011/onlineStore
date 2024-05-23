import React from "react";
import media from "../media";


export default function Header() {

	// const topMenu = ['Login', 'Signup'];
	const mainMenu = ['home', 'allProducts', 'contact'];

	
	// const mainMenu = ['home', 'store', 'allProducts', 'contact'];
	return (
		<>
			{/* <div className="wrap p-3">
				<div className="header">
					<div className="search-bar">
				<form>
					<input type="text"/><input type="submit" value="Search" />
				</form>
			</div>
					<div className="clear"> </div>
					<div className="header-top-nav">
						<ul className="m-0">
							{topMenu.map((val) => {
								return <li key={val} ><a href={'/' + val}>{val.toUpperCase()}</a></li>
							})}
						</ul>
					</div>
					<div className="clear"> </div>
				</div>
			</div> */}
			<div className="clear"> </div>
			<div className="top-header">
				<div className="wrap">
					<div className="logo">
						<a href="/">
							<img src={media.logo} title="logo" />
						</a>
					</div>

					<div className="top-nav">
						<ul className="m-0">
							{mainMenu.map((val) => {
								return <li key={val}><a href={'/' + val}>{val}</a></li>
							})}
						</ul>
					</div>
					<div className="clear"> </div>
				</div>
			</div>
		</>
	)
}