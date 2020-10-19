import React from "react";
import {useParams} from "react-router-dom";

export default function Users() {
    const {users} = useParams<{users?: string}>();
    return (<>hello {users}</>);
}
