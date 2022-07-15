import React, { useState, useEffect, FormEvent } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import api from "../../services/api";

import logoImg from '../../assets/logo.svg';

import { Title, Form, Repositories, Error } from "./styles";

interface Repository {
    full_name: string;
    description: string;
    owner: {
        login: string;
        avatar_url: string;
    };
}

const Dashboard: React.FC = () => {
    // estado que vai armazenar o valor do input
    const [newRepo, setNewRepo] = useState('');
    const [inputError, setInputError] = useState('');
    // estado que vai armazenar e mostrar os repositorios que vem do service
    const [repositories, setRepositories] = useState<Repository[]>(() => {
        const storagedRepositories = localStorage.getItem(
          '@GithubExplorer:repositories',
        );
        // utilizado o JSON.parse para transformar o repositories em array de novo
        if (storagedRepositories) {
            return JSON.parse(storagedRepositories);
        }

        return [];
    });
    // useEffect utilizado para salvar os "repositories" dentro do local storage.
    // JSON.stringify é utilizado para transformar um array em json string, pois useEffect não pode ser utilizado com array
    useEffect(() => {
        localStorage.setItem('@GithubExplorer:repositories', JSON.stringify(repositories));
    }, [repositories])

    async function handleAddRepository(event: FormEvent<HTMLFormElement>): Promise<void>{
        event.preventDefault();

        if (!newRepo) {
            setInputError('Digite o autor/nome do repositório');
            return;
        }

        try {
            const response = await api.get<Repository>(`repos/${newRepo}`)

            const repositorios = response.data;

            setRepositories([...repositories, repositorios]);
            setNewRepo('');
            setInputError('')
        } catch (err){
            setInputError('Erro na busca por esse repositório')
        }
    }

    return (
        <>
            <img src={logoImg} alt="Github Explorer"/>
            <Title>Explore repositórios no Github</Title>

            <Form hasError={!!inputError} onSubmit={handleAddRepository}>
                <input
                    value={newRepo}
                    // @ts-ignore
                    onChange={(e) => setNewRepo(e.target.value)}
                    placeholder="Digite o nome do repositório"
                />
                <button type="submit">Pesquisar</button>
            </Form>

            { inputError && <Error>{inputError}</Error> }

            <Repositories>
                {repositories.map(repository => (
                    <a key={repository.full_name} href="teste">
                        <img
                            src={repository.owner.avatar_url}
                            alt={repository.owner.login}
                        />
                        <div>
                            <strong>{repository.full_name}</strong>
                            <p>{repository.description}</p>
                        </div>

                        <FiChevronRight size={20} />
                    </a>
                ))}
            </Repositories>
        </>
    );
};

export default Dashboard;
