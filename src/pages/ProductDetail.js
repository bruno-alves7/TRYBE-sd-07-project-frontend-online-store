import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as api from '../services/api';
import CommentsList from '../components/CommentsList';

class ProductDetail extends Component {
  constructor() {
    super();

    this.getProduct = this.getProduct.bind(this);
    this.callingFirst = this.callingFirst.bind(this);
    this.state = {
      name: 'Teste',
      imagePath: '',
      price: 0,
      details: [],
    };
  }

  componentDidMount() {
    this.callingFirst();
  }

  async getProduct() {
    const { match } = this.props;
    const { id, categoryId } = match.params;
    const { results } = await api.getProductsFromCategoryAndQuery(categoryId, '');
    const productDetail = results.filter((result) => result.id === id);

    this.setState({
      name: productDetail[0].title,
      imagePath: productDetail[0].thumbnail,
      price: productDetail[0].price,
      details: productDetail[0].attributes,
    });
  }


  async callingFirst() {
    await this.getProduct();
  }

  render() {
    const { name, imagePath, price, details } = this.state;
    const arrayOfComments = [
      { id: 0, name: 'John Snow', rating: 4, comment: 'That was dope!' },
      { id: 1, name: 'Arya Stark', rating: 2, comment: 'Not good enough for me.' },
    ];
    return (
      <>
        <div data-testid="product-detail-name">
          <Link to="/">Home</Link>
          <h1>Product Detail</h1>
          <p>
            Name:
            {' '}
            <span>{name}</span>
          </p>
          <img src={ imagePath } alt={ name } />
          <p>
            Price:
            {' '}
            <span>{price}</span>
          </p>
          <div>
            Details:
            {' '}
            {
              details.map((element) => (
                <div key={ element.id }>
                  {element.name}
                  {' '}
                  -
                  {' '}
                  <span>{element.value_name}</span>
                </div>))
            }
            ,
          </div>
        </div>
        <CommentsList comments={ arrayOfComments } />
      </>
    );
  }
}

ProductDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
      categoryId: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default ProductDetail;
