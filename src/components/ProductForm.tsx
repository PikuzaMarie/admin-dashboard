import React, { FormEvent } from 'react';

import { Product } from '../types';

interface EditProductPageFormFileds extends HTMLFormControlsCollection {
  sku: HTMLInputElement;
  title: HTMLInputElement;
  description: HTMLInputElement;
  thumbnail: HTMLInputElement;
  brand: HTMLInputElement;
  price: HTMLInputElement;
  stock: HTMLInputElement;
}

interface EditProductPageFormElements extends HTMLFormElement {
  readonly elements: EditProductPageFormFileds;
}

interface ProductFormProps {
  product?: Product;
  onSubmit: (productData: Partial<Product>) => void;
}

export const ProductForm: React.FC<ProductFormProps> = ({
  onSubmit,
  product,
}) => {
  const handleSubmit = (e: FormEvent<EditProductPageFormElements>) => {
    e.preventDefault();

    const { elements } = e.currentTarget;
    const sku = elements.sku.value;
    const title = elements.title.value;
    const description = elements.description.value;
    const thumbnail = elements.thumbnail.value;
    const brand = elements.brand.value;
    const price = +elements.price.value;
    const stock = +elements.stock.value;

    const updatedProduct = {
      sku,
      title,
      description,
      thumbnail,
      brand,
      price,
      stock,
    };

    onSubmit(updatedProduct);
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>
        <label htmlFor="sku">Sku</label>
        <input
          type="text"
          id="sku"
          name="sku"
          defaultValue={product?.sku}
          required
        />
      </p>
      <p>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          defaultValue={product?.title}
          required
        />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          name="description"
          defaultValue={product?.description}
          required
        />
      </p>
      <p>
        <label htmlFor="thumbnail">Thumbnail</label>
        <input
          type="url"
          id="thumbnail"
          name="thumbnail"
          defaultValue={product?.thumbnail}
          required
        />
      </p>
      <p>
        <label htmlFor="brand">Brand</label>
        <input
          type="text"
          id="brand"
          name="brand"
          defaultValue={product?.brand}
          required
        />
      </p>
      <p>
        <label htmlFor="price">Price</label>
        <input
          type="text"
          id="price"
          name="price"
          defaultValue={product?.price}
          required
        />
      </p>
      <p>
        <label htmlFor="stock">Stock</label>
        <input
          type="text"
          id="stock"
          name="stock"
          defaultValue={product?.stock}
          required
        />
      </p>
      <p>
        <button type="reset">Reset</button>
        <button type="submit">Save</button>
      </p>
    </form>
  );
};
