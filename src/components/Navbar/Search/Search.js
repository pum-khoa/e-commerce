import { CloseOutlined, SearchOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import SearchList from '../SearchList/SearchList';
import './Search.scss';

export default function Search(props) {
  const {
    searchProducts,
    searchInput,
    searchStatus,
    hideSearch,
    onSearch,
    onChangeInput,
    onClickItem,
  } = props;

  const { t } = useTranslation();

  useEffect(() => {
    const searchWrapper = document.querySelector('.search__wrapper');
    const search = document.querySelector('.search');
    if (searchStatus) {
      searchWrapper.classList.add('search__wrapper--display');
      setTimeout(() => {
        searchWrapper.classList.add('search__wrapper--transition');
        search.classList.add('search--display');
      }, 10);
    } else {
      setTimeout(() => {
        searchWrapper.classList.remove('search__wrapper--display');
        searchWrapper.classList.remove('search__wrapper--transition');
      }, 210);
      search.classList.remove('search--display');
    }
  }, [searchStatus]);

  return (
    <div className="search__wrapper">
      <div className="search">
        <div className="search__search-btn" onClick={onSearch}>
          <SearchOutlined />
        </div>
        <input
          value={searchInput}
          type="text"
          className="search__input"
          placeholder={t('field.search_nav.placeholder')}
          onInput={(e) => {
            onChangeInput(e.target.value);
          }}
        />
        <div className="search__close-btn" onClick={hideSearch}>
          <CloseOutlined />
        </div>
        <SearchList onClickItem={onClickItem} searchProducts={searchProducts} />
      </div>
      <div className="search__overlays" onClick={hideSearch}></div>
    </div>
  );
}
