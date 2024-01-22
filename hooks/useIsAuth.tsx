import React from "react";
import { API_URL } from "@/helpers/contrants";

export function useIsAuth(cookie: any): any {
    const [isLoadded, setIsLoadded] = React.useState(true)
    const [isAuthenticated, setIsAuthenticated] = React.useState(false)
    const [error, setError] = React.useState(false)

    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", "Bearer " + cookie);

    fetch(API_URL + "/user", {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    })
        .then(response => response.json())
        .then(result => {
            if (result.data) {
                setIsAuthenticated(true)
            } else {
                setIsAuthenticated(false)
            }
        })
        .catch(error => {
            console.error('error', error)
            setError(true)
        })
        .finally(() => {
            setIsLoadded(false)
        });

    return {
        isLoadded,
        isAuthenticated,
        error
    }
}