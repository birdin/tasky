import { API_URL } from "@/helpers/contrants";
import { useState } from "react";

export const useDelete = ({ slug, cookies }: { slug?: string, cookies: any }) => {
    const [isDeleted, setIsDeleted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", "Bearer " + cookies);

    const requestOptions: any = {
        method: "DELETE",
        headers: myHeaders,
        redirect: "follow"
    };

    const handleDelete = async () => {
        setIsLoading(true)
        fetch(API_URL + "/projects/" + slug, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setIsDeleted(true)
            })
            .catch((error) => {
                console.error(error)
                setError(error)
            }).finally(() => {
                setIsLoading(false)
            }
            );
    }

    return {
        deleteBoard: () => handleDelete,
        isDeleted,
        isLoading,
        error
    }

};