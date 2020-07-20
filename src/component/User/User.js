import React from 'react';
import { Link } from 'react-router-dom';

const user = ( props ) => <tr
    onClick={ props.clicked}
>
    <td>{ props.id }</td>
    <td>{ props.FirstName }</td>
    <td>{ props.LastName }</td>
    <td>{ props.Email }</td>
    <td>
        <Link className="btn btn-block btn-dark" to={`/rooms/${props.id}`}>
            View Room
        </Link>
    </td>
</tr>;


export default user;