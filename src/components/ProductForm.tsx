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
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <p className="flex flex-col gap-2">
        <label
          htmlFor="sku"
          className="block text-sm/6 font-medium text-stone-900"
        >
          Sku
        </label>
        <input
          type="text"
          id="sku"
          name="sku"
          defaultValue={product?.sku}
          required
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-stone-900 outline-1 -outline-offset-1 outline-stone-300 focus:outline-2 focus:-outline-offset-2 focus:outline-violet-600 sm:text-sm/6"
        />
      </p>
      <p className="flex flex-col gap-2">
        <label
          htmlFor="title"
          className="block text-sm/6 font-medium text-stone-900"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          defaultValue={product?.title}
          required
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-stone-900 outline-1 -outline-offset-1 outline-stone-300 focus:outline-2 focus:-outline-offset-2 focus:outline-violet-600 sm:text-sm/6"
        />
      </p>
      <p className="flex flex-col gap-2">
        <label
          htmlFor="description"
          className="block text-sm/6 font-medium text-stone-900"
        >
          Description
        </label>
        <textarea
          rows={2}
          id="description"
          name="description"
          defaultValue={product?.description}
          required
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-stone-900 outline-1 -outline-offset-1 outline-stone-300 focus:outline-2 focus:-outline-offset-2 focus:outline-violet-600 sm:text-sm/6"
        />
      </p>

      <p className="flex flex-col gap-2">
        <label
          htmlFor="thumbnail"
          className="block text-sm/6 font-medium text-stone-900"
        >
          Thumbnail
        </label>
        <input
          type="url"
          id="thumbnail"
          name="thumbnail"
          defaultValue={product?.thumbnail}
          required
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-stone-900 outline-1 -outline-offset-1 outline-stone-300 focus:outline-2 focus:-outline-offset-2 focus:outline-violet-600 sm:text-sm/6"
        />
      </p>
      <p className="flex flex-col gap-2">
        <label
          htmlFor="brand"
          className="block text-sm/6 font-medium text-stone-900"
        >
          Brand
        </label>
        <input
          type="text"
          id="brand"
          name="brand"
          defaultValue={product?.brand}
          required
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-stone-900 outline-1 -outline-offset-1 outline-stone-300 focus:outline-2 focus:-outline-offset-2 focus:outline-violet-600 sm:text-sm/6"
        />
      </p>
      <p className="flex flex-col gap-2">
        <label
          htmlFor="price"
          className="block text-sm/6 font-medium text-stone-900"
        >
          Price
        </label>
        <input
          type="text"
          id="price"
          name="price"
          defaultValue={product?.price}
          required
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-stone-900 outline-1 -outline-offset-1 outline-stone-300 focus:outline-2 focus:-outline-offset-2 focus:outline-violet-600 sm:text-sm/6"
        />
      </p>
      <p className="flex flex-col gap-2">
        <label
          htmlFor="stock"
          className="block text-sm/6 font-medium text-stone-900"
        >
          Stock
        </label>
        <input
          type="text"
          id="stock"
          name="stock"
          defaultValue={product?.stock}
          required
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-stone-900 outline-1 -outline-offset-1 outline-stone-300 focus:outline-2 focus:-outline-offset-2 focus:outline-violet-600 sm:text-sm/6"
        />
      </p>
      <p className="flex justify-end gap-4">
        <button
          type="reset"
          className="flex rounded-md border border-stone-200 px-4 py-2 text-sm font-semibold hover:border-stone-400"
        >
          Reset
        </button>
        <button
          type="submit"
          className="flex rounded-md border bg-violet-800 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-900"
        >
          Save
        </button>
      </p>
    </form>
  );
};
