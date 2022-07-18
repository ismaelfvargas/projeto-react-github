import React from 'react';
// @ts-ignore
import { useMatch, Link } from 'react-router-dom'
import { FiChevronLeft } from "react-icons/fi";

import logoImg from '../../assets/logo.svg';

import { Header } from "./styles";

// interface RepositoryParams {
//     repository: string;
// }

const Repository: React.FC = () => {
    // @ts-ignore
    // const { params } = useMatch<RepositoryParams>();

    return (
        <Header>
            <img src={logoImg} alt="Github Explorer" />
            <Link to="/dashboard">
                <FiChevronLeft size={16} />
                Voltar
            </Link>
        </Header>
    );
};

export default Repository;
