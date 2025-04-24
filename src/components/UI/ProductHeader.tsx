import React from 'react';
import { IconType } from 'react-icons';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, LinkProps } from 'react-router-dom';

interface ProductHeaderProps {
  backLinkText: string;
  children?: React.ReactNode;
}

export const ProductHeader: React.FC<ProductHeaderProps> = ({
  children,
  backLinkText,
}) => {
  return (
    <div className="mb-4 flex items-center justify-between border-b border-stone-200 pb-3">
      <ProductHeaderLink
        to=".."
        linkText={backLinkText}
        Icon={FiArrowLeft}
        relative="path"
      />
      {children && <div className="flex gap-4">{children}</div>}
    </div>
  );
};

interface ProductHeaderLinkProps extends LinkProps {
  Icon: IconType;
  linkText: string;
}

export const ProductHeaderLink: React.FC<ProductHeaderLinkProps> = ({
  Icon,
  linkText,
  ...props
}) => {
  return (
    <Link {...props} className="flex cursor-pointer items-center gap-1">
      <Icon />
      <span>{linkText}</span>
    </Link>
  );
};
