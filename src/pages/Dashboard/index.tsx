import React, { useState, FormEvent } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import api from "../../services/api";

import logoImg from '../../assets/logo.svg';

import { Title, Form, Repositories } from "./styles";

interface Repository {
    full_name: string;
    descripton: string;
    owner: {
        login: string;
        avatar_url: string;
    };
}

const Dashboard: React.FC = () => {
    // estado que vai armazenar o valor do input
    const [newRepo, setNewRepo] = useState('');
    // estado que vai armazenar e mostrar os repositorios que vem do service
    const [repositories, setRepositories] = useState<Repository[]>([]);

    async function handleAddRepository(event: FormEvent<HTMLFormElement>): Promise<void>{
        event.preventDefault();

        const response = await api.get<Repository>(`repos/${newRepo}`)

        const repositorios = response.data;

        setRepositories([...repositories, repositorios]);
        setNewRepo('');
    }

    return (
        <>
            <img src={logoImg} alt="Github Explorer"/>
            <Title>Explore repositórios no Github</Title>

            <Form onSubmit={handleAddRepository}>
                <input
                    value={newRepo}
                    // @ts-ignore
                    onChange={(e) => setNewRepo(e.target.value)}
                    placeholder="Digite o nome do repositório"
                />
                <button type="submit">Pesquisar</button>
            </Form>

            <Repositories>
                {repositories.map(repository => (
                    <a key={repository.full_name} href="teste">
                        <img
                            src={repository.owner.avatar_url}
                            alt={repository.owner.login}
                        />
                        <div>
                            <strong>{repository.full_name}</strong>
                            <p>{repository.descripton}</p>
                        </div>

                        <FiChevronRight size={20} />
                    </a>
                ))}
            </Repositories>
        </>
    );
};

export default Dashboard;
