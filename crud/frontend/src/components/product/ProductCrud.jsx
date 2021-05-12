import React, { Component } from 'react';
import axios from 'axios';
import Main from '../template/Main';

const headerProps = {
    icon: 'dropboxdropbox',
    title: 'Produtos',
    subtitle: 'Cadastro de Produtos: Incluir, Listar, Editar e Excluir!'
}

const baseUrl = 'http://localhost:3001/produtos';
const initialState = {
    product: { nome: '', quantidade: 0, valorUnit: 0},
    list: []
}

export default class ProductCrud extends Component {

    state = { ...initialState };

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
            })
    }

    getUpdatedList(product) {
        const list = this.state.list.filter(p => p.id !== product.id);
        list.unshift(product);
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

    render() {
        return (
            <Main {...headerProps}>
                {this.renderForm()}
            </Main>
        )
    }
}