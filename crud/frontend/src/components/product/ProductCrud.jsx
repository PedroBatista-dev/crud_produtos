import React, { Component } from 'react';
import axios from 'axios';
import Main from '../template/Main';

const headerProps = {
    icon: 'dropboxdropbox',
    title: 'Produtos',
    subtitle: 'Cadastro de Produtos: Incluir, Listar, Editar e Excluir!'
}

const baseUrl = 'http://localhost:5000/product';
const initialState = {
    product: { nome: '', quantidade: 0, valorUnit: 0},
    list: []
}

export default class ProductCrud extends Component {

    state = { ...initialState };

    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data });
        });
    }

    clear() {
        this.setState( { product: initialState.product });
    }

    save() {
        const product = this.state.product;
        const method = product.id ? 'put' : 'post';
        const url = product.id ? `${baseUrl}/${product.id}` : baseUrl;
        axios[method](url, product)
            .then(resp => {
                const list = this.getUpdatedList(resp.data);
                this.setState({ product: initialState.product, list });
            });
    }

    getUpdatedList(product, add = true) {
        const list = this.state.list.filter(p => p.id !== product.id);
        if (add) list.unshift(product);
        return list;
    }

    updateField(event) {
        const product = { ...this.state.product };
        product[event.target.name] = event.target.value;
        this.setState({ product });
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome</label>
                            <input type="text" className="form-control" 
                            name="nome" value={this.state.product.nome}
                            onChange={e => this.updateField(e)}
                            placeholder="Nome do Produto" />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Quantidade</label>
                            <input type="number" className="form-control" 
                            name="quantidade" value={this.state.product.quantidade}
                            onChange={e => this.updateField(e)}
                            placeholder="Quantidade" />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Valor Unitario</label>
                            <input type="number" className="form-control" 
                            name="valorUnit" value={this.state.product.valorUnit}
                            onChange={e => this.updateField(e)}
                            placeholder="Valor Unitario" />
                        </div>
                    </div>
                </div>

                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary" onClick={e => this.save(e)}>
                            Salvar
                        </button>
                        <button className="btn btn-secondary ml-2" onClick={e => this.clear(e)}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    load(product) {
        this.setState({ product });
    }

    remove(product) {
        axios.delete(`${baseUrl}/${product.id}`).then(resp => {
            const list = this.getUpdatedList(product, false);
            this.setState({ list });
        });
    }

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Quantidade</th>
                        <th>Valor Unitario</th>
                        <th>Acoes</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows() {
        return this.state.list.map(product => {
            return (
                <tr key={product.id}>
                    <td>{product.nome}</td>
                    <td>{product.quantidade}</td>
                    <td>{product.valorUnit}</td>
                    <td>
                        <button className="btn btn-warning" onClick={() => this.load(product)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2" onClick={() => this.remove(product)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            );
        });
    }

    render() {
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}