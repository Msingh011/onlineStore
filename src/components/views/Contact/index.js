import React from "react";  

export default function Contact () {
    return (
        <>
        <div className="container">

            <form className="max-w-5xl m-10 overflow-hidden	mx-auto">
                <div className="form">
                    <input type="text" className="form-control" placeholder="Name" />
                </div>
                <div className="form">
                    <input type="text" className="form-control" id placeholder="Email Id" />
                </div>
                <div className="form">
                    <input type="text" className="form-control" id placeholder="Phone Number" />
                </div>
                <div className="form">
                    <textarea  className="form-control textarea" placeholder="Your Message"></textarea>
                </div>
                <div className="buttons text-center mt-3 overflow-hidden w-full float-left">
                    <button className="buttonsubmit">Submit</button>
                </div>
            </form>


          
            <table className="max-w-5xl rwd-table mx-auto">
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Email Id</th>
                    <th>Phone Number</th>
                    <th>Message</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>Jone</td>
                    <td>lorem@gmail.</td>
                    <td>45464</td>
                    <td>ddh</td>
                    </tr>
                </tbody>
            </table>
        </div>
        </>
    )
}