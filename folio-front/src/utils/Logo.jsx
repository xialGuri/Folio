import React from "react";
import { Link } from 'react-router-dom';

const Logo = ({ width }) => {
    return (
        <>
            <Link to="/"><img src="/logo.png" width={width} alt="Logo" /></Link>
        </>
    );
};

export default Logo;