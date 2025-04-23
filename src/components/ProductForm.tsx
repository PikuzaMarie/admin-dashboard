import React, { FormEvent } from 'react';

import { CATEGORIES } from '../constants';
import { Category, Product } from '../types';

interface EditProductPageFormFileds extends HTMLFormControlsCollection {
  title: HTMLInputElement;
  description: HTMLInputElement;
  thumbnail: HTMLInputElement;
  brand: HTMLInputElement;
  category: HTMLSelectElement;
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

    const title = elements.title.value;
    const description = elements.description.value;
    const thumbnail = elements.thumbnail.value;
    const category = elements.category.value as Category;
    const brand = elements.brand.value;
    const price = +elements.price.value;
    const stock = +elements.stock.value;

    const updatedProduct = {
      title,
      description,
      thumbnail,
      category,
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
          htmlFor="category"
          className="block text-sm/6 font-medium text-stone-900"
        >
          Category
        </label>
        <div className="grid grid-cols-1">
          <select
            id="category"
            name="category"
            defaultValue={product?.category}
            required
            className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-stone-900 outline-1 -outline-offset-1 outline-stone-300 focus:outline-2 focus:-outline-offset-2 focus:outline-violet-600 sm:text-sm/6"
          >
            <option value=""></option>
            {CATEGORIES.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <svg
            className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-stone-500 sm:size-4"
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden="true"
            data-slot="icon"
          >
            <path
              fill-rule="evenodd"
              d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
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
