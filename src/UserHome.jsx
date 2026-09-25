import React from 'react';

export default function UserHome() {
    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <div className="text-center mt-10">
            <h1 className="text-3xl font-bold">
                Welcome {user?.firstName}
            </h1>

        </div>
    );
}