import React, { Component } from "react";
import withContext from "../withContext";
import { Redirect } from "react-router-dom";
import axios from 'axios';

const initState = {
  name: "",
  price: 0,
  stock: "",
  description: "",
  unit_measure: "PEÇA",
  subcategory: 1, 
  brandid: 1, 
  image: "",
  userid: "xxxxxxx", 
  active: 1,  
};

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = initState;
  
  }

  save = async (e) => {
    e.preventDefault();

    const { 
      name, 
      description, 
      unity_measure, 
      subcategory, 
      brandid, 
      price, 
      image, 
      stock, 
      userid, active 
    } = this.state;

    if (name && price) {
      const id = Math.random().toString(36).substring(2) + Date.now().toString(36);
      
      var date_added = new Date(Date.now()).toString;
      var date_updated = new Date(Date.now()).toString;      

      await axios.post(
        'http://localhost:3001/products',
        { id, name, description, unity_measure, subcategory, brandid, price, image, stock, date_added, date_updated, userid, active },
      )

      this.props.context.addProduct(
        {
          id, 
          name, 
          description, 
          unity_measure, 
          subcategory, 
          brandid, 
          price, 
          image, 
          stock: stock || 0,
          date_added, 
          date_updated, 
          userid, 
          active        
          
        },
        () => this.setState(initState)
      );
      this.setState(
        { flash: { status: 'is-success', msg: 'Produto criado com sucesso' }}
      );

    } else {
      this.setState(
        { flash: { status: 'is-danger', msg: 'Por favor, entre com o nome do produto e o preço' }}
      );
    }
  };

  handleChange = e => this.setState({ [e.target.name]: e.target.value, error: "" });

  render() {
    const { 
      name, 
      price, 
      unity_measure, 
      subcategory, 
      brandid, 
      image, 
      stock, 
      description, 
      } = this.state;

    const { user } = this.props.context;

    return !(user && user.accessLevel < 1) ? (
      <Redirect to="/" />
    ) : (
      <>
        <div className="hero is-link is-small ">
          <div className="hero-body container">
            <h4 className="title">Novo Produto</h4>
          </div>
        </div>
        <br />
        <br />
        <form onSubmit={this.save}>
          <div className="columns is-mobile is-centered">
            <div className="column is-one-third">
              <div className="field">
                <label className="label">Nome do Produto: </label>
                <input
                  className="input"
                  type="text"
                  name="name"
                  value={name}
                  onChange={this.handleChange}
                  required
                />
              </div>

              <div className="field">
                <label className="label">Categoria : </label>
                <input
                  className="input"
                  type="text"
                  name="Subcategoria"
                  value={subcategory}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="field">
                <label className="label">Marca : </label>
                <input
                  className="input"
                  type="text"
                  name="Marca"
                  value={brandid}
                  onChange={this.handleChange}
                  required
                />
              </div>

              <div className="field">
                <label className="label">Unidade de Medida : </label>
                <input
                  className="input"
                  type="text"
                  name="unity_measure"
                  value={unity_measure}
                  onChange={this.handleChange}
                  required
                />
              </div>

              <div className="field">
                <label className="label">Preço: </label>
                <input
                  className="input"
                  type="number"
                  name="price"
                  value={price}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="field">
                <label className="label">Estoque disponível: </label>
                <input
                  className="input"
                  type="number"
                  name="stock"
                  value={stock}
                  onChange={this.handleChange}
                />
              </div>        

              <div className="field">
                <label className="label">Descrição: </label>
                <textarea
                  className="textarea"
                  type="text"
                  rows="2"
                  style={{ resize: "none" }}
                  name="description"
                  value={description}
                  onChange={this.handleChange}
                />
              </div>
              {this.state.flash && (
                <div className={`notification ${this.state.flash.status}`}>
                  {this.state.flash.msg}
                </div>
              )}
              <div className="field is-clearfix">
                <button
                  className="button is-primary is-outlined is-pulled-right"
                  type="submit"
                  onClick={this.save}
                >
                  Cadastrar
                </button>
              </div>
            </div>
          </div>
        </form>
      </>
    );
  }
}

export default withContext(AddProduct);