import React, { FormEvent, useState } from 'react';

import { CATEGORIES } from '../constants';
import { Category, InputErrors, Product } from '../types';
import {
  validateBrand,
  validateCategory,
  validateDescription,
  validatePrice,
  validateStock,
  validateThumbnailURL,
  validateTitle,
} from '../utils';

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

const initialErrors: InputErrors = {
  titleError: '',
  descriptionError: '',
  thumbnailError: '',
  categoryError: '',
  brandError: '',
  priceError: '',
  stockError: '',
};

export const ProductForm: React.FC<ProductFormProps> = ({
  onSubmit,
  product,
}) => {
  const [errors, setErrors] = useState<InputErrors>(initialErrors);

  const handleInputChange = (field: keyof InputErrors) => {
    setErrors(prevValues => ({ ...prevValues, [field]: '' }));
  };

  const handleSubmit = (e: FormEvent<EditProductPageFormElements>) => {
    e.preventDefault();

    const { elements } = e.currentTarget;

    const title = elements.title.value;
    const description = elements.description.value;
    const thumbnail = elements.thumbnail.value;
    const category = elements.category.value as Category;
    const brand = elements.brand.value;
    const price = elements.price.value;
    const stock = elements.stock.value;

    const errors = {
      titleError: validateTitle(title),
      descriptionError: validateDescription(description),
      thumbnailError: validateThumbnailURL(thumbnail),
      categoryError: validateCategory(category),
      brandError: validateBrand(brand),
      priceError: validatePrice(price),
      stockError: validateStock(stock),
    };

    if (Object.values(errors).join('').length > 0) {
      setErrors(errors);
      return;
    }

    const updatedProduct = {
      title,
      description,
      thumbnail,
      category,
      brand,
      price: +price,
      stock: +stock,
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
          onChange={() => handleInputChange('titleError')}
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-stone-900 outline-1 -outline-offset-1 outline-stone-300 focus:outline-2 focus:-outline-offset-2 focus:outline-violet-600 sm:text-sm/6"
        />
        {errors && errors.titleError && (
          <p className="text-sm/tight text-red-800">{errors.titleError}</p>
        )}
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
          onChange={() => handleInputChange('descriptionError')}
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-stone-900 outline-1 -outline-offset-1 outline-stone-300 focus:outline-2 focus:-outline-offset-2 focus:outline-violet-600 sm:text-sm/6"
        />
        {errors && errors.descriptionError && (
          <p className="text-sm/tight text-red-800">
            {errors.descriptionError}
          </p>
        )}
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
          onChange={() => handleInputChange('thumbnailError')}
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-stone-900 outline-1 -outline-offset-1 outline-stone-300 focus:outline-2 focus:-outline-offset-2 focus:outline-violet-600 sm:text-sm/6"
        />
        {errors && errors.thumbnailError && (
          <p className="text-sm/tight text-red-800">{errors.thumbnailError}</p>
        )}
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
            onChange={() => handleInputChange('categoryError')}
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
        {errors && errors.categoryError && (
          <p className="text-sm/tight text-red-800">{errors.categoryError}</p>
        )}
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
          onChange={() => handleInputChange('brandError')}
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-stone-900 outline-1 -outline-offset-1 outline-stone-300 focus:outline-2 focus:-outline-offset-2 focus:outline-violet-600 sm:text-sm/6"
        />
        {errors && errors.brandError && (
          <p className="text-sm/tight text-red-800">{errors.brandError}</p>
        )}
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
          onChange={() => handleInputChange('priceError')}
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-stone-900 outline-1 -outline-offset-1 outline-stone-300 focus:outline-2 focus:-outline-offset-2 focus:outline-violet-600 sm:text-sm/6"
        />
        {errors && errors.priceError && (
          <p className="text-sm/tight text-red-800">{errors.priceError}</p>
        )}
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
          onChange={() => handleInputChange('stockError')}
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-stone-900 outline-1 -outline-offset-1 outline-stone-300 focus:outline-2 focus:-outline-offset-2 focus:outline-violet-600 sm:text-sm/6"
        />
        {errors && errors.stockError && (
          <p className="text-sm/tight text-red-800">{errors.stockError}</p>
        )}
        <p className="flex flex-col gap-1">
          <p className="flex gap-1 text-sm">
            <input
              type="radio"
              name="stockValue"
              id="inStock"
              value="In Stock"
              defaultChecked={product?.availabilityStatus === 'In Stock'}
              className="relative size-4 appearance-none rounded-full border border-stone-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-violet-600 checked:bg-violet-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 disabled:border-stone-300 disabled:bg-stone-100 disabled:before:bg-stone-400 forced-colors:appearance-auto forced-colors:before:hidden"
            />
            <label htmlFor="inStock">In Stock</label>
          </p>
          <p className="flex gap-1 text-sm">
            <input
              type="radio"
              name="stockValue"
              id="lowStock"
              value="Low Stock"
              defaultChecked={product?.availabilityStatus === 'Low Stock'}
              className="relative size-4 appearance-none rounded-full border border-stone-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-violet-600 checked:bg-violet-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 disabled:border-stone-300 disabled:bg-stone-100 disabled:before:bg-stone-400 forced-colors:appearance-auto forced-colors:before:hidden"
            />
            <label htmlFor="lowStock">Low Stock</label>
          </p>
        </p>
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
