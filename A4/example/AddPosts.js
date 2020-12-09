import React from 'react';
import { useState } from 'react';


export const AddPosts = ({ set }) => {


    const [getID, setID] = useState('');
    const [getText, setText] = useState('');
    const [getUsername, setUsername] = useState('');




    return (

        <>
            <h3> AddPosts </h3>


            <div>
                <input
                    type="text"
                    placeholder="ID"
                    value={getID}
                    onChange={e => setID(e.target.value)}
                />
            </div>
            <div>
                <input
                    type="text"
                    placeholder="Text"
                    value={getText}
                    onChange={e => setText(e.target.value)}
                />
            </div>
            <div>
                <input
                    type="text"
                    placeholder="Username"
                    value={getUsername}
                    onChange={e => setUsername(e.target.value)}
                />
            </div>
            

            <button onClick={(e) => {


                fetch('http://localhost:8888/read', {
                    method: 'POST',
                    body: `id=${getID}&username=${getUsername}&text=${getText}`,
                    headers: { 'Content-type': 'application/x-www-form-urlencoded' }
                })

                    .then(fetch('http://localhost:8888/create')
                        .then(response => response.json())
                        .then(response => set(response))
                        .then(alert(`ID: ${getID}, Text: ${getText}, Username: ${getUsername} `))
                    );

            }
            }> Submit</button>


        </>
    );


}