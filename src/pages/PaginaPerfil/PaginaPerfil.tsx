// PaginaPerfil.tsx
import React, { useState, useEffect } from 'react';
import { apiGet, apiPut, apiDelete } from '../../api/RestClient';
import { Button, TextField, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { useNavigate } from 'react-router-dom';
import { IPaginaPerfil } from './types';
import './PaginaPerfil.css';

const PaginaPerfil: React.FC = () => {
  const [paginaPerfil, setPaginaPerfil] = useState<IPaginaPerfil | null>(null);
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const usuarioAutenticado = JSON.parse(localStorage.getItem('authenticatedUser') || '{}');
    const usuarioId = usuarioAutenticado.id;

    if (usuarioId) {
      apiGet(`/clientes/carregar/${usuarioId}`).then(response => {
        if (response.status === 200) {
          setPaginaPerfil(response.data);
        }
      });
    } else {
      console.error('Usuário não autenticado ou ID não encontrado');
    }
  }, []);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPaginaPerfil(prevState => {
      if (prevState === null) return null;
      return {
        ...prevState,
        [name]: value
      } as IPaginaPerfil;
    });
  };

  const handleUpdate = () => {
    if (paginaPerfil) {
      apiPut(`/clientes/atualizar/${paginaPerfil.id}`, paginaPerfil).then(response => {
        if (response.status === 200) {
          alert('Perfil atualizado com sucesso!');
          setEditMode(false);
          setPaginaPerfil(response.data);
        } else {
          alert('Ocorreu um erro ao atualizar o perfil.');
        }
      }).catch(error => {
        console.error('Erro na requisição:', error);
        alert('Erro ao enviar os dados para o servidor.');
      });
    }
  };

  const handleDelete = () => {
    if (paginaPerfil && window.confirm('Tem certeza que deseja deletar sua conta?')) {
      apiDelete(`/clientes/deletar/${paginaPerfil.id}`).then(response => {
        if (response.status === 200) {
          alert('Conta deletada com sucesso!');
          localStorage.removeItem('authenticatedUser');
          navigate('/');
        }
      });
    }
  };

  if (!paginaPerfil) {
    return <div>Carregando perfil...</div>;
  }

  return (
    <div className="perfil-container">
      <h1 className="perfil-header">Perfil do Usuário</h1>
      {editMode ? (
        <>
          <div className="secao">
            <TextField className="perfil-field" label="Nome" name="nome" value={paginaPerfil.nome} onChange={handleChange} />
          </div>
          <div className="secao">
            <TextField className="perfil-field" label="Sobrenome" name="sobrenome" value={paginaPerfil.sobrenome} onChange={handleChange} />
          </div>
          <div className="secao">
            <TextField className="perfil-field" label="Email" name="email" value={paginaPerfil.email} onChange={handleChange} />
          </div>
          <div className="secao">
            <TextField className="perfil-field" label="Telefone" name="telefone" value={paginaPerfil.telefone} onChange={handleChange} />
          </div>
          <div className="secao">
            <TextField className="perfil-field" label="CPF" name="cpf" value={paginaPerfil.cpf} onChange={handleChange} />
          </div>
          <div className="perfil-actions">
            <IconButton color="primary" onClick={handleUpdate}>
              <SaveIcon />
            </IconButton>
            <IconButton color="secondary" onClick={handleCancel}>
              <CancelIcon />
            </IconButton>
          </div>
        </>
      ) : (
        <>
          <p><strong>Nome:</strong> {paginaPerfil.nome}</p>
          <hr className='hr'/>
          <p><strong>Sobrenome:</strong> {paginaPerfil.sobrenome}</p>
          <hr className='hr'/>
          <p><strong>Email:</strong> {paginaPerfil.email}</p>
          <hr className='hr'/>
          <p><strong>Telefone:</strong> {paginaPerfil.telefone}</p>
          <hr className='hr'/>
          <p><strong>CPF:</strong> {paginaPerfil.cpf}</p>
          <hr className='hr'/>
          <div className="perfil-actions">
            <IconButton color="primary" onClick={handleEdit}>
              <EditIcon />
            </IconButton>
            <IconButton color="error" onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </div>
        </>
      )}
    </div>
  );
};

export default PaginaPerfil;
