import React, {
  useState,
  useEffect,
  ChangeEvent,
  KeyboardEvent,
  Dispatch,
  SetStateAction,
  useRef,
} from 'react';
import styles from './Search.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { searchProductResult } from '../../pages/api/search/[search]';
import getSerchedProducts from '../../apiRequests/getSerchedProducts';
import useClickOutsideDiv from '../../hooks/useClickOutsideDiv';
import { GrClose } from 'react-icons/gr';

function SearchComponent({
  calb,
}: {
  calb: Dispatch<SetStateAction<boolean>>;
}) {
  const rootEl = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const [value, setValue] = useState('');
  const [products, setProducts] = useState([] as searchProductResult | []);

  async function fetchData() {
    const data = await getSerchedProducts(value);
    setProducts(data);
  }
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
    if (!event.target.value) {
      setProducts([]);
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (value) {
        router.push(`${process.env.API_URL}/search/${value}`);
        calb(false);
      }
    }
  }

  useEffect(() => {
    value ? fetchData() : setProducts([]);
  }, [value]);

  useClickOutsideDiv(rootEl, () => {
    console.log('search');
    calb(false);
  });

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  return (
    <div className={styles.container} ref={rootEl}>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Поиск"
        ref={inputRef}
      />
      <GrClose onClick={() => calb(false)} />
      {products.length > 0 && (
        <div className={styles.dropdown}>
          {products.map((productItem) => (
            <Link
              href={`/category/${productItem.category}/${productItem.product.id}`}
              key={productItem.product.id}
              onClick={() => calb(false)}
            >
              {productItem.product.description}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchComponent;
